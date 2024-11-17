let handler = async (m, { conn, usedPrefix }) => {
	let id = m.chat
	conn.vote = conn.vote ? conn.vote : {}
	if (!(id in conn.vote)) return m.reply(`_*there's no voting in this group!*_\n\n*${usedPrefix}vote* - to start a vote`)
	delete conn.vote[id]
	m.reply(`Successfully delete the vote`)

}

handler.menugroup = ['deletevote']
handler.tagsgroup = ['group']
handler.command = /^((del(ete)?|hapus)vote)$/i

handler.group = true
handler.admin = true

export default handler 