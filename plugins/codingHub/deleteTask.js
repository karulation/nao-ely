import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to the JSON file
const taskFilePath = path.join(__dirname, '../../src/data/codinghub.json');

// Load the JSON data
let taskData = JSON.parse(fs.readFileSync(taskFilePath));

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Check if the chat is the specific one where this command should work
    if (m.chat !== '120363162175386174@g.us') {
        return;
    }

    // Check if the command has the correct format
    if (!text) {
        return conn.sendMessage(m.chat, {
            text: `🚨 *Usage:* Send command *${usedPrefix + command} [task ID]*\nExample: *${usedPrefix + command} 1* 🚨`,
            quoted: m,
        });
    }

    // Extract task ID from the text
    const taskId = parseInt(text.trim());

    // Find the index of the task with the given ID
    const taskIndex = taskData.task.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return conn.reply(m.chat, 'Invalid task ID.', m);
    }

    // Remove the task from the task list
    taskData.task.splice(taskIndex, 1);

    // Save the updated data back to the JSON file
    fs.writeFileSync(taskFilePath, JSON.stringify(taskData, null, 2));

    // Reply confirming the deletion
    await conn.reply(m.chat, 'Successfully deleted the task.', m);
};

handler.command = /^(deletetask)$/i;

export default handler;
