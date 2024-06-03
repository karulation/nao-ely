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

    // Find the task with the given ID
    const taskIndex = taskData.task.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return conn.reply(m.chat, 'Invalid task ID.', m);
    }

    // Check if the task is already claimed
    if (taskData.task[taskIndex].staff !== 'No staff assigned') {
        return conn.reply(m.chat, `This task is already claimed by ${taskData.task[taskIndex].staff}.`, m);
    }

    // Claim the task
    const userName = m.pushName || m.sender.split('@')[0]; // Use the user's name or identifier
    taskData.task[taskIndex].staff = userName;

    // Save the updated data back to the JSON file
    fs.writeFileSync(taskFilePath, JSON.stringify(taskData, null, 2));

    // Reply confirming the claim with task details
    const claimedTask = taskData.task[taskIndex];
    const message = `✅ *Task Claimed Successfully!* ✅\n\n` +
                    `🆔 *ID:* ${claimedTask.id}\n` +
                    `📝 *Detail:* ${claimedTask.detail}\n` +
                    `📅 *Due Date:* ${claimedTask.due}\n` +
                    `👥 *Assigned to:* ${claimedTask.staff}\n` +
                    `🔖 *Status:* ${claimedTask.status}\n\n` +
                    `Good luck with the task! 👍`;

    await conn.reply(m.chat, message, m);
};

handler.command = /^(claimtask)$/i;

export default handler;
