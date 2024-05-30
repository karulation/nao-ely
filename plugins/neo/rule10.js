import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = '*Rule Number 10: Avoid conflicts*\n\nRule 10 of the anime community states "Avoid conflicts". This means that members should refrain from engaging in any behavior that may lead to conflicts or arguments within the community. It is important to maintain a positive and respectful atmosphere for everyone to enjoy.\n\nIf a member is found to be causing conflicts or behaving in a confrontational manner towards others, they may face consequences such as warnings or even being kicked out of the community.\n\nIt is important to remember that conflicts can arise due to differences in opinions and preferences, but it is important to handle them in a mature and respectful manner. If there are any issues or conflicts, members are encouraged to reach out to the admins for help in resolving the situation.';
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['rule10'];
handler.tags = ['neo'];
handler.command = /^(rule10)$/i;

export default handler;
