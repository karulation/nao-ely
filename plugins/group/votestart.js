import { delay } from '../../lib/func.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	conn.vote = conn.vote ? conn.vote : {}
	let id = m.chat
	if (id in conn.vote) {
		throw `There's vote in this chat!_\n\n*${usedPrefix}deletevote* - for delete vote`
	}
	if (!text) return m.reply(`Type your reason for this vote\n\nExample: *${usedPrefix + command} New admin promotion*`)
	//m.reply(`Vote dimulai!\n\n*${usedPrefix}upvote* - untuk ya\n*${usedPrefix}devote* - untuk tidak\n*${usedPrefix}cekvote* - untuk mengecek vote\n*${usedPrefix}hapusvote* - untuk menghapus vote`)
	m.reply(`Vote start!\n\n*${usedPrefix}upvote* - for yes\n*${usedPrefix}devote* - for no\n*${usedPrefix}checkvote* - for check vote\n*${usedPrefix}deletevote* - for delete vote`)
	conn.vote[id] = [text,[],[]]
	//vote[m.chat] = [q, [], []]
	await delay(1200)
	let upvote = conn.vote[id][1]
	let devote = conn.vote[id][2]
	let teks_vote = `*「 VOTE 」*

*${conn.vote[id][0]}*

┌〔 UPVOTE 〕
│ 
├ Total: ${conn.vote[id][1].length}
│ 
└────

┌〔 DEVOTE 〕
│ 
├ Total: ${conn.vote[id][2].length}
│ 
└────

*${usedPrefix}deletevote* - for deleting the vote
*${usedPrefix}upvote* - for upvote
*${usedPrefix}devote* - for devote`
	conn.reply(m.chat, teks_vote, m)
}

handler.menugroup = ['startvote [reason]']
handler.tagsgroup = ['group']
handler.command = /^((start|start)?vote)$/i

handler.group = true
handler.admin = true

export default handler