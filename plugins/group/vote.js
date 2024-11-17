let handler = async (m, { conn, usedPrefix, command }) => {
	let id = m.chat
	conn.vote = conn.vote ? conn.vote : {}
	if (!(id in conn.vote)) throw `_*There's no voting in this group!*_\n\n*${usedPrefix}vote* - to start vote`
	let isVote = conn.vote[id][1].concat(conn.vote[id][2])
	const wasVote = isVote.includes(m.sender)
	if (wasVote) throw 'You already vote!'
	if (/up/i.test(command)) {
		conn.vote[id][1].push(m.sender)
		m.reply(`Successfully upvote!\n\n*${usedPrefix}checkvote* to check vote list`)
	} else if (/de/i.test(command)) {
		conn.vote[id][2].push(m.sender)
		m.reply(`Successfully devote!\n\n*${usedPrefix}checkvote* to check vote list`)
	}

}

handler.menugroup = ['vote']
handler.tagsgroup = ['group']
handler.command = /^((up|de)vote)$/i

handler.group = true

export default handler 