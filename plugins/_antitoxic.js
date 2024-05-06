let istoxic = /aku suka kamu/i // tambahin sendiri
let handler = m => m

handler.before = function (m, { isOwner, isBotAdmin }) {
    if ((m.isBaileys && m.fromMe) || m.fromMe || !m.isGroup) return true
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]
    const isantitoxic = istoxic.exec(m.text)
    let hapus = m.key.participant
    let bang = m.key.id
    if (chat.antitoxic && isantitoxic) {

            return this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: hapus }})
        }
    return !0
}
