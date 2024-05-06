let fs = require('fs')

function runtime(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " Hari, " : " Hari, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " Jam, " : " Jam, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " Menit, " : " Menit ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " Detik " : " Detik ") : "";
	return dDisplay + hDisplay + mDisplay 
}

let handler = async (m, { conn, command, usedPrefix }) => {
let muptime = runtime(process.uptime()).trim()
let logo = ` 
╔┓┏╦━━╦┓╔┓╔━━╗╔╗
║┗┛║┗━╣┃║┃║╯╰║║║
║┏┓║┏━╣┗╣┗╣╰╯║╠╣
╚┛┗╩━━╩━╩━╩━━╝╚╝`
let text = `
*FAMILY 100 GAMES*
• mulai
• peringkat

*GAME LAINNYA*
• tebakgambar
• siapaaku
• lengkapikalimat
• tebaklogo
• asahotak
• susunkata
• tebakanime
• tebakbendera
• tebakgame
• tebakhewan
• tebakkata
• tebaklagu
• tebaklirik
• tebakpemain
• tekateki

*LAINNYA*
• owner
• grup
• me
• .ai



*KETERANGAN*
🟢 = Benar
🔴 = Salah
⚪ = Mendekati

Bot Aktif selama ${muptime}` 
conn.sendFooter(m.chat, logo, text, m)
}
handler.customPrefix = /^(menu)$/i
handler.command = new RegExp
module.exports = handler

