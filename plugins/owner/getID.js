import fs from 'fs';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  // Send a reply message to the group indicating that the process has started
  m.reply(`_[!] Please wait master, I'm sending the chat ID of this group to you privately..._`);

  try {
    // Send the chat ID to the user's private chat
    await conn.sendMessage(m.sender, { text: `Chat ID: ${m.chat}` }, { quoted: m });
  } catch (e) {
    // Log the error for debugging purposes
    console.error('Error occurred while sending the message:', e);
    // Send an error message to the group
    m.reply('An error occurred. Please check the logs.');
  }
};

// Define handler properties
handler.menuowner = ['getid'];
handler.tagsowner = ['owner'];
handler.command = /^(getid)$/i;
handler.owner = true;

export default handler;
