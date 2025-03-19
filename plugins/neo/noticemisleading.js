import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = '🚫 Notice on Misleading Stickers 🚫\n\nWe’ve observed that some stickers, while not directly from 18+ content, have been modified or used in a way that can mislead members into thinking they are 18+ related.\n\nEven if the original source is safe, intentionally creating or sharing stickers that imply or suggest inappropriate/NSFW themes is not allowed. This can cause discomfort, especially for our female and underage members, and goes against the community’s values.\n\nLet’s keep the environment safe, respectful, and enjoyable for all members. Continued use of such stickers after warning may result in removal from the group.'
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['misleading'];
handler.tags = ['Neo Notice'];
handler.command = /^(misleading)$/i;

export default handler;
