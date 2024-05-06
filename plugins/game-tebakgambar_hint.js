let handler = async (m, { conn }) => {
    conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}
    let id = m.chat
    if (!(id in conn.tebakgambar)) throw false
    let json = conn.tebakgambar[id][1]
        m.reply('```' + json.jawaban.replace(/[AIUEOaiueopghns]/ig, '_') + '```'  )
}
handler.customPrefix = /^(hgam)$/i
handler.command = new RegExp
module.exports = handler
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
