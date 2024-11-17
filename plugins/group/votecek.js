let handler = async (m, { conn, usedPrefix }) => {
	let id = m.chat
	conn.vote = conn.vote ? conn.vote : {}
	if (!(id in conn.vote)) throw `_*no vote in this group!*_\n\n*${usedPrefix}startvote* - for starting the vote`
	
	let [reason, upvote, devote] = conn.vote[id]
	let mentionedJid = [...upvote, ...devote]
	m.reply(
`*「 VOTE 」*

*${reason}*

┌〔 UPVOTE 〕
│
├ Total: ${upvote.length}
${upvote.map(u => '├ @' + u.split('@')[0]).join('\n')}
│ 
└────

┌〔 DEVOTE 〕
│ 
├ Total: ${devote.length}_
${devote.map(u => '├ @' + u.split('@')[0]).join('\n')}
│ 
└────

*${usedPrefix}deletevote* - to delete vote

_© ${pauthor}_
`.trim(), false, { contextInfo: { mentionedJid } })
}

handler.menugroup = ['checkvote']
handler.tagsgroup = ['group']
handler.command = /^(checkvote)$/i

handler.group = true

export default handler 
