let linkRegex = /whatsapp.com/i
let handler = m => m

handler.before = async function (m, { user, isBotAdmin, isAdmin, isOwner }) {
  if ((m.isBaileys && m.fromMe) || m.fromMe || !m.isGroup) return true
  let chat = global.db.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)

  if (chat.antilink && isGroupLink) {
    if (isAdmin) return m.reply(Func.texted('bold', 'Lu admin, lu aman'))
    if (!isBotAdmin) return m.reply(Func.texted('italic', 'Jadikan Saya Admin'))
    if (isOwner) return m.reply(Func.texted('bold', 'Ehh gak jadi deh... kamu ownerku ternyata'))

    conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender }})
    //await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
  }
  return true
}

module.exports = handler