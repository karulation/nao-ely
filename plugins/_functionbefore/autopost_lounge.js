import db from '../../lib/database.js';

export async function before(m, { conn, text, participants }) {
    // Group IDs
    const groupID = '120363020837863962@g.us'; // Replace with actual group ID
    const gamingGroup = '120363226270078711@g.us'; // Replace with actual gaming group ID
    const nonGamingGroups = ['60177637943-1627735681@g.us', '60177637943-1634746023@g.us']; // Replace with actual non-gaming group IDs

    // Function to check if a string only contains emojis or is empty
    const isOnlyEmoteOrEmpty = (text) => {
        if (!text || text.trim() === '') {
            return true; // Empty message
        }
        const emojiRegex = /^(\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{Emoji}\uFE0F)+$/u;
        return emojiRegex.test(text.trim());
    };

    // Return early if the message only contains emojis, is empty, or starts with a slash
    if (isOnlyEmoteOrEmpty(m.text) || m.text.trim().startsWith('/')) {
        return true;
    }

    if (m.chat === groupID) {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || '';
        let senderUsername = m.sender.split('@')[0];
        let textMessage = `${m.text}\n\n-by @${senderUsername}`;
        let mentions = [m.sender];

        if (isGamingMessage(m.text)) {
            if (/video|image/g.test(mime) && !/webp/g.test(mime)) {
                // Gaming message with media
                let media = await q.download?.();
                await conn.sendFile(gamingGroup, media, '', textMessage, null, false, { mentions });
            } else {
                // Gaming text message
                await conn.reply(gamingGroup, textMessage, null, { mentions });
            }
        } else {
            if (/video|image/g.test(mime) && !/webp/g.test(mime)) {
                // General message with media
                // let media = await q.download?.();
                for (const nonGamingGroup of nonGamingGroups) {
                    let media = await q.download?.();
                    await conn.sendFile(nonGamingGroup, media, '', textMessage, null, false, { mentions });
                }
            } else {
                // General text message
                for (const nonGamingGroup of nonGamingGroups) {
                    await conn.reply(nonGamingGroup, textMessage, null, { mentions });
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
        'star rail', 'genshin', 'call of duty'
    ];
    const lowerText = text.toLowerCase(); // Convert text to lowercase for case-insensitive comparison
    return gamingKeywords.some(keyword => lowerText.includes(keyword)); // Check if any keyword exists in the text
}
