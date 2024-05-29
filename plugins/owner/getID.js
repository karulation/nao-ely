import fs from 'fs'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	m.reply(`_[!] Please wait master, I'm sending the chat ID of this group to you privately. . ._`)
	try {
		await conn.sendMessage(m.sender, `Chat ID: ${m.chat}`, { quoted: m })
	} catch (e) {
		console.log(e)
		m.reply('Error occured, check logs.')
	}
}

handler.menuowner = ['getid']
handler.tagsowner = ['owner']
handler.command = /^(getid)$/i

handler.owner = true

export default handler
