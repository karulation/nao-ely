// Function to generate invoice message
function generateInvoiceMessage(details) {
    // Parse details and prices
    const items = details.map(item => {
        const [detail, price] = item.split('=');
        return { detail: detail.trim(), price: parseFloat(price.trim()) };
    });

    // Calculate total amount
    const totalAmount = items.reduce((total, item) => total + item.price, 0);

    // Generate invoice message
    let message = '📋 *Invoice* 📋\n\n';
    items.forEach((item, index) => {
        message += `*${index + 1}.* ${item.detail}: $${item.price}\n`;
    });
    message += '\n';
    message += `💰 *Total Amount:* $${totalAmount.toFixed(2)}`;

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
            text: `🚨 *Usage:* Send command *${usedPrefix + command} [detail1 = price1] [detail2 = price2] ...*`,
            quoted: m,
        });
    }

    // Extract details and prices from the input
    const details = text.trim().split(/\s+/);

    // Generate the invoice message
    const message = generateInvoiceMessage(details);

    // Reply with the invoice message
    await conn.reply(m.chat, message, m);
};

handler.command = /^(calculatep)$/i;

export default handler;
