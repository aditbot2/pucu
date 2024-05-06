let similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hsur/i.test(m.quoted.text) || /.*hsur/i.test(m.text))
        return !0
    this.tebaksurah = this.tebaksurah ? this.tebaksurah : {}
    if (!(id in this.tebaksurah))
        return m.reply( 'Soal itu telah berakhir')
    if (m.quoted.id == this.tebaksurah[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tebaksurah[id][3])
            delete this.tebaksurah[id]
            return m.reply('*Yah Menyerah :( !*'    )
        }
        let json = JSON.parse(JSON.stringify(this.tebaksurah[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.surah.englishName.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebaksurah[id][2]
            m.react("🟢")
            clearTimeout(this.tebaksurah[id][3])
            delete this.tebaksurah[id]
        } else if (similarity(m.text.toLowerCase(), json.surah.englishName.toLowerCase().trim()) >= threshold)
            m.react("⚪")
        else
            m.react("🔴")
    }
    return !0
}
handler.exp = 0

module.exports = handler;
