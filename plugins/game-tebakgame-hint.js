let handler = async (m, { conn }) => {
    conn.tebakgame = conn.tebakgame ? conn.tebakgame : {}
    let id = m.chat
    if (!(id in conn.tebakgame)) throw false
    let json = conn.tebakgame[id][1]
                m.reply('```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```'  )
}
handler.customPrefix = /^(hmeg)$/i
handler.command = new RegExp
handler.group = true
module.exports = handler
