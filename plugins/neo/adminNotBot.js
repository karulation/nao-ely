import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var textMessage = `✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦\n*ADMINS ARE HUMAN, NOT BOTS!*\n✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦✧✦\nWe understand that there may be instances where certain members break the rules, and we might not always be available to handle the situation due to our personal commitments or the need for rest. We sincerely apologize if we haven't been able to fulfill our duties to the best of our abilities. Please remember that we are not automated bots who can be present 24/7 without tending to other responsibilities or taking breaks. We are regular individuals who are dedicated to the community but have limitations. We welcome any complaints or concerns you may have, but accusing us of neglecting our responsibilities, not taking the rules seriously, or disregarding the group is unfair and unfounded. Put yourself in our shoes, and imagine being judged for a single instance of unavailability. If you genuinely care about the community, we urge you to support us instead of pointing fingers and making baseless accusations. Let's work together to create a better community experience for everyone.\n\nSincerely, Neo Team`;
        var media = "https://telegra.ph/file/aa321d2670c88d1bc835d.jpg";
      
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['adminnotbot'];
handler.tags = ['neo'];
handler.command = /^(adminnotbot)$/i;

export default handler;
