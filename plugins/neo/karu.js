import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/5787412a7ea13e251aa8e.png';
        var textMessage = '‿︵‿︵୨˚̣̣̣͙୧ - - ୨˚̣̣̣͙୧‿︵‿︵\n*NEO STAFF INFO*\n*Name :* Karu Shion\n*Position :* Founder of Neo Anime Community\n*TikTok/Instagram :* karulation\n\n*Description :* *Karu* or also known as *Haikaru* is the founder of Neo Anime Community. You may not see him often but he exists. He can be friendly and dry depending on his mood. Have passion in web development and also a cosplayer. Lastly, Nino is his number 1 waifu since 2019. Feel free to chat with him, he doesnt eat people.\n‿︵‿︵୨˚̣̣̣͙୧ - - ୨˚̣̣̣͙୧‿︵‿︵';
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['karu'];
handler.tags = ['Neo Intro'];
handler.command = /^(karu)$/i;

export default handler;
