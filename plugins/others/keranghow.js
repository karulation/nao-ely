let handler = async (m, { conn, command, text, usedPrefix }) => {
	if (!text) throw `Use example ${usedPrefix}${command} i'm`
	conn.reply(m.chat, `
  ${command} *${text}*
  *${text}* is *${(101).getRandom()}*% ${command.replace('how', '').replace('cek', '').toUpperCase()}
  `.trim(), m, m.mentionedJid ? {
		mentions: m.mentionedJid
	} : {})
}

handler.menufun = ['smart', 'beatiful', 'handsome', 'stress', 'sadboy'].map(v => 'how' + v + ' siapa?')
handler.tagsfun = ['kerang']
handler.command = /^((how)(smart|beatiful|handsome|stress?|sadboy))/i

handler.group = true

export default handler
