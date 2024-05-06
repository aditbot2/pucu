let similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hleng/i.test(m.quoted.text) || /.*hleng/i.test(m.text))
        return !0
    this.lengkapi = this.lengkapi ? this.lengkapi : {}
    if (!(id in this.lengkapi))
        return m.reply( 'Soal itu telah berakhir')
    if (m.quoted.id == this.lengkapi[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.lengkapi[id][3])
            delete this.lengkapi[id]
            return m.reply('*Yah Menyerah*')
        }
        let json = JSON.parse(JSON.stringify(this.lengkapi[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.lengkapi[id][2]
m.react("🟢")
            clearTimeout(this.lengkapi[id][3])
            delete this.lengkapi[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
            m.react("⚪")
        else
m.react("🔴")
    }
    return !0
}
handler.exp = 0
module.exports = handler