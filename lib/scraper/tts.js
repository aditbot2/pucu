const gtts = require('node-gtts')
const path = require('path')
const fetch = require("node-fetch")
const fs = require("fs")
const { spawn } = require('child_process')

async function tts(text, lang = 'id') {
  console.log(lang, text)
  return new Promise((resolve, reject) => {
    try {
      let tts = gtts(lang)
      let filePath = path.join(__dirname, '../tmp', (1 * new Date) + '.wav')
      tts.save(filePath, text, () => {
        resolve(fs.readFileSync(filePath))
        fs.unlinkSync(filePath)
      })
    } catch (e) { reject(e) }
  })
}

module.exports = { tts };