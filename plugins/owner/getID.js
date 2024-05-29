import db from '../../lib/database.js'

let handler = async (m, { args }) => {
	let id = args[0] ? args[0] : m.isGroup ? m.chat : ''
	if (!id) throw `input group id !`
	if (!chat) return m.reply(`[!] Invalid ID Group`)
	await m.reply('Yaho Karu! Here is the ID : '+m.chat);
}

handler.menuowner = ['getid']
handler.tagsowner = ['owner']
handler.command = /^(getid)$/i

handler.owner = true

export default handler
