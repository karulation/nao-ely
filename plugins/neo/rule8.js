import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = '*Rule 8: No LGBTQ+ Topics*\n🚫 Please refrain from discussing or sharing any LGBTQ+ related topics in this community.\n- This includes posts, debates, or mentions about gender identity, sexuality, and related issues.\n📌 Reason: As a Malaysian-based community, we follow local cultural norms and aim to maintain a neutral and comfortable space for all members.\n\nLet’s focus on what unites us — anime, gaming, and shared interests — and avoid sensitive topics that may cause discomfort or conflict.';
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['rule8'];
handler.tags = ['neo'];
handler.command = /^(rule8)$/i;

export default handler;
