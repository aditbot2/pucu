let moment = require('moment-timezone');
let handler = m => m;

handler.before = async function(m) {
    if (m.chat.endsWith('broadcast')) return;
    if (m.fromMe) return;
    if (m.isGroup) return;

    let user = global.db.data.users[m.sender];
    let { banned } = db.data.users[m.chat];
    let username = conn.getName(m.sender);
    if (new Date - user.pc < 86400000) return; // setiap 24 jam sekali
    conn.sendMessageModify(m.chat, `Hai @${m.sender.replace(/@.+/g, '')} sensei ${ucapan()}\n\n${banned ? `Anda telah dibanned, hubungi: https://wa.me/${global.owner[0]}` : 'Ketik "Menu" untuk menggunakan bot, (tanpa titik) hanya *menu"*}`, m, { largeThumb: true, url: db.data.settings[conn.user.jid].link });
    user.pc = new Date() * 1;
};

module.exports = handler;

function ucapan() {
    let time = moment.tz('Asia/Jakarta').format('HH');
    let res = "Selamat dinihari";
    if (time >= 4) res = "Selamat pagi";
    if (time > 10) res = "Selamat siang";
    if (time >= 15) res = "Selamat sore";
    if (time >= 18) res = "Selamat malam";
    return res;
}