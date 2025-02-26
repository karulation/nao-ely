import fetch from "node-fetch";

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        // Group IDs
        const groupID = "120363381033257339@g.us"; // Collab group
        const targetGroups = [
            "120363226270078711@g.us", "60198445693-1569406524@g.us", "60177637943-1608653508@g.us", //ANH
            '60177637943-1627735681@g.us', '60177637943-1634746023@g.us', '120363022290154127@g.us', //neo
            '601127596391-1588068352@g.us' // bangdreamer
        ];

        // Function to check if a string only contains emojis or is empty
        const isOnlyEmoteOrEmpty = (text) => {
            if (!text || text.trim() === "") return true;
            const emojiRegex =
                /^(\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{Emoji}\uFE0F)+$/u;
            return emojiRegex.test(text.trim());
        };

        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";

        // Return early if message contains only emojis, is empty, or starts with "/"
        if (!mime && (isOnlyEmoteOrEmpty(text) || text.trim().startsWith("/"))) {
            return true;
        }

        if (m.chat === groupID) {
            console.log("Collaboration message detected.");
            let senderUsername = m.sender.split("@")[0];
            let textMessage = `${text}\n\n📢 _AniMY Collaboration Broadcast_\n👤 By: @${senderUsername}`;
            let mentions = [m.sender];
            let successCount = 0;

            if (/video|image/.test(mime) && !/webp/.test(mime)) {
                // If message contains an image or video
                let media = await q.download?.();
                if (!media) {
                    return m.reply("❌ Failed to download media. Please try again.");
                }

                for (const group of targetGroups) {
                    await conn.sendFile(group, media, "", textMessage, null, false, {
                        mentions,
                    });
                }
                successCount++;
            } else {
                // General text message
                for (const group of targetGroups) {
                    await conn.reply(group, textMessage, null, { mentions });
                }
                successCount++;
            }

            // Notify sender that broadcast is complete
            let completionMessage = `✅ Broadcast completed! Sent to ${successCount} group(s).`;
            await conn.reply(m.chat, completionMessage, m);
        }

        return true;
    } catch (e) {
        console.error(e);
        return m.reply("❌ An error occurred. Please contact Karu.");
    }
};

handler.help = ["bc"];
handler.tags = ["collab"];
handler.command = /^(bc)$/i;

export default handler;
