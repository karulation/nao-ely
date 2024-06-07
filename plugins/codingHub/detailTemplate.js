// Function to generate message template
function generateMessageTemplate(userPhone, projectDetail, dueDate, totalPayment) {
    // Calculate deposit amount
    const depositAmount = (totalPayment * 0.35).toFixed(2);
    
    // Generate the message
    const message = `📞 *User Phone Number:* ${userPhone}\n\n` +
                    `📋 *Project Detail:* ${projectDetail}\n\n` +
                    `📅 *Due Date:* ${dueDate}\n\n` +
                    `💰 *Total Payment:* $${totalPayment}\n` +
                    `💵 *Deposit Required (35%):* $${depositAmount}\n\n` +
                    `🔧 *Service Details:*\n` +
                    `- Client needs to pay 35% of the total payment as a deposit.\n` +
                    `- Pay the balance after the project is done.\n` +
                    `- Any additional services can be charged.\n` +
                    `- Client has 3 days of support after the project is handed over.`;

    return message;
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Check if the chat is the specific one where this command should work
    if (m.chat !== '120363162175386174@g.us') {
        return;
    }

    // Check if the command has the correct format
    if (!text) {
        return conn.sendMessage(m.chat, {
            text: `🚨 *Usage:* Send command *${usedPrefix + command} [phone number] | [project detail] | [due date] | [total payment]*\nExample: *${usedPrefix + command} +123456789 | Develop a new e-commerce website | 2024-06-30 | 1500* 🚨`,
            quoted: m,
        });
    }

    // Extract phone number, project detail, due date, and total payment from the text
    const [userPhone, projectDetail, dueDate, totalPayment] = text.trim().split(/\s*\|\s*/);

    // Ensure all required details are provided
    if (!userPhone || !projectDetail || !dueDate || !totalPayment) {
        return conn.sendMessage(m.chat, {
            text: `🚨 *Usage:* Send command *${usedPrefix + command} [phone number] | [project detail] | [due date] | [total payment]*\nExample: *${usedPrefix + command} +123456789 | Develop a new e-commerce website | 2024-06-30 | 1500* 🚨`,
            quoted: m,
        });
    }

    // Generate the message template
    const message = generateMessageTemplate(userPhone, projectDetail, dueDate, totalPayment);

    // Reply confirming the addition with details
    await conn.reply(m.chat, message, m);
};

handler.command = /^(codingtemplate)$/i;

export default handler;
