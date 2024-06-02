import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


export async function before(m, { conn }) {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Define the path to the JSON file
    const neoTeamPath = path.join(__dirname, '../../src/data/neoteam.json');

    // Load the JSON data
    let neoTeam = JSON.parse(fs.readFileSync(neoTeamPath));

    // Function to get today's date in the format "Day" (e.g., "Monday")
    function getDayOfWeek() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const now = new Date();
        return days[now.getDay()];
    }

    // Function to perform the recurring task
    function recurringTask() {
        // Get the current time
        const now = new Date();
        const currentHour = now.getHours();

        // Check if the current hour is before 9 AM (hour < 9)
        if (currentHour < 2) {
            console.log('Recurring task will not run before 9 AM.');
            return; // Exit the function if before 9 AM
        }

        // Get today's date
        const today = now.toLocaleDateString();

        // Check if the last recurring date is the same as today's date
        if (neoTeam.igdepartment.lastRecurringDate === today) {
            console.log('Recurring task already executed for today.');
            return; // Exit the function if already executed for today
        }

        // Get today's day of the week
        const todayDayOfWeek = getDayOfWeek();

        // Array to store names of members who need to post today
        const membersToPost = [];

        // Check each member's days in the department
        neoTeam.igdepartment.members.forEach(member => {
            // If today's day matches any of the member's days, add their name to membersToPost array
            if (member.days.includes(todayDayOfWeek)) {
                membersToPost.push(member.name);
                member.total_need_to_post++;
            }
        });

        // Update the last recurring date to today's date
        neoTeam.igdepartment.lastRecurringDate = today;

        // Save the updated data back to the JSON file
        fs.writeFileSync(neoTeamPath, JSON.stringify(neoTeam, null, 2));

        // Display the names of members who need to post today
        if (membersToPost.length > 0) {
            console.log(`Members who need to post on ${todayDayOfWeek} (${today}):`);
            var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
            conn.sendFile('120363226270078711@g.us', media, 'image.jpg', `*Members who need to post on ${todayDayOfWeek} (${today}):*\n- ${membersToPost.join('\n- ')}`, m);
            membersToPost.forEach(name => console.log(`- ${name}`));
        } else {
            console.log(`No members need to post on ${todayDayOfWeek} (${today}).`);
        }

        console.log('Recurring task executed at', new Date().toLocaleTimeString());
    }



    // Function to schedule the recurring task
    function scheduleRecurringTask() {
        recurringTask(); // Execute the task immediately
        setInterval(recurringTask, 24 * 60 * 60 * 1000); // Schedule the task to run every 24 hours (once a day)
    }

    // Schedule the recurring task
    scheduleRecurringTask();
}
