import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to the JSON file
const taskFilePath = path.join(__dirname, '../../src/data/codinghub.json');

// Load the JSON data
let taskData = JSON.parse(fs.readFileSync(taskFilePath));

// Helper function to generate a new task ID
function generateNewTaskId(tasks) {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Check if the chat is the specific one where this command should work
    if (m.chat !== '120363162175386174@g.us') {
        return;
    }

    // Check if the command has the correct format
    if (!text) {
        return conn.sendMessage(m.chat, {
            text: `🚨 *Usage:* Send command *${usedPrefix + command} [task detail] | [due date]*\nExample: *${usedPrefix + command} Fix the bug in the login feature | 2024-06-30* 🚨`,
            quoted: m,
        });
    }

    // Extract task detail and due date from the text
    const [taskDetail, dueDate] = text.trim().split(/\s*\|\s*/);

    // Generate a new task ID
    const newTaskId = generateNewTaskId(taskData.task);

    // Create a new task object with default values and specified due date
    const newTask = {
        id: newTaskId,
        detail: taskDetail,
        due: dueDate || "No due date",
        staff: "No staff assigned",
        status: "Pending"
    };

    // Add the new task to the task array
    taskData.task.push(newTask);

    // Save the updated data back to the JSON file
    fs.writeFileSync(taskFilePath, JSON.stringify(taskData, null, 2));

    // Prepare a fancy message with task details
    const message = `🎉 *New Task Added!* 🎉\n\n` +
                    `🆔 *ID:* ${newTask.id}\n` +
                    `📝 *Detail:* ${newTask.detail}\n` +
                    `📅 *Due Date:* ${newTask.due}\n\n` +
                    `/claimtask to claim! 💪`;

    // Reply confirming the addition with details
    await conn.reply(m.chat, message, m);
};

handler.command = /^(addtask)$/i;

export default handler;
