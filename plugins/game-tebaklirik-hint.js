let handler = async (m, { conn }) => {
    conn.tebaklirik = conn.tebaklirik ? conn.tebaklirik : {}
    let id = m.chat
    if (!(id in conn.tebaklirik)) throw false
    let json = conn.tebaklirik[id][1]
    m.reply('```' + json.jawaban.replace(/[AIUEOabcdhlmrwiueo]/ig, '_')+ '```'  )
}
handler.customPrefix = /^(hlirik)$/i
handler.command = new RegExp
handler.group = true
module.exports = handler
