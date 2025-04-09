import db from '../../lib/database.js';

export async function before(m, { conn, text, participants }) {
    // Combined group array with IDs and names
    const neoGroups = [
        // { id: '120363022290154127@g.us', name: 'Neo Arcus' },
        { id: '60177637943-1627735681@g.us', name: 'Neo Asterisk' },
        { id: '60177637943-1634746023@g.us', name: 'Neo Iota' },
        { id: '120363022632239561@g.us', name: 'Nao Basement' }
    ];

    const neoHQ = '60177637943-1634743268@g.us'; // Notification group

    // List of bad words
        const badWords = [
            'hentai', 'bdsm', 'boobs', 'oppai', 'manko', 'pussy', 'bodo', 'bodoh', 'redo of healer', 'sexiest', 'pungkok', 'keling', 'paria', 
            'dick', 'konek', 'penis', 'fuck', 'ahegao', 'bokep', 'sefong', 'tobrut', 'tocil', 'toge', 'titid', 'tytid', 
            'ketek', 'armpit', 'pedo', 'seggs', 'segs', 'blowjob', 'nigga','kokop', 'ewe', 'ngewe', 'entot', 'ngentot', 'sepong', 
            'keling', 'bitch', 'fellatio', 'masturbate', 'orgy', 'handjob', 'anus', 'sex', 'barua', 'hitam', 'pepek', 'mmq', 'bdsm', 
            'futanari', 'kontol', 'fap', 'fapping', 'ejaculated', 'ejaculation', 'nakadanshi', 'onlyfans', 'mat6tube', 'exporn', 'rule34', 
            'himedanshi', 'fujoshi', 'incest', 'nigger', 'cum', 'hentai', 'tete', 'coli', 'comli', 'horny', 'oni', 'honi', 'huni',
            'whore', 'jizz', 'porn', 'creampie', 'nenen', 'squirt', 'ching chong', 'e-hentai', '3hentai', 'hentai18', 'boku no pico',
            'nekopoi','neko poi', 'nhentai', 'hanime', 'hentaihaven', 'watchhentai', 'hentaicity', 'hentaianime', 'hentaifox',
            'pornhub', 'xhamster', 'redtube', 'youporn', 'xnxx', 'xvideos', 'noodlemagazine',
        ]

    // ✅ Skip if message is from the bot itself
    if (m.sender === conn.user.jid) return;

    // Helper function to check if a string only contains emojis or is empty
    const isOnlyEmoteOrEmpty = (text) => {
        if (!text || text.trim() === '') {
            return true; // Empty message
        }
        const emojiRegex = /^(\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{Emoji}\uFE0F)+$/u;
        return emojiRegex.test(text.trim());
    };

    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    // Return early if message is only emojis, empty, or starts with slash ("/"), unless there's media attached
    if (!mime && (isOnlyEmoteOrEmpty(m.text) || m.text.trim().startsWith('/'))) {
        return true;
    }

    // Find the group in neoGroups by chat ID
    const group = neoGroups.find(g => g.id === m.chat);

    // Check if the message is from a Neo group and contains bad words
    const detectedWord = detectBadWords(m.text, badWords);
    if (group && detectedWord) {
        const senderUsername = m.sender.split('@')[0];

        // Notify the HQ group about the bad word usage
        const notificationMessage = `⚠️ *Bad language detected!* ⚠️\n\n🔹 *User:* @${senderUsername}\n🔹 *Group:* ${group.name}\n🔹 *Offensive Word:* "${detectedWord}"\n\n🚨 Admin, please check and warn the user.\n\n📩 *Message:* \n${m.text}`;

        await conn.reply(neoHQ, notificationMessage, null, { mentions: participants.map(a => a.id) });

        return true; // Stop further processing if a bad word is detected
    }

    return true;
}

// Function to check for bad words and return the matched word
function detectBadWords(text, badWords) {
    const lowerText = text.toLowerCase();
    for (const word of badWords) {
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        if (regex.test(lowerText)) {
            return word; // Return the detected bad word
        }
    }
    return null; // No bad word found
}
