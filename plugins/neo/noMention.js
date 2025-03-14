import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var textMessage = "*🚨 Important Notice: Refrain from Using Group Mentions in WhatsApp Status 🚨*\n\nDear Neo Members, \n\nPlease avoid using WhatsApp’s new feature that allows mentioning groups in your status. This will cause your status to appear in the status feed of all group members. \n\nSince Neo groups have over 700+ members combined, this could negatively impact user experience. \n\n🔹 Why?\n- Imagine wanting to check your friends' status, but instead, you see updates from 10+ random strangers. It can feel overwhelming and annoying. \n\nTo ensure a better experience for everyone, please refrain from using this feature in Neo groups. Thank you for your cooperation! 🙏";
        var media = "https://telegra.ph/file/aa321d2670c88d1bc835d.jpg";

        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['nomention'];
handler.tags = ['neo'];
handler.command = /^(nomention)$/i;

export default handler;
