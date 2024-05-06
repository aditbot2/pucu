const cheerio = require("cheerio");
const axios = require("axios");

async function Anime(anime){ 
   return new Promise(async(resolve, reject) => { 
     try { 
       const { data } = await axios.get('https://myanimelist.net/anime.php?q=' + anime + '&catanime'); 
       let results = [] 
       var $ = cheerio.load(data); 
       $('div.js-categories-seasonal > table').each((u, l) => { 
         for (let i = 1; i < 10; i++) { 
           let b = $(l).find('td.borderClass > div.title')[i] 
           let c = $(l).find('td.borderClass > div.picSurround > a.hoverinfo_trigger')[i] 
           let d = $(l).find('td.ac:nth-child(3)')[i] 
           let e = $(l).find('td.ac:nth-child(4)')[i] 
           let f = $(l).find('td.ac:nth-child(5)')[i] 
           let url = $(b).find('a.hoverinfo_trigger').attr('href') 
           if (typeof url === 'undefined') return 
           results.push({ 
             title: $(b).find('a.hoverinfo_trigger').text(), 
             thumbnail: $(c).find('img').attr('data-src'), 
             url: url, 
             type: $(d).text().trim().replace('\n'), 
             episode: $(e).text().trim().replace('\n'), 
             score: $(f).text().trim().replace('\n'), 
           }) 
         } 
       }) 
       if (results.every(x => x === undefined)) return { mess: 'No result found' }; 
       resolve(results); 
     } catch (error) { 
       console.error(error.toString()); 
     } 
  
   }) 
 }
 
module.exports = { Anime };