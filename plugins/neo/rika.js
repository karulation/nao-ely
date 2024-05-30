import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = "‿︵‿︵୨˚̣̣̣͙୧ - - ୨˚̣̣̣͙୧‿︵‿︵\nNEO STAFF INFO\nName : Rika Akari\nPosition : Head of Neo Design Department/ Co-Owner of Rikaru Store\n\nAn Ambivert , i like to spend ma time alot  sleeping cause i don't like to deal with people , i love music alot and also arts . I hate crowds And I'm an easy going person (ㆁωㆁ) if you treat me right , i will treat you the same . If you treat me bad ,i will just ignore you.  Simple . (◍•ᴗ•◍) I'm a goooddd person don't worry. I'm very friendly online , but not in real life . But i will not be online often . Again , I'm a gud person (ㆁωㆁ) okeh .\n‿︵‿︵୨˚̣̣̣͙୧ - - ୨˚̣̣̣͙୧‿︵‿︵";
       
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['rika'];
handler.tags = ['Neo Intro'];
handler.command = /^(rika)$/i;

export default handler;
