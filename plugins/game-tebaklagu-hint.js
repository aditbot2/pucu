let handler = async (m, { conn }) => {
    conn.tebaklagu = conn.tebaklagu ? conn.tebaklagu : {}
    let id = m.chat
    if (!(id in conn.tebaklagu)) throw false
    let json = conn.tebaklagu[id][1]
    conn.reply(m.chat, '```' + json.judul.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.customPrefix = /^(hlag)$/i
handler.command = new RegExp
handler.group = true
module.exports = handler
