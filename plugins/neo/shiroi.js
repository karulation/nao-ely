import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/b7ed3e737ede1dd5fd885.jpg';
        var textMessage = "*NEO STAFF INFO*\nName : Shiroi\nPosition : Member of Gaming Department - Skill\nJoined group: Neo Asterisk, Neo arcus, Neo lounge, and Neo iota\nBirthday: 24/11\nDescription: An artist who cant draw cute stuff. An Apex Legends player who avoids ranks. A Genshin Impact addicted person. Very much enjoys voice acting in yandere scripts for fun.\n\nIG: Setsu.illust_0524\nSteam: AnakAyamDikejarMusang (Apex)\nDiscord: ._.7020#0000\n\nHave fun and have a nice day knowing this crazy woman.\n\n=======================\nHave a great day...ฅ⁠^⁠•ω•⁠^⁠ฅ";
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['shiroi'];
handler.tags = ['Neo Intro'];
handler.command = /^(shiroi)$/i;

export default handler;
