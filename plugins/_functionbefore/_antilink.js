import db from '../../lib/database.js'

export async function before(m, { isAdmin, text, isBotAdmin }) {
    if (!m.isGroup) return !1 // Ignore if it's not a group message
    let chat = db.data.chats[m.chat] // Get chat data from the database
    const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi // Regex to detect links
    const isGroupLink = linkRegex.exec(m.text) // Check if the message contains a link
    if (chat.antiLink && isGroupLink && !isAdmin) { // If anti-link is enabled and the sender is not an admin
        if (isBotAdmin) { // Check if the bot is an admin
            const p = await this.groupInviteCode(m.chat) // Get the group invite code
            const linkThisGroup = `https://chat.whatsapp.com/${p}` // Create the group link
            text = [...m.text.matchAll(linkRegex)].map(v => v[0]).filter(v => !v.includes(p)) // Extract links and exclude the group's own link
            if (m.text.includes(linkThisGroup) && text.length == 0) return !0 // Ignore if it's the group's own link
        }
        if (!m.fromMe && isBotAdmin) {
            // Delete the message if the bot is an admin
            await this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender } })
        }
        // Notify the user who sent the link
        await this.reply(m.chat, `@${(m.sender || '').replace(/@s\.whatsapp\.net/g, '')} *terdeteksi* mengirim Link Group!`, null, { mentions: [m.sender] })
    }
    return !0
}
