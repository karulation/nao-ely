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
                            "\n୨⎯ Media Department ⎯୧\n" +
                            "Head of Department: Izumi\n" +
                            "Head Admin of Instagram (@neoanimeme.my): Ren\n" +
                            "- Muisu\n" +
                            "- Son\n" +
                            "- Akkinior\n" +
                            "Head Admin of TikTok (neoanicom): Mui\n" +
                            "- Tachyon\n" +
                            "- Akii\n" +
                            "\n୨⎯ Entertainment Department ⎯୧\n" +
                            "Head of Department: Riezu\n" +
                            "- Izsyis\n" +
                            "- Shiroi\n" +
                            "- Lesley\n" +
                            "- Piko\n" +
                            "\n୨⎯ Discord Department ⎯୧\n" +
                            "Head of Department: Mio\n" +
                            "- Edmond\n" +
                            "- Mentos\n" +
                            "\n୨⎯ Graphic Department⎯୧\n" +
                            "Head of Department: Rika Akari\n" +
                            "- Syaz\n" +
                            "- Nyom\n" +
                            "- Inakusayumi \n" +
                            "- Lesley \n" +
                            "\n_For Neo Hall Of Fame, type /halloffame_";
        
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
