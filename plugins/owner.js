let handler = async (m, { conn }) => {
let yy = await conn.sendContact(m.chat, [{ name: `${global.set.nameown}`, number: global.owner, about: 'Hanya seorang pemula yang baru belajar bot:)' }], m, { org: 'Developer', website: '', email: 'ucupnetwork@gmail.com', location: 'Jepang' })

}
handler.customPrefix = /^(owner)$/i
handler.command = new RegExp

module.exports = handler