import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = "‿︵‿︵୨˚̣̣̣͙୧ - - ୨˚̣̣̣͙୧‿︵‿︵\nNEO STAFF INFO\nName : Izumi\nPosition : Neo Anti-Skill : Second Class\n\nPast is past. It always comes when you're traumatized by itself. If you can't move on, just take it for motivation. Btw, I like coffee, games, and also you.\n‿︵‿︵୨˚̣̣̣͙୧ - - ୨˚̣̣̣͙୧‿︵‿︵";
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['izumi'];
handler.tags = ['Neo Intro'];
handler.command = /^(izumi)$/i;

export default handler;
