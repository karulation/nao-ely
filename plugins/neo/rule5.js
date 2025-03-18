import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = '*Rule 5: Seek Permission Before Self-Promotion*\n🚫 Please do not promote your own content, business, or social media without getting approval from Neo HQ/Admins first.\n\n- This includes: promoting your TikTok, YouTube, Instagram, shop, or any services you offer.\n✅ However, sharing content from popular pages, public figures, or memes from other creators is allowed and does not count as self-promotion.\nLet’s keep the group free from spammy promos and focused on meaningful sharing. Always check first before posting your own stuff!';

        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['rule5'];
handler.tags = ['neo'];
handler.command = /^(rule5)$/i;

export default handler;
