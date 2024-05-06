let levelling = require('../lib/levelling')

let handler = async (m, { usedPrefix, command, text, args }) => {
  try {
    var pp = await conn.profilePictureUrl(m.sender, 'image')
  } catch (e) {
    var pp = './src/pp.png'
  } finally {
    let setting = db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(setting.level, global.multiplier)
    let pme =  `_saldo anda : *Rp ${Func.formatNumber(setting.exp)} 💵*_`
 m.reply(pme)
  }
}
handler.customPrefix = /^(me|profil|profile)$/i
handler.command = new RegExp
module.exports = handler