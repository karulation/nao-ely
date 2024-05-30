import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = '*RULE 1: No ASEAN normie meme/sticker allowed*\n\nAccording to Judgemento, "Normie Things" refers to stickers or memes that are unrelated to anime or not widely known. To help you understand, lets compare the "RickRoll" meme, which is globally recognized, with most Malaysian/Indonesian influencer/politician memes that are mainly known locally. The goal is to avoid cringeworthy content that lacks wider appeal. If you have an issue with our rules or administration style, the "Leave Group" button is available.\n\nIts important to recognize that every community has its own unique rules and administration style. Please refrain from comparing our community to others. We believe its unfair to compare our structured community with more "anarchy"-style communities. While we may share the same genre, each community has its own distinct characteristics.';
        
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
