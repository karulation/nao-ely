import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = '*Rule 1: No Cringe or Discomforting Content Allowed*\n🚫 Please avoid sharing any content that may be considered cringe, disgusting, or uncomfortable to others. This includes:\n\n- Excessively awkward or embarrassing posts meant to provoke negative reactions.\n-Content that is visually or contextually disturbing (e.g., gross humor, extreme behaviors).\n- Posts that may make others feel uneasy or disrupt the friendly atmosphere.\n\nLet’s keep the community enjoyable and respectful for everyone. Think twice before sharing — if it might make others uncomfortable, it’s best not to post it.'
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['rule1'];
handler.tags = ['neo'];
handler.command = /^(rule1)$/i;

export default handler;
