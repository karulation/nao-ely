import fetch from "node-fetch";

const cooldown = new Set(); // To prevent double broadcast

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        // 🔒 Ensure this handler only triggers from direct command, not quoted
        if (!(m.text && m.text.startsWith(usedPrefix + command))) return;

        const groupID = "120363381033257339@g.us"; // Collab group
        const targetGroups = [
            "60198445693-1569406524@g.us",
            "60177637943-1608653508@g.us", // ANH
            "60177637943-1627735681@g.us",
            "120363022290154127@g.us", // Neo
            "601127596391-1588068352@g.us", // Bangdreamer
        ];

        // Prevent command spam within 10 seconds
        if (cooldown.has(m.chat)) {
            return m.reply("⏳ Please wait a moment before sending another broadcast.");
        }
        cooldown.add(m.chat);
        setTimeout(() => cooldown.delete(m.chat), 10000); // 10 sec cooldown

        // Helper to check if message is empty or just emojis
        const isOnlyEmoteOrEmpty = (text) => {
            if (!text || text.trim() === "") return true;
            const emojiRegex = /^(\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{Emoji}\uFE0F)+$/u;
            return emojiRegex.test(text.trim());
        };

        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";

        // Return if the message is empty or only emojis
        if (!mime && (isOnlyEmoteOrEmpty(text) || text.trim().startsWith("/"))) return;

        // ✅ Only allow from collab group
        if (m.chat !== groupID) return;

        console.log("📢 Collaboration message detected.");
        let senderUsername = m.sender.split("@")[0];
        let textMessage = `${text}\n\n📢 _AniMY Community Collaboration Broadcast_\n👤 By: @${senderUsername}`;
        let mentions = [m.sender];
        let successCount = 0;
        let failedGroups = [];

        if (/video|image/.test(mime) && !/webp/.test(mime)) {
            // If media (image or video)
            for (const group of targetGroups) {
                try {
                    let media = await q.download?.();
                    if (!media) {
                        console.error(`❌ Failed to download media for ${group}`);
                        failedGroups.push(group);
                        continue;
                    }
                    await conn.sendFile(group, media, "", textMessage, null, false, { mentions });
                    console.log(`✅ Media broadcast sent to: ${group}`);
                    successCount++;
                    await new Promise(resolve => setTimeout(resolve, 2000)); // 2s delay
                } catch (err) {
                    console.error(`❌ Error sending media to ${group}:`, err);
                    failedGroups.push(group);
                }
            }
        } else {
            // General text message
            for (const group of targetGroups) {
                try {
                    await conn.reply(group, textMessage, null, { mentions });
                    console.log(`✅ Text broadcast sent to: ${group}`);
                    successCount++;
                    await new Promise(resolve => setTimeout(resolve, 2000));
                } catch (err) {
                    console.error(`❌ Error sending text to ${group}:`, err);
                    failedGroups.push(group);
                }
            }
        }

        // Send summary message
        let completionMessage = `✅ Broadcast completed! Sent to ${successCount} group(s).`;
        if (failedGroups.length > 0) {
            completionMessage += `\n❌ Failed to send to ${failedGroups.length} group(s): ${failedGroups.join(", ")}`;
        }
        await conn.reply(m.chat, completionMessage, m);

        return true;
    } catch (e) {
        console.error(e);
        return m.reply("❌ An error occurred. Please contact Karu.");
    }
};

handler.command = /^(bc)$/i;

export default handler;
