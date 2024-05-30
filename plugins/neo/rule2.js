import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = '*Rule Number 2: No Spamming*\n\nWe would like to remind all members that spamming and chain messages are not allowed in our community. Spamming refers to the act of flooding the group chat with multiple messages or sending repetitive content that disrupts the conversation flow. Meanwhile, chain messages refer to any message that encourages members to forward or share the same message to multiple people.\n\nWe consider such actions as disruptive and disrespectful towards other members, and it may lead to unnecessary clutter in the group chat. We encourage all members to respect one anothers space and refrain from sending multiple messages or forwarding chain messages that may annoy other members.\n\nAny member who is found spamming the chat or forwarding chain messages will be warned and reminded to refrain from such actions. If the member continues to do so, they will be removed from the group without any prior warning.\n\nWe want to maintain a healthy and active community where members can interact and engage in meaningful discussions without any disruptions. Therefore, we kindly ask all members to adhere to this rule and respect one anothers space.\n\nThank you for your cooperation.\n\nAny confusion or questions, please do not hesitate to contact any of the admins for clarification.';
         
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['rule2'];
handler.tags = ['neo'];
handler.command = /^(rule2)$/i;

export default handler;
