import db from '../../lib/database.js';

export async function before(m, { conn, text, participants }) {
    // Group IDs
    const groupID = '120363020837863962@g.us'; // Replace with actual group ID
    const gamingGroups = ['120363022290154127@g.us']; // Replace with actual gaming group ID
    const nonGamingGroups = ['60177637943-1627735681@g.us', '60177637943-1634746023@g.us']; // Replace with actual non-gaming group IDs

    // Function to check if a string only contains emojis or is empty
    const isOnlyEmoteOrEmpty = (text) => {
        if (!text || text.trim() === '') {
            return true; // Empty message
        }

        // More robust emoji regex (detects skin tones, gender variants, and newer emojis)
        const emojiRegex = /^(\p{Extended_Pictographic}|\p{Emoji}|\p{Emoji_Component}|\p{Emoji_Modifier}|\p{Emoji_Modifier_Base}|\p{Emoji_Presentation})+$/u;

        return emojiRegex.test(text.trim());
    };


    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    // Return early if the message only contains emojis, is empty, or starts with a slash ("/")
    // but allow processing if there is media attached
    if (!mime && (isOnlyEmoteOrEmpty(m.text) || m.text.trim().startsWith('/'))) {
        return true;
    }

    if (m.chat === groupID) {
        console.log('Lounge message');
        let senderUsername = m.sender.split('@')[0];
        let textMessage = `${m.text}\n-by @${senderUsername}\n\n_Join for more:_ https://chat.whatsapp.com/GEPZmqMPDthAAUzn0LMygx`;
        let mentions = [m.sender];

        if (isGamingMessage(m.text)) {
            if (/video|image/g.test(mime) && !/webp/g.test(mime)) {
                // Gaming message with media
                for (const gamingGroup of gamingGroups) {
                    let media = await q.download?.();
                    await conn.sendFile(gamingGroup, media, '', textMessage, null, false, { mentions });
                }
            } else {
                for (const gamingGroup of gamingGroups) {
                    await conn.reply(gamingGroup, textMessage, null, { mentions });
                }
            }
        } else {
            if (/video|image/g.test(mime) && !/webp/g.test(mime)) {
                // General message with media
                for (const nonGamingGroup of nonGamingGroups) {
                    let media = await q.download?.();
                    await conn.sendFile(nonGamingGroup, media, '', textMessage, null, false, { mentions });
                }
                for (const gamingGroup of gamingGroups) {
                    let media = await q.download?.();
                    await conn.sendFile(gamingGroup, media, '', textMessage, null, false, { mentions });
                }
            } else {
                // General text message
                for (const nonGamingGroup of nonGamingGroups) {
                    await conn.reply(nonGamingGroup, textMessage, null, { mentions });
                }
                for (const gamingGroup of gamingGroups) {
                    await conn.reply(gamingGroup, textMessage, null, { mentions });
                }
            }
        }
    }

    return true;
}

// Function to check for gaming keywords
function isGamingMessage(text) {
    const gamingKeywords = [
        'wild rift', 'mobile legends', 'league of legends', 'dota', 'pubg', 'fortnite',
        'apex legends', 'valorant', 'honkai', 'wuthering waves', 'blue archive',
        'star rail', 'genshin', 'call of duty', 'epic games', 'riot games', 'mihoyo', 'esports',
        'menang', 't1', 'win', 'league'
    ];
    const lowerText = text.toLowerCase(); // Convert text to lowercase for case-insensitive comparison
    return gamingKeywords.some(keyword => lowerText.includes(keyword)); // Check if any keyword exists in the text
}
