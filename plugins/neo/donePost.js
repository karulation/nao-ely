import fs from 'fs'
import path from 'path'

// Define the path to the JSON file
const neoTeamPath = path.join(__dirname, '../../src/data/neoteam.json');

// Load the JSON data
let neoTeam = JSON.parse(fs.readFileSync(neoTeamPath));

let handler = async (m, { conn, text }) => {
    // Check if the chat is the specific one where this command should work
    if (m.chat !== '60177637943-1634743268@g.us') {
        return;
    }

    // Assuming `text` is the member's name
    const memberName = text.trim(); // Ensure no leading/trailing spaces
    const department = neoTeam['igdepartment'].members;

    // Find the member in the department
    const memberIndex = department.findIndex(member => member.name === memberName);

    if (memberIndex === -1) {
        return conn.sendMessage(m.chat, {
            text: '*Not a member of the IG department*',
            quoted: m,
        });
    }

    const IGmember = department[memberIndex];

    // Check if the member has any posts left to complete
    if (IGmember.total_need_to_post <= 0) {
        return conn.reply(m.chat, 'You have already completed all your posts.', m);
    }

    // Deduct 1 from the total need to post for the member
    IGmember.total_need_to_post--;

    // Save the updated data back to the JSON file
    fs.writeFileSync(neoTeamPath, JSON.stringify(neoTeam, null, 2));

    // Confirm the update
    await conn.sendMessage(m.chat, {
        text: 'Post completed! Your total need to post has been updated.',
        quoted: m,
    });
}

handler.help = ['donepost']
handler.tags = ['NEO INSTAGRAM']
handler.command = /^(donepost)$/i

export default handler
