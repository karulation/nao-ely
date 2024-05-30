import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = '*Rule Number 7: No racist/politic*\n\nRule 7 states that racist or political discussions are not allowed in the community. This means that members should avoid sharing or discussing any content that promotes or expresses racism or discrimination based on race, ethnicity, nationality, or any other personal characteristic. Additionally, members should not engage in any political discussions or debates as these topics can be divisive and may create conflict within the community. The goal is to maintain a friendly and respectful environment where everyone feels comfortable and valued regardless of their background or beliefs. Violating this rule may result in immediate removal from the community';
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['rule7'];
handler.tags = ['neo'];
handler.command = /^(rule7)$/i;

export default handler;
