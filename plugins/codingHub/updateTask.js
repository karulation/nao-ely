import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to the JSON file
const taskFilePath = path.join(__dirname, '../../src/data/codinghub.json');

// Load the JSON data
let taskData = JSON.parse(fs.readFileSync(taskFilePath));

// Define valid statuses
const validStatuses = ["Pending", "In Progress", "Completed"];

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Check if the chat is the specific one where this command should work
    if (m.chat !== '120363162175386174@g.us') {
        return;
    }

    // Check if the command has the correct format
    if (!text) {
        return conn.sendMessage(m.chat, {
            text: `🚨 *Usage:* Send command *${usedPrefix + command} [task ID] [new status]*\nExample: *${usedPrefix + command} 1 Completed* 🚨`,
            quoted: m,
        });
    }

    // Extract task ID and new status from the text
    const [taskId, ...statusParts] = text.split(' ');
    const newStatus = statusParts.join(' ').toLowerCase(); // Convert to lowercase for comparison

    // Validate the new status
    if (!validStatuses.map(status => status.toLowerCase()).includes(newStatus)) {
        return conn.reply(m.chat, `Invalid status. Please use one of the following: ${validStatuses.join(', ')}.`, m);
    }

    // Find the task with the given ID
    const taskIndex = taskData.task.findIndex(task => task.id === parseInt(taskId));

    if (taskIndex === -1) {
        return conn.reply(m.chat, 'Invalid task ID.', m);
    }

    // Update the task status with the correct casing
    taskData.task[taskIndex].status = validStatuses.find(status => status.toLowerCase() === newStatus);

    // Save the updated data back to the JSON file
    fs.writeFileSync(taskFilePath, JSON.stringify(taskData, null, 2));

    // Reply confirming the update with task details
    const updatedTask = taskData.task[taskIndex];
    const message = `✅ *Task Updated Successfully!* ✅\n\n` +
                    `🆔 *ID:* ${updatedTask.id}\n` +
                    `📝 *Detail:* ${updatedTask.detail}\n` +
                    `📅 *Due Date:* ${updatedTask.due}\n` +
                    `👥 *Assigned to:* ${updatedTask.staff}\n` +
                    `🔖 *New Status:* ${updatedTask.status}\n\n` +
                    `Keep up the great work! 💪`;

    await conn.reply(m.chat, message, m);
};

handler.command = /^(updatetask)$/i;

export default handler;
