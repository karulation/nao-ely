import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = '*Rule Number 5: Ask for permission before promoting stuff*\n\nRule 5 states that if members want to promote something, they need to submit an application to any admin first before promoting it. The application should include the following details:\n\n1. Content name: This refers to the name of the content that the member wants to promote.\n\n2. About: This refers to a brief description of the content that the member wants to promote.\n\n3. Group/Community/owner/etc: This refers to the group, community, owner, or any relevant information about the content that the member wants to promote.\n\nBy submitting an application and obtaining permission from the admin, members can avoid promoting content that may be considered inappropriate or irrelevant to the anime community.';
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['rule5'];
handler.tags = ['neo'];
handler.command = /^(rule5)$/i;

export default handler;
