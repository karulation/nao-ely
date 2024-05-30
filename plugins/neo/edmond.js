import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = "‿︵‿︵୨˚̣̣̣͙୧ - - ୨˚̣̣̣͙୧‿︵‿︵\nNEO STAFF INFO \nName : Edmond\nPosition : Member of Discord Department\n\nA shy person but friendly one. Loves spending my leisure time to expand my knowledge of history, aviation, tanks, cars & Motorsports. Plays Sim Racing & FPS, and RTS sometimes.\n‿︵‿︵୨˚̣̣̣͙୧ - - ୨˚̣̣̣͙୧‿︵‿︵";
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['edmond'];
handler.tags = ['neo'];
handler.command = /^(edmond)$/i;

export default handler;
