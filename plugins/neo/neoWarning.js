import db from '../../lib/database.js';

export async function before(m, { conn, text, participants }) {
    // Combined group array
    const neoGroups = [
        '120363022290154127@g.us',  // Neo Arcus
        '60177637943-1627735681@g.us',  // Neo Asterisk
        '60177637943-1634746023@g.us',
        '120363226270078711@g.us'// Neo Iota
    ]; // Replace with actual group IDs

    // Group to send notifications about bad words
    const notificationGroup = '60177637943-1634743268@g.us'; // NEO HQ

    // List of bad words
    const badWords = [
        'hentai', 'yuri', 'bdsm', 'boobs', 'oppai', 'manko', 'pussy', 'yaoi', 'dick', 'konek',
        'penis', 'fuck', 'thighs', 'ahegao', 'bokep', 'lesbian', 'geyh', 'gei', 'kiss', 'thigh',
        'ketek', 'armpit', 'pedo', 'seggs', 'segs', 'blowjob', 'awek', 'nigga', 'keling', 'bodoh'
    ];

    // Function to check if a string only contains emojis or is empty
    const isOnlyEmoteOrEmpty = (text) => {
        if (!text || text.trim() === '') {
            return true; // Empty message
        }
        const emojiRegex = /^(\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{Emoji}\uFE0F)+$/u;
        return emojiRegex.test(text.trim());
    };

    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    // Return early if the message only contains emojis, is empty, or starts with a slash ("/")
    // but allow processing if there is media attached
    if (!mime && (isOnlyEmoteOrEmpty(m.text) || m.text.trim().startsWith('/'))) {
        return true;
    }

    // Check if the message is from a Neo group before checking for bad words
    if (neoGroups.includes(m.chat) && detectBadWords(m.text)) {
        let senderUsername = m.sender.split('@')[0];
        await conn.reply(m.chat, `⚠️ Warning: @${senderUsername}, please refrain from using inappropriate language.`, null, {
            mentions: [m.sender]
        });

        // Notify the specific group about the bad word usage
        let notificationMessage = `⚠️ Bad language detected from @${senderUsername} in group ${m.chat}.`;
        await conn.reply(notificationGroup, notificationMessage, null, {
            mentions: [m.sender]
        });

        return true; // Stop further processing if a bad word is detected
    }

    if (neoGroups.includes(m.chat)) {
        let senderUsername = m.sender.split('@')[0];
        let textMessage = `${m.text}\n-by @${senderUsername}\n\n_Join for more:_ https://chat.whatsapp.com/GEPZmqMPDthAAUzn0LMygx`;
        let mentions = [m.sender];

        if (/video|image/g.test(mime) && !/webp/g.test(mime)) {
            // Message with media
            let media = await q.download?.();
            for (const neoGroup of neoGroups) {
                await conn.sendFile(neoGroup, media, '', textMessage, null, false, { mentions });
            }
        } else {
            // General text message
            for (const neoGroup of neoGroups) {
                await conn.reply(neoGroup, textMessage, null, { mentions });
            }
        }
    }

    return true;

    // Function to check for bad words
    function detectBadWords(text) {
        const lowerText = text.toLowerCase();
        return badWords.some(word => lowerText.includes(word));
    }
}
