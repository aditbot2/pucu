let handler = async (m, { conn }) => {
    conn.lengkapi = conn.lengkapi ? conn.lengkapi : {}
    let id = m.chat
    if (!(id in conn.lengkapi)) throw false
    let json = conn.lengkapi[id][1]
                m.reply('```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```'  )
}
handler.customPrefix = /^(hleng)$/i
handler.command = new RegExp
module.exports = handler
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)