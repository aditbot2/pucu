const fs = require('fs')
const chalk = require('chalk')
const moment = require('moment-timezone')
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

/** Function Timeh **/
let wibh = moment.tz('Asia/Jakarta').format('HH')
let wibm = moment.tz('Asia/Jakarta').format('mm')
let wibs = moment.tz('Asia/Jakarta').format('ss')
let wktuwib = `${wibh} H ${wibm} M ${wibs} S`

    
let d = new Date(new Date + 3600000)
let locale = 'id'
// d.getTimeZoneOffset()
// Offset -420 is 18.00
// Offset    0 is  0.00 
// Offset  420 is  7.00
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })

/** Enter owner number **/
global.owner = ['6283133162295']

/** Apikey **/
global.alya = 'Your_Key'
global.key = 'Your_Key'
global.rose = 'Your_Key'
global.arif = 'Your_Key'

global.APIs = {
  alya: 'https://api.alyachan.pro',
  arif: 'https://api.arifzyn.tech'
}

global.APIKeys = {
  'https://api.alyachan.pro': global.alya,
  'https://api.arifzyn.tech': global.arif
}

/** Option setting **/  
global.set = {
  namebot: 'Ucup network',
  wm: `Ucup Network v${require('./package.json').version}`,
  wm2: 'Ucup Network',
  wm3: 'Ucup Network',
  footer: 'Simple whatsapp bot using library whiskey sockets baileys',
  packname: 'Ucup Network',
  author: 'Ucup Network',
  nameown: 'Adit'
}

/** Settings your thumbnail is here **/
global.thumb = 'https://telegra.ph/file/e374ec1a391d445aa61e7.jpg'

/** Other **/
global.multiplier = 1000 // The bigger it gets the harder it is to level up
global.max_upload = 70 // Maximum limit to send files
global.intervalmsg = 1800 // To avoid spam on first login
global.ram_usage = 2100000000 // Maximum 2GB ram, do the math yourself

/** Function, scraper, and tools to make it more practical **/
global.Func = new (require('./lib/functions'))
global.scrap = new (require('./lib/scrape'))
global.readMore = readMore

/** Timeh **/
global.week = `${week} ${date}`
global.wibb = `${wktuwib}`
global.botdate = `⫹⫺ DATE: ${week} ${date}\n⫹⫺ TIME: ${wktuwib}`
global.bottime = `T I M E : ${wktuwib}`

/** Status message **/
global.status = {
  wait: 'Mohon tunggu sebentar sensei. . .',
  invalid: 'Invalid url!',
  wrong: 'Wrong format!',
  error: 'Error occurred!',
  salah: 'BAKA!! This is unlisted command, read the commands in *.help* to avoid blocking.',
  premium: 'Hanya user premium yg dapat menggunakan ditur ini. Buy premium 5k permanen, ketik .owner',
  admin: 'Fitur ini hanya bisa digunakan oleh admin grup',
  botAdmin: 'Jadikan bot sebagai admin untuk menggunakan fitur ini',
  owner: 'Fitur ini hanya bisa digunakan oleh owner',
  mod: 'Fitur ini hanya bisa digunakan oleh moderator',
  group: 'Fitur ini hanya bisa digunakan di dalam grup',
  private: 'Fitur ini hanya bisa digunakan di private chat.',
  register: 'Hallo sensei, Silakan daftar terlebih dahulu untuk menggunakan fitur ini.',
  game: 'Mode game belum di aktifkan sama ownerku.',
  rpg: 'Mode rpg belum di aktifkan sama ownerku.',
  restrict: 'This feature is disabled'
}

/** Level up **/
global.multiplier = 69 // The higher, The harder levelup

/** Doc **/
global.dpptx = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
global.ddocx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
global.dxlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
global.dpdf = 'application/pdf'
global.drtf = 'text/rtf'

global.fsizedoc = '99999999999999'
global.fpagedoc = '999'
global.thumbdoc = 'https://telegra.ph/file/cd1c919db836c75b947c1.jpg'

/** Reload file **/
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})