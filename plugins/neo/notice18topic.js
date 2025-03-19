import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = '🚫 Notice Regarding Inappropriate Recommendations 🚫\n\nIt has come to our attention that a member mentioned Boku no Pico or Overflow, both of which are 18+ series. This type of content is strictly forbidden in our community.\n\nLet’s be clear — this “pretending not to know” act has been going around for years, and as anime fans who chose to join an anime-based community, there’s no excuse to claim ignorance. It is clear this was done intentionally to talk about a forbidden topic.\n\n🔴 Therefore, you are required to delete the message immediately, as this group includes many female and underage members who must be respected and protected from such content.\n\nFailure to delete the message after warning will result in removal from the group.'
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['18topic'];
handler.tags = ['Neo Notice'];
handler.command = /^(18topic)$/i;

export default handler;
