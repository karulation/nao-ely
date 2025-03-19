import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = '*Rule Number 3: Keep your behavior (use less curse word etc)*\n\nRule 3 of the Neo Anime Community states that all members must keep their behavior in check. This means refraining from using excessive curse words or engaging in any other form of behavior that could be considered offensive or disruptive. \n\nWe want to maintain a positive and respectful environment within our community, and therefore, any behavior that goes against this rule may result in immediate removal from the group. We ask all members to be mindful of their language and behavior when interacting with others in the community. \n\nIf you have any doubts or concerns about your behavior, please do not hesitate to ask an admin for clarification. Lets work together to create a welcoming and enjoyable space for everyone in the Neo Anime Community!';
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['rule3'];
handler.tags = ['neo'];
handler.command = /^(rule3)$/i;

export default handler;
