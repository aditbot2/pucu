let handler = async (m, { conn }) => {
    conn.tebakanime = conn.tebakanime ? conn.tebakanime : {}
    let id = m.chat
    if (!(id in conn.tebakanime)) throw false
    let json = conn.tebakanime[id][1]
    let ans = json.jawaban
    let clue = ans.replace(/[AIUEOaiueo]/g, '_')
    m.reply('```' + clue + '```')
}
handler.customPrefix = /^(wa)$/i
handler.command = new RegExp
handler.group = true
module.exports = handler
