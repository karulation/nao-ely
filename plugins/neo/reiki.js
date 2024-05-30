import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/ceeaef936958232fdf7b5.jpg';
        var textMessage = "*REIKI INTRODUCTION*\n══ ══ ══ ≪ °❈° ≫ ══ ══ ══\n\nName: Setsuna Reiki (yall can just call me Rei)\nPosition: Manager of Neo Anti-Skill\nJoined group: All possible NEO community groups\nBirthday: 9/4\nDescription: Your friendly neighborhood admin. Loves reading, YT reactions or shorts, and sleeping. Feel free to ask or talk to me about anything, Ill try to help as much as I could.\n\nTiktok: Asyraaf-Rei\nIG: asura.reiki_\n\nLike to play games or karaoke at DC, so feel free to join whenever you want.\n=======================\nHave a great day...ฅ⁠^⁠•ω•⁠^⁠ฅ";
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['reiki'];
handler.tags = ['Neo Intro'];
handler.command = /^(reiki)$/i;

export default handler;
