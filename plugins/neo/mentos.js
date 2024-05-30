import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/82e7c8e5f40aea74247c4.jpg';
        var textMessage = "MENTOS INTRODUCTION\n══ ══ ══ ≪ °❈° ≫ ══ ══ ══\n\nName: Mentos yamada\nJoined group: Neo Asterisk, Neo arcus, Neo lounge, and Neo iota\nBirthday: 1/9\nDescription: A man whose life is only games, anime, and weeb high-class. Really likes nihongo and anime memes, and also I dont know if Im just a mentos.\n\nTiktok: Just Mentosシ\nIG: irpanmitos\n\nMobile Legend:\nUsername: Just Mentosシ\nId: 792636004\n\nPro lance sing sing sing~~\n=======================\nKeep fighting even if you know you will lose...ฅ⁠^⁠•ω•⁠^⁠ฅ";
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['mentos'];
handler.tags = ['neo'];
handler.command = /^(mentos)$/i;

export default handler;
