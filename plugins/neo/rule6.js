import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = '*Rule Number 6: no NSFW*\n\nRule 6 of the "Neo Anime Community" states that no NSFW content is allowed in the group. This includes any explicit or suggestive content that is not appropriate for all ages or may offend some members of the community. NSFW content includes but is not limited to sexual content, nudity, and violent or graphic imagery. The aim of this rule is to maintain a safe and respectful environment for all members of the community, regardless of age or personal beliefs. Any member found to be posting NSFW content will be immediately removed from the group.';
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['rule6'];
handler.tags = ['neo'];
handler.command = /^(rule6)$/i;

export default handler;
