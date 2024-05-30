import sharp from 'sharp';
import { downloadMediaMessage } from '@adiwajshing/baileys';
import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    // Check if the message contains an image
    if (!/image\/(jpe?g|png)/.test(mime)) {
        throw `Tag an image with the caption *${usedPrefix + command}* to resize it.`;
    }

    try {
        // Download the image
        let media = await downloadMediaMessage(q);

        // Define the overlay image path
        let overlayPath = path.join(__dirname, 'overlay.png');

        // Read the overlay image
        let overlayImage = fs.readFileSync(overlayPath);

        // Resize the image to 1080x1080 pixels and overlay it
        let resizedImage = await sharp(media)
            .resize(1080, 1080, {
                fit: sharp.fit.cover,
                position: sharp.strategy.entropy
            })
            .composite([{ input: overlayImage, gravity: 'center' }]) // Overlay the image in the center
            .toBuffer();

        // Send the resized and overlaid image back to the chat
        await conn.sendFile(m.chat, resizedImage, 'resized_with_overlay.jpg', 'Here is your resized image with the overlay!', m);
    } catch (error) {
        console.error('Error resizing image:', error);
        await conn.reply(m.chat, 'Sorry, there was an error processing your image.', m);
    }
}

handler.help = ['neomark']
handler.tags = ['tools']
handler.command = /^(neomark)$/i

export default handler;
