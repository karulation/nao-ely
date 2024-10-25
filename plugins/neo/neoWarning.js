import db from '../../lib/database.js';

export async function before(m, { conn, text, participants }) {
    // Combined group array with IDs and names
    const neoGroups = [
        { id: '120363022290154127@g.us', name: 'Neo Arcus' },
        { id: '60177637943-1627735681@g.us', name: 'Neo Asterisk' },
        { id: '60177637943-1634746023@g.us', name: 'Neo Iota' },
        { id: '120363226270078711@g.us', name: 'Nao Basement' }
    ];

    const neoHQ = '60177637943-1634743268@g.us'; // Notification group

    // List of bad words
    const badWords = [
        'hentai', 'yuri', 'bdsm', 'boobs', 'oppai', 'manko', 'pussy', 'yaoi', 'dick', 'konek',
        'penis', 'fuck', 'thighs', 'ahegao', 'bokep', 'lesbian', 'geyh', 'gei', 'kiss', 'thigh',
        'ketek', 'armpit', 'pedo', 'seggs', 'segs', 'blowjob', 'awek', 'nigga', 'keling', 'bodoh'
    ];

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
    if (group && detectBadWords(m.text)) {
        const senderUsername = m.sender.split('@')[0];
        
        // Warn the sender in the current group chat
        await conn.reply(m.chat, `⚠️ Warning: @${senderUsername}, please refrain from using inappropriate language.`, null, {
            mentions: [m.sender]
        });

        // Notify the HQ group about the bad word usage
        const notificationMessage = `⚠️ Bad language detected from @${senderUsername} in group ${group.name}.`;
        await conn.reply(neoHQ, notificationMessage, null, {
            mentions: [m.sender]
        });

        return true; // Stop further processing if a bad word is detected
    }

    return true;
}

// Function to check for bad words
function detectBadWords(text) {
    const lowerText = text.toLowerCase();
    return badWords.some(word => lowerText.includes(word));
}
