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
                            "Event Manager - Rei\n" +
                            "Manager of Anti-Skill - Hazu\n" +
                            "\n"+
                            "୨⎯ Neo Anti-Skill (WhatsApp) ⎯୧\n" +
                            "Anti-Skill : First Division - Rin\n" +
                            "Anti-Skill : First Division - Izumi\n" +
                            "Anti-Skill : Second Division - Zen\n" +
                            "Anti Skill : Second Division - Muichiro\n" +
                            "୨⎯ Instagram Department ⎯୧\n" +
                            "Leader: Ren\n" +
                            "- Muisu\n" +
                            "- Son\n" +
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
