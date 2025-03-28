let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        // Ensure the bot is connected before proceeding
        if (!conn.user) {
            console.log("🔄 Reconnecting session...");
            await conn.loadAuthInfo("auth.json"); // Ensure session persistence
            await conn.connect();
        }

        // Group IDs
        const groupID = "120363381033257339@g.us"; // Collab group
        const targetGroups = [
            "60198445693-1569406524@g.us",
            "60177637943-1608653508@g.us", // ANH
            "60177637943-1627735681@g.us",
            "60177637943-1634746023@g.us",
            "120363022290154127@g.us", // Neo
            "601127596391-1588068352@g.us", // Bangdreamer
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
            console.log("📢 Collaboration message detected.");
            let senderUsername = m.sender.split("@")[0];
            let textMessage = `${text}\n\n📢 _AniMY Community Collaboration Broadcast_\n👤 By: @${senderUsername}`;
            let mentions = [m.sender];
            let successCount = 0;

            // Function to add a delay between messages
            function delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            if (/video|image/.test(mime) && !/webp/.test(mime)) {
                // If message contains an image or video
                for (const group of targetGroups) {
                    try {
                        let media = await q.download?.(); // Re-download for each group
                        if (!media) {
                            console.error(`❌ Failed to download media for ${group}`);
                            continue;
                        }
                        if (media.length > 5 * 1024 * 1024) { // Check file size (5MB limit)
                            console.log(`⚠️ Media too large for ${group}, skipping...`);
                            continue;
                        }
                        await conn.sendFile(group, media, "", textMessage, null, false, { mentions });
                        console.log(`✅ Media broadcast sent to: ${group}`);
                        successCount++;
                        await delay(3000); // Prevent spam (3s delay)
                    } catch (err) {
                        console.error(`❌ Error sending media to ${group}:`, err.message);
                    }
                }
            } else {
                // General text message
                for (const group of targetGroups) {
                    try {
                        await conn.reply(group, textMessage, null, { mentions });
                        console.log(`✅ Text broadcast sent to: ${group}`);
                        successCount++;
                        await delay(2000); // Prevent spam (2s delay)
                    } catch (err) {
                        console.error(`❌ Error sending text to ${group}:`, err.message);
                    }
                }
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

// Automatically reconnect if the session closes
conn.ev.on("connection.update", (update) => {
    if (update.connection === "close") {
        console.log("🔄 Reconnecting...");
        startBot(); // Function to restart bot
    }
});

handler.command = /^(bc)$/i;

export default handler;
