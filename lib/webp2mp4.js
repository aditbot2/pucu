/* const fetch = require('node-fetch')
const FormData = require('form-data')
const { JSDOM } = require('jsdom')

async function webp2mp4(source) {
  let form = new FormData
  let isUrl = typeof source === 'string' && /https?:\/\//.test(source)
  form.append('new-image-url', isUrl ? source : '')
  form.append('new-image', isUrl ? '' : source, 'image.webp')
  let res = await fetch('https://s6.ezgif.com/webp-to-mp4', {
    method: 'POST',
    body: form
  })
  let html = await res.text()
  let { document } = new JSDOM(html).window
  let form2 = new FormData
  let obj = {}
  for (let input of document.querySelectorAll('form input[name]')) {
    obj[input.name] = input.value
    form2.append(input.name, input.value)
  }
  let res2 = await fetch('https://ezgif.com/webp-to-mp4/' + obj.file, {
    method: 'POST',
    body: form2
  })
  let html2 = await res2.text()
  let { document: document2 } = new JSDOM(html2).window
  return new URL(document2.querySelector('div#output > p.outfile > video > source').src, res2.url).toString()
}

async function webp2png(source) {
  let form = new FormData
  let isUrl = typeof source === 'string' && /https?:\/\//.test(source)
  form.append('new-image-url', isUrl ? source : '')
  form.append('new-image', isUrl ? '' : source, 'image.webp')
  let res = await fetch('https://s6.ezgif.com/webp-to-png', {
    method: 'POST',
    body: form
  })
  let html = await res.text()
  let { document } = new JSDOM(html).window
  let form2 = new FormData
  let obj = {}
  for (let input of document.querySelectorAll('form input[name]')) {
    obj[input.name] = input.value
    form2.append(input.name, input.value)
  }
  let res2 = await fetch('https://ezgif.com/webp-to-png/' + obj.file, {
    method: 'POST',
    body: form2
  })
  let html2 = await res2.text()
  let { document: document2 } = new JSDOM(html2).window
  return new URL(document2.querySelector('div#output > p.outfile > img').src, res2.url).toString()
}

if (require.main === module) {
  // TODO: Test
  webp2mp4('https://mathiasbynens.be/demo/animated-webp-supported.webp').then(console.error)
  webp2png('https://mathiasbynens.be/demo/animated-webp-supported.webp').then(console.error)
} else {
  module.exports = { webp2mp4, webp2png }
} */

/*"* This code was corrected by dims */
const crypto = require("crypto");
const { fromBuffer } = require("file-type");
const { FormData, Blob } = require('formdata-node');
const { convert } = require("../lib/lowdb/ezgif-convert.js");

const randomBytes = crypto.randomBytes(5).toString("hex");
const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

async function webp2mp4(source) {
    const isUrl = typeof source === 'string' && urlRegex.test(source);
    
    try {
        return await convert({
            type: 'webp-mp4',
            ...(isUrl ? { url: source } : { file: new Blob([source]), filename: randomBytes + "." + (await fromBuffer(source)).ext })
        });
    } catch (error) {
        console.error("Error converting to webp-mp4. Trying fallback types.");
        
        try {
            return await convert({
                type: 'webp-avif',
                ...(isUrl ? { url: source } : { file: new Blob([source]), filename: randomBytes + "." + (await fromBuffer(source)).ext })
            });
        } catch (avifError) {
            console.error("Error converting to webp-avif. Trying webp-gif.");

            try {
                return await convert({
                    type: 'webp-gif',
                    ...(isUrl ? { url: source } : { file: new Blob([source]), filename: randomBytes + "." + (await fromBuffer(source)).ext })
                });
            } catch (gifError) {
                console.error("Error converting to webp-gif. All fallback types failed.");
                throw gifError;
            }
        }
    }
}

async function webp2png(source) {
    const isUrl = typeof source === 'string' && urlRegex.test(source);

    try {
        return await convert({
            type: 'webp-png',
            ...(isUrl ? { url: source } : { file: new Blob([source]), filename: randomBytes + "." + (await fromBuffer(source)).ext })
        });
    } catch (pngError) {
        console.error("Error converting to webp-png. Trying webp-jpg.");

        try {
            return await convert({
                type: 'webp-jpg',
                ...(isUrl ? { url: source } : { file: new Blob([source]), filename: randomBytes + "." + (await fromBuffer(source)).ext })
            });
        } catch (jpgError) {
            console.error("Error converting to webp-jpg. All fallback types failed.");
            throw jpgError;
        }
    }
}

module.exports = { 
webp2mp4, 
webp2png 
};