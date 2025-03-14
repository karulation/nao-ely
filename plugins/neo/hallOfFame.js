import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = `
            🌟 *NEO TEAM HALL OF FAME* 🌟\n\n
            Let's take a moment to appreciate and remember the incredible individuals who were once a part of our Neo Team. Their dedication, passion, 
            and hard work have left a lasting impact on our community. 🙌🌟\n\n
            🌟 *Zangkuro* - Former Anti-Skill\n
            🌟 *Nash* - Former Anti-Skill\n
            🌟 *Giru* - Former Entertainment Department Member\n
            🌟 *Nagisa* - Former Instagram Department Member\n
            🌟 *Riku* - Former Instagram Department Member\n
            🌟 *Eirelle* - Former Design Department Member\n\n
            Though they may have moved on to new adventures, their contributions will forever be a part of our Neo legacy. We salute you and express our 
            deepest gratitude for your invaluable service! 🚀🌈 #NeoTeamHallOfFame #CommunityHeroes`;

        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['halloffame'];
handler.tags = ['neo'];
handler.command = /^(halloffame)$/i;

export default handler;
