import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return m.reply(`Example: ${usedPrefix + command} Sia Unstoppable`);
    }

    let url = '';

    if (isUrl(text)) {
        url = text;
    } else {
        try {
            console.log(`🔎 Searching YouTube for: ${text}`);
            
            if (!lolApi) {
                throw new Error("⚠️ API Key (lolApi) is missing or undefined.");
            }

            let res = await fetch(`https://api.lolhuman.xyz/api/ytsearch?apikey=${lolApi}&query=${encodeURIComponent(text)}`);
            let json = await res.json();

            console.log("🎥 YouTube Search Response:", JSON.stringify(json, null, 2));

            if (!json.result || json.result.length === 0) {
                throw new Error("⚠️ No search results.");
            }

            url = 'https://www.youtube.com/watch?v=' + json.result[0].videoId;
        } catch (err) {
            console.error("⚠️ Error during YouTube search:", err);
            return m.reply(err.message || "⚠️ No results found.");
        }
    }

    if (!url) return m.reply("⚠️ No valid video found.");

    try {
        console.log(`🎵 Fetching audio for: ${url}`);

        let res = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${lolApi}&url=${url}`);
        let json = await res.json();

        console.log("🔊 Audio API Response:", JSON.stringify(json, null, 2));

        if (!json.status || !json.result || !json.result.link) {
            throw new Error("⚠️ API error or invalid response.");
        }

        await conn.sendMessage(m.chat, { 
            audio: { url: json.result.link }, 
            mimetype: 'audio/mpeg',
            ptt: true // Send as voice message
        }, { quoted: m });

    } catch (err) {
        console.error("⚠️ Error processing audio:", err);
        return m.reply(err.message || "⚠️ Failed to fetch audio.");
    }
};

// URL Validation Function
function isUrl(str) {
    let urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // Protocol
        '((([a-zA-Z0-9$-_@.&+!*\\(\\),]+)\\.[a-zA-Z]{2,})|' + // Domain name
        'localhost|' + // Localhost
        '(([0-9]{1,3}\\.){3}[0-9]{1,3}))' + // OR IPv4 address
        '(\\:[0-9]{1,5})?' + // Port (optional)
        '(\\/.*)?$', // Path (optional)
        'i'
    );
    return !!urlPattern.test(str);
}

handler.menudownload = ['ytplay <text> / <url>'];
handler.tagsdownload = ['search'];
handler.command = /^(play|(play)?yt(play|dl)?)$/i;

export default handler;
