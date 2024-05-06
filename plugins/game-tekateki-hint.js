let handler = async (m, { conn }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    let id = m.chat
    if (!(id in conn.tekateki)) throw false
    let json = conn.tekateki[id][1]
                m.reply('```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```'  )
}
handler.customPrefix = /^(htek)$/i
handler.command = new RegExp
module.exports = handler
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
