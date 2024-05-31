import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ffmpeg from 'fluent-ffmpeg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    // Check if the message contains an image or video
    if (!/image\/(jpe?g|png)/.test(mime) && !/video\/mp4/.test(mime)) {
        throw `Tag an image or video with the caption *${usedPrefix + command}* to resize and overlay it.`;
    }

    try {
        // Download the media
        let media = await q.download?.();

        // Define the overlay image path
        let overlayPath = path.join(__dirname, '../../media/watermarkMeme.png');

        if (/image\/(jpe?g|png)/.test(mime)) {
            // Read the overlay image
            let overlayImage = fs.readFileSync(overlayPath);

            // Resize the image to 1080x1080 pixels with center zoom and overlay it
            let resizedImage = await sharp(media)
                .resize({
                    width: 1080,
                    height: 1080,
                    fit: 'cover',
                    position: 'center'
                })
                .composite([{ input: overlayImage, gravity: 'center' }]) // Overlay the image in the center
                .toBuffer();

            // Send the resized and overlaid image back to the chat
            await conn.sendFile(m.chat, resizedImage, 'neo_watermarked.jpg', 'Here is your image with NEOANICOM watermark!', m);
        } else if (/video\/mp4/.test(mime)) {
            // Save the downloaded video to a temporary file
            let videoPath = path.join(__dirname, '../../media/temp_video.mp4');
            fs.writeFileSync(videoPath, media);

            // Define the output path for the watermarked video
            let outputPath = path.join(__dirname, '../../media/neo_watermarked_video.mp4');

            // Overlay the watermark on the video using ffmpeg
            ffmpeg(videoPath)
                .input(overlayPath)
                .complexFilter([
                    '[0:v]scale=1080:1080:force_original_aspect_ratio=decrease,pad=1080:1080:(ow-iw)/2:(oh-ih)/2:black[scaled]',
                    '[scaled][1:v]overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2[final]'
                ])
                .outputOptions('-map [final]') // Map the final output to the processed video stream
                .outputOptions('-map 0:a?') // Map the audio stream if it exists
                .outputOptions('-c:v libx264') // Use H.264 codec for video
                .outputOptions('-c:a copy') // Copy audio stream
                .output(outputPath) // Specify the output path
                .on('end', async () => {
                    // Send the watermarked video back to the chat
                    await conn.sendFile(m.chat, outputPath, 'neo_watermarked_video.mp4', 'Here is your video with NEOANICOM watermark!', m);

                    // Clean up the temporary files
                    fs.unlinkSync(videoPath);
                    fs.unlinkSync(outputPath);
                })
                .on('error', (error) => {
                    console.error('Error processing video:', error);
                    conn.reply(m.chat, 'Sorry, there was an error processing your video.', m);
                })
                .run();
        }
    } catch (error) {
        console.error('Error resizing image or processing video:', error);
        await conn.reply(m.chat, 'Sorry, there was an error processing your media.', m);
    }
}

handler.help = ['neomark'];
handler.tags = ['tools'];
handler.command = /^(neomark)$/i;

export default handler;
