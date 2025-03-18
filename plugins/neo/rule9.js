import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = 'Rule 9: No Harassment or Use of Dirty Words\n\n🚫 Harassment in any form is strictly prohibited — including bullying, mocking, or targeted insults.\n\n❗ Avoid using any dirty, vulgar, or offensive language.\n\n🎯 Special reminder: Please respect the rights of our female and underage members.\n- Be mindful of your words and actions.\n- Maintain a safe and welcoming environment for everyone.\nLet’s build a respectful and inclusive community where all members can enjoy their time without fear or discomfort.'
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['rule9'];
handler.tags = ['neo'];
handler.command = /^(rule9)$/i;

export default handler;
