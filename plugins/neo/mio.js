import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/f9285102bf2fb0acfa71c.jpg';
        var textMessage = "‿︵‿︵୨˚̣̣̣͙୧ - - ୨˚̣̣̣͙୧‿︵‿︵\nNEO STAFF INFO\nName : Mio\nPosition : Administrator and Head of Discord Department\n\nNot kind, not bad either. Quite knowledgeable but will always have the heart open to learn something new, I hope so. Dangerous but silent at times. Into cars and florist, a long journey until I will be able to live such a life. Enjoy reading Manga & LN. Plays VN, Racing Simulator & FPS, wish to improve on such a short duration.";
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['mio'];
handler.tags = ['Neo Intro'];
handler.command = /^(mio)$/i;

export default handler;
