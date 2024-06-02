import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to the JSON file
const neoTeamPath = path.join(__dirname, '../../src/data/neoteam.json');

let handler = async (m, { conn }) => {
    try {
        if (m.chat !== '60177637943-1634743268@g.us') {
            return;
        }
        
        // Load the JSON data
        let neoTeam = JSON.parse(fs.readFileSync(neoTeamPath, 'utf-8'));

        // Check if the department data exists
        if (!neoTeam['igdepartment']) {
            return conn.reply(m.chat, 'No department data available.', m);
        }

        let departmentData = '📊 *IG Department Overview* 📊\n\n';

        // Fetching data from the JSON file
        var department = neoTeam['igdepartment'].members;

        // Iterating through each member in the department
        department.forEach(member => {
            departmentData += `*Member*: ${member.name}\n`;
            // Check if 'days' exists and is an array
            if (Array.isArray(member.days)) {
                departmentData += `*Days*: ${member.days.join(', ')}\n`;
            } else {
                departmentData += `*Days*: No data available\n`;
            }
            departmentData += `*Total Need to Post*: ${member.total_need_to_post}\n\n`;
        });

        await conn.sendMessage(m.chat, {
            text: departmentData,
            quoted: m,
        });
    } catch (error) {
        console.error('Error reading JSON data:', error);
        await conn.reply(m.chat, 'Sorry, there was an error processing the data.', m);
    }
};

// handler.help = ['igtask']
// handler.tags = ['NEO INSTAGRAM']
handler.command = /^(igtask)$/i

export default handler;
