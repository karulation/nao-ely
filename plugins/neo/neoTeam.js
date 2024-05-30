import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = "》》》NEO TEAM《《《\n୨⎯ Neo Judgement (Management) ⎯୧\nFounder - Karu Shion\nCo-Founder - Yamato\nAdministrator - Mio\nAssistant Administrator - Kemey\nManager of Anti-Skill - Rei\n\n୨⎯ Neo Anti-Skill (WhatsApp) ⎯୧\nFirst Class Anti Skill - Rin\nFirst Class Anti Skill - Hazu\nSecond Class Anti Skill - Zen\nSecond Tier Anti Skill - Izumi\n\n୨⎯ Instagram Department ⎯୧\nLeader: Ren\n- Riku Fubuki\n- Muisu\n- Son\n- Muichiro\n\n୨⎯ Gaming Department ⎯୧\nLeader: Riezu\n- Izsyis\n- Shiroi\n\n୨⎯ Discord Department ⎯୧\nLeader: Mio\n- Edmond\n- Mentos\n\n୨⎯ Graphic Department⎯୧\nLeader: Rika Akari\n- Syaz\n- Nyom\n\n୨⎯ Rikaru Store Team ⎯୧\nOwner - Karu Shion\nPartner - Rika Akari\nAll Neo Dropshippers\n\n_For Neo Hall Of Fame, type /halloffame_";
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['neoteam'];
handler.tags = ['neo'];
handler.command = /^(neoteam)$/i;

export default handler;
