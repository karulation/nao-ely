import { WAMessageStubType } from '@whiskeysockets/baileys'
import Connection from '../../lib/connection.js'
import db from '../../lib/database.js'
import { ranNumb, padLead } from '../../lib/func.js'

export async function before(m) {
	if (!m.messageStubType || !m.isGroup) return !1
	let edtr = `@${m.sender.split`@`[0]}`
	if (m.messageStubType == 21) {
		await this.reply(m.chat, `${edtr} change group name to :\n*${m.messageStubParameters[0]}*`, fkontak, { mentions: [m.sender] })
	} else if (m.messageStubType == 22) {
		await this.reply(m.chat, `${edtr} change group icon.`, fkontak, { mentions: [m.sender] })
	} else if (m.messageStubType == 1 || m.messageStubType == 23 || m.messageStubType == 132) {
		await this.reply(m.chat, `${edtr} *reset* group link!`, fkontak, { mentions: [m.sender] })
	} else if (m.messageStubType == 24) {
		await this.reply(m.chat, `${edtr} change description.\n\n${m.messageStubParameters[0]}`, fkontak, { mentions: [m.sender] })
	} else if (m.messageStubType == 25) {
		await this.reply(m.chat, `${edtr} change for *${m.messageStubParameters[0] == 'on' ? 'only admin' : 'all members'}* can edit group info.`, fkontak, { mentions: [m.sender] })
	} else if (m.messageStubType == 26) {
		const ms = /on/.test(m.messageStubParameters[0])
		await this.reply(m.chat, `${edtr} have *${ms ? 'close' : 'open'}* group!\nNow ${ms ? 'only admin' : 'all members'} can send message.`, fkontak, { mentions: [m.sender] })
		db.data.chats[m.chat].autolevelup = false
	} else if (m.messageStubType == 28) {
		await this.reply(m.chat, `${edtr} has kick @${m.messageStubParameters[0].split`@`[0]} from group.`, fkontak, { mentions: [m.sender, m.messageStubParameters[0]] })
	} else if (m.messageStubType == 29) {
		await this.reply(m.chat, `${edtr} have promote @${m.messageStubParameters[0].split`@`[0]} as admin.`, fkontak, { mentions: [m.sender, m.messageStubParameters[0]] })
	} else if (m.messageStubType == 30) {
		await this.reply(m.chat, `${edtr} have demote @${m.messageStubParameters[0].split`@`[0]} from admin.`, fkontak, { mentions: [m.sender, m.messageStubParameters[0]] })
	} else if (m.messageStubType == 72) {
		await this.reply(m.chat, `${edtr} change disappear messages to *@${m.messageStubParameters[0]}*`, fkontak, { mentions: [m.sender] })
	} else if (m.messageStubType == 123) {
		await this.reply(m.chat, `${edtr} *deactivate* disappear messages.`, fkontak, { mentions: [m.sender] })
	} else if (m.messageStubType == 145) {
		const ms = /on/.test(m.messageStubParameters[0])
		await this.reply(m.chat, `${edtr} *${ms ? 'activate' : 'deactivate'}* 'MEMBERSHIP_JOIN_APPROVAL_MODE'.`, fkontak, { mentions: [m.sender] })
	}else if (m.messageStubType == 32 || m.messageStubType == 27) {
		if (process.uptime() < 300) return !1 // won't respond in 5 minutes (60x5), avoid spam while LoadMessages
		let add = m.messageStubType == 27 ? true : false
		let user = m.messageStubParameters[0]
		let id = m.chat
		let chat = db.data.chats[id]
		if (!chat.welcome) return !1
		if (m.chat=="120363020837863962@g.us") return !1 //neo lounge
		let meta = await Connection.store.fetchGroupMetadata(id, this.groupMetadata)
		let bg = `https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/media/picbot/menus/menus_${padLead(ranNumb(43), 3)}.jpg`
		let name = await this.getName(user)
		let namegc = await this.getName(id)
		let ava_cont = 'https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/media/avatar_contact.jpg'
		let pp = await this.profilePictureUrl(user, 'image').catch(_ => ava_cont)
		let ppgc = await this.profilePictureUrl(id, 'image').catch(_ => ava_cont)
		let text = (add ? (chat.sWelcome || this.welcome || Connection.conn.welcome || 'Welcome, @user!').replace('@subject', namegc).replace('@desc', chat.isBanned ? `${chat.lastmute > 0 ? `Bot has been muted for :\n${(chat.mutecd - (new Date - chat.lastmute)).toTimeString()}` : `Bot in maintenance mode.`}` : (meta.desc?.toString() || '~')) : (chat.sBye || this.bye || Connection.conn.bye || 'Bye, @user!')).replace('@user', '@' + user.split('@')[0])
		try {
			const can = await (await import('canvafy')).default
			pp = await new can.WelcomeLeave()
				.setAvatar(pp)
				.setBackground('image', bg)
				.setTitle(add ? 'Welcome' : 'Goodbye', add ? '#3495eb' : '#eb4034')
				.setDescription(`${add ? 'Hello' : 'Sayonara'} ${name} | ${add ? 'Welcome to' : 'Leaving from'} ${namegc}`, '#34eb7d')
				.setBorder("#2a2e35")
				.setAvatarBorder("#2a2e35")
				.setOverlayOpacity(0.6)
				.build()
			await this.sendFile(id, pp, '', text, fkontak, false, { mentions: [user] })
		} catch (e) {
			console.log(e)
			await this.reply(id, text, fkontak, { mentions: [user] })
		}
	} else {
		console.log({
			messageStubType: m.messageStubType,
			messageStubParameters: m.messageStubParameters,
			type: WAMessageStubType[m.messageStubType],
		});
	}
	return !0
}

export const disabled = false
