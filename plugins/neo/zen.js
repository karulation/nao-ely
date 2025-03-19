import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/81acc75d9671ba3f8401a.jpg';
        var textMessage = "*NEO STAFF INFO*\nName : Zen\nPosition : Neo Anti-Skill : Second Division\nJoined Group: Neo Asterisk, Neo Arcus, NeoAnicom Lounge\nBirthday: 5/5\nInstagram: yasashiisuisei\nTiktok: yasashijanai\nDescription: Zen or Zenitsu is a man that does exist from an anime yet he is definitely the most coward and hates himself more than others... but other than that he does have hidden strength that he is not discovered yet...\n\nYoroshikune Onegaishimasu Minna 💛\n=======================";
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['zen'];
handler.tags = ['Neo Intro'];
handler.command = /^(zen)$/i;

export default handler;
