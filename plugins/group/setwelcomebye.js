import db from '../../lib/database.js'

let handler = async (m, { conn, command, usedPrefix, text}) => {
	let subject = await conn.getName(m.chat)
	if (!text) return await conn.reply(m.chat, `[ ! ] Enter text.\n\n*Tips :*\n@user - For tag user.${command.includes('bye') ? '' : '\n@subject - For group name.\n@desc - For group description'}\n\n${command.includes('bye') ? `*Example :*\n${usedPrefix + command} Sayonara @user!\n\n*Result :*\nSayonara @${m.sender.split('@')[0]} !` : `*Example :*\n${usedPrefix + command} Hallo @user, Welcome to @subject\n\n*Result :*\nHallo @${m.sender.split('@')[0]}, Welcome to ${subject}`}`, m, { mentions: [m.sender] })
	let chat = db.data.chats[m.chat]
	if (text.toLowerCase() == 'default' || text.toLowerCase() == 'reset') text = ''
	if (command.includes('bye')) chat.sBye = text
	else chat.sWelcome = text
	await m.reply(`Changed has been made for *${command.includes('bye') ? 'Bye' : 'Welcome'}* to :\n\n${text}`)
}

handler.menugroup = ['setwelcome', 'setbye']
handler.tagsgroup = ['group']
handler.command = /^(set(welcome|bye))$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler
