import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = "*NEO STAFF INFO*\nName : Rin\nPosition : Neo Anti-Skill : First Class\n\nIt student, networking cost. Love traditional art yeah i also makes TikTok for it, mostly i just draw anime, i love colouring. Love to workout 💪. Afraid of woman. I love everything about self improvement or any extreme activity. Tag me if you need anything. Adios🫱\n=======================";
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['rin'];
handler.tags = ['Neo Intro'];
handler.command = /^(rin)$/i;

export default handler;
