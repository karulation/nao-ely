import fetch from "node-fetch";

let processing = new Set();

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) {
        return m.reply(
            `❌ Link?\nExample: *${usedPrefix}${command} https://vt.tiktok.com/ZSwWCk5o/*`
        );
    }
    if (processing.has(m.chat)) {
        return;
    }
    processing.add(m.chat);

    let apiUrl = `https://api.lolhuman.xyz/api/tiktok?apikey=${lolApi}&url=${text}`;
    await m.reply("⏳ Fetching TikTok video, please wait...");

    console.log("🔗 API Request:", apiUrl);

    try {
        let response = await fetch(apiUrl);
        let anu = await response.json();

        if (!anu || !anu.result) {
            console.error("❌ API Error:", anu);
            return m.reply("⚠️ Error fetching video. Please try again later.");
        }

        console.log("📌 TikTok API Response:", anu.result.link || anu.result);

        let videoUrl = anu.result.link;
        if (videoUrl) {
            await conn.sendMessage(
                m.chat,
                { video: { url: videoUrl }, caption: "🎥 Here is your TikTok video!" },
                { quoted: m }
            );
        } else {
            return m.reply("⚠️ Failed to retrieve a valid video link.");
        }
    } catch (e) {
        console.error("❌ Error:", e);
        m.reply("⚠️ Failed to download TikTok video. The link might be invalid or the server is down.");
    } finally {
        processing.delete(m.chat); // Remove from processing set after completion
    }
};

handler.menudownload = ["tiktok <url>"];
handler.tagsdownload = ["search"];
handler.command = /^(tiktok|ttdl|tt|tiktokdl)$/i;
handler.limit = true;

export default handler;
