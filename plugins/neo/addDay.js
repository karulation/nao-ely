import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Define the path to the JSON file
const neoTeamPath = path.join(__dirname, '../../src/data/neoteam.json');

// Load the JSON data
let neoTeam = JSON.parse(fs.readFileSync(neoTeamPath));

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Check if the chat is the specific one where this command should work
    if (m.chat !== '60177637943-1634743268@g.us') {
        return;
    }

    // Check if the command has the correct format
    if (!text) {
        return conn.sendMessage(m.chat, {
            text: `Send command *${usedPrefix + command} [member] [days]*. Example: *${usedPrefix + command} ren sunday monday*`,
            quoted: m,
        });
    }

    // Extract member and days from the text
    const [member, ...days] = text.split(' ');

    // Ensure the required department exists and member is part of it
    if (!neoTeam['igdepartment']) return conn.reply(m.chat, 'Invalid department name.', m);
    if (!neoTeam['igdepartment'][member]) return conn.reply(m.chat, 'Invalid member name.', m);

    // Assign the days to the member
    neoTeam['igdepartment'][member].days = days;

    // Save the updated data back to the JSON file
    fs.writeFileSync(neoTeamPath, JSON.stringify(neoTeam, null, 2));

    // Reply confirming the update
    await conn.reply(m.chat, 'Successfully added days for the member in the department.', m);
}

handler.command = /^(addday)$/i

export default handler
