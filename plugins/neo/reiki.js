import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = "‿︵‿︵୨˚̣̣̣͙୧ - - ୨˚̣̣̣͙୧‿︵‿︵\nNEO STAFF INFO\nName : Hazu\nPosition : Neo Anti-Skill : First Class\n\nA friendly guy, gamer, not a weeb but likes to watch anime (not much), introvert, I also will give you advice if you did something wrong. I ain't describing my whole personality here, so hope you will have a great day. Just a friendly reminder, we all make mistakes, it's what makes us human. I work in the dark to serve the light, so be careful while chatting. ಡ⁠ ͜⁠ ⁠ʖ⁠ ⁠ಡ\n‿︵‿︵୨˚̣̣̣͙୧ - - ୨˚̣̣̣͙୧‿︵‿︵";
        
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
