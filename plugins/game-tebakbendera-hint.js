let handler = async (m, { conn }) => {
    conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {}
    let id = m.chat
    if (!(id in conn.tebakbendera)) throw false
    let json = conn.tebakbendera[id][1]
    m.reply('```' + json.name.replace(/[AIUEOaiueo]/ig, '_') + '```'  )
}
handler.customPrefix = /^(hben)$/i
handler.command = new RegExp
handler.group = true
module.exports = handler
