import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage =   "》》》NEO TEAM《《《\n" +
                            "୨⎯ Neo Judgement (Management) ⎯୧\n" +
                            "Founder - Karu Shion\n" +
                            "Co-Founder - Yamato\n" +
                            "Administrator - Mio\n" +
                            "Assistant Administrator - Kemey\n" +
                            "Manager of Anti-Skill - Rei\n\n" +
                            "୨⎯ Neo Anti-Skill (WhatsApp) ⎯୧\n" +
                            "First Class Anti Skill - Rin\n" +
                            "First Class Anti Skill - Hazu\n" +
                            "Second Class Anti Skill - Zen\n" +
                            "Second Tier Anti Skill - Izumi\n\n" +
                            "୨⎯ Instagram Department ⎯୧\n" +
                            "Leader: Ren\n" +
                            "- Muisu\n" +
                            "- Son\n" +
                            "- Muichiro\n" +
                            "- Akkinior\n\n" +
                            "୨⎯ Entertainment Department ⎯୧\n" +
                            "Leader: Riezu\n" +
                            "- Izsyis\n" +
                            "- Shiroi\n" +
                            "- Lesley\n" +
                            "- Piko\n\n" +
                            "୨⎯ Discord Department ⎯୧\n" +
                            "Leader: Mio\n" +
                            "- Edmond\n" +
                            "- Mentos\n\n" +
                            "୨⎯ Graphic Department⎯୧\n" +
                            "Leader: Rika Akari\n" +
                            "- Syaz\n" +
                            "- Nyom\n" +
                            "- Inakusayumi \n" +
                            "- Lesley \n\n" +
                            "_For Neo Hall Of Fame, type /halloffame_";
        
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
