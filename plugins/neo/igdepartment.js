import fs from 'fs'
import path from 'path'

// Define the path to the JSON file
const neoTeamPath = path.join(__dirname, 'path_to_your_neo_team_json_file.json');

// Load the JSON data
let neoTeam = JSON.parse(fs.readFileSync(neoTeamPath));

let handler = async (m, { conn }) => {
    // Check if the chat is the specific one where this command should work
    if (m.chat !== '60177637943-1634743268@g.us') {
        return;
    }

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
}

handler.help = ['igtask']
handler.tags = ['NEO INSTAGRAM']
handler.command = /^(igtask)$/i

export default handler
