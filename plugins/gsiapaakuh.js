let handler = async (m, { conn }) => {
    conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {}
    let id = m.chat
    if (!(id in conn.siapakahaku)) throw false
    let json = conn.siapakahaku[id][1]
    let ans = json.jawaban
    let clue = ans.replace(/[bcdfghjklmnpqrstvwxyz]/ig, '_')
    m.reply('```' + clue + '```')
}
handler.customPrefix = /^(wholi)$/i
handler.command = new RegExp
module.exports = handler
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)