const axios = require("axios")
const cheerio = require("cheerio")

async function MediaFireDl(url) {
   return new Promise(async(resolve, reject) => {
     try {
       const { data, status } = await axios.get(url)
       const $ = cheerio.load(data);
       let filename = $('.dl-info > div > div.filename').text();
       let filetype = $('.dl-info > div > div.filetype').text();
       let filesize = $('a#downloadButton').text().split("(")[1].split(")")[0];
       let uploadAt = $('ul.details > li:nth-child(2)').text().split(": ")[1];
       let link = $('#downloadButton').attr('href');
       let desc = $('div.description > p.description-subheading').text();
       if (typeof link === undefined) return resolve({ status: false, msg: 'No result found' })
       let result = {
         status: true,
         filename: filename,
         filetype: filetype,
         filesize: filesize,
         uploadAt: uploadAt,
         link: link,
         desc: desc
       }
       console.log(result)
       resolve(result)
     } catch (err) {
       console.error(err)
       resolve({ status: false, msg: 'No result found' })
     }
   })
}

module.exports = { MediaFireDl };