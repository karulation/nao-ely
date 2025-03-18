import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = '🌟 *Leaving is Always an Option* 🌟\n\nIf you find yourself disagreeing with our rules or administrative approach, the **“Leave Group”** button is readily available.\n\n🔹 *Every community is unique.*  Please respect that we operate with our own set of guidelines and management style. Refrain from comparing us to other groups — especially those with a more “anarchy” style of management.\n\n✨ While we may share the same genre or interests, **Neo** is built on structure, harmony, and respect — values that define who we are.\n\nLet’s appreciate the diversity between communities and focus on making this one a better place for all. 💫';
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['leaveoption'];
handler.tags = ['neo'];
handler.command = /^(leaveoption)$/i;

export default handler;
