import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = '*Rule Number 4: No spoiler*\n\nRule 4 of our community states that no spoilers are allowed. However, we understand that discussing anime and manga often involves spoilers, so we have a few guidelines to follow. Spoilers should be limited to minor details and should not reveal major plot points or character deaths that would ruin the experience for someone who hasnt watched or read the series yet. Additionally, we recommend using spoiler tags or warning others before discussing spoilers to allow them to opt-out of the conversation if they choose to do so. It is important to respect everyones enjoyment and experience of the series, and to avoid spoiling it for others. Anyone found to be intentionally spoiling anime or manga for others will be subject to immediate removal from the community. If you are unsure about what constitutes a spoiler, please ask an admin for clarification.';
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['rule4'];
handler.tags = ['neo'];
handler.command = /^(rule4)$/i;

export default handler;
