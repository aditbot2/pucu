const fetch = require('node-fetch');
const cheerio = require('cheerio');
const bingUrl = 'https://www.bing.com';

class BingApi {
  constructor(cookie) {
    this.cookie = cookie;
    this.headers = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Alt-Used': 'www.bing.com',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-User': '?1',
      Cookie: `_U=${cookie};`,
      'X-Forwarded-For': `20.${this.getRandomNum()}.${this.getRandomNum()}.${this.getRandomNum()}`,
    };
  }

  async createImages(prompt, isSlowMode) {
    try {
      const payload = `q=${encodeURIComponent(prompt)}`;
      let credits = await this.getCredits();
      if (!credits) {
        credits = 0;
      }
      let response = await this.sendRequest(credits > 0 ? isSlowMode : true, payload);

      if (response.status === 200) {
        const responseHtml = await response.text();
        const $ = cheerio.load(responseHtml);
        const errorAmount = $('.gil_err_img.rms_img').length;
        if (!isSlowMode && credits > 0 && $('#gilen_son').hasClass('show_n')) {
          throw 'Dalle-3 is currently unavailable due to high demand';
        } else if (
          $('#gilen_son').hasClass('show_n') ||
          (errorAmount === 2 && credits > 0 && isSlowMode)
        ) {
          throw 'Slow mode is currently unavailable due to high demand';
        } else if (errorAmount === 2) {
          throw 'Invalid cookie';
        } else if (errorAmount === 4) {
          throw 'Prompt has been blocked';
        } else {
          throw 'Unknown error';
        }
      }

      const eventId = response.headers.get('x-eventid');
      return await this.retrieveImages(eventId);
    } catch (error) {
      console.log(`error is ${error}`);
    }
  }

  async getCredits() {
    const response = await fetch(`${bingUrl}/create`, {
      headers: this.headers,
      method: 'GET',
      mode: 'cors',
    });
    const html = await response.text();
    const $ = cheerio.load(html);
    return $('#token_bal').text();
  }

  getRandomNum() {
    return Math.floor(Math.random() * 254) + 1;
  }

  async sendRequest(isSlowMode, payload) {
    try {
      const response = await fetch(
        `${bingUrl}/images/create?${payload}&rt=${isSlowMode ? '3' : '4'}`,
        {
          headers: this.headers,
          method: 'POST',
          mode: 'cors',
          redirect: 'manual',
        }
      );

      return response;
    } catch (error) {
      console.log('Error in sendRequest:', error);
    }
  }

  async retrieveImages(eventId) {
    try {
      while (true) {
        const images = await fetch(`${bingUrl}/images/create/async/results/1-${eventId}`, {
          headers: this.headers,
          method: 'GET',
          mode: 'cors',
        });

        const html = await images.text();

        if (html.includes(`"errorMessage":"Pending"`)) {
          throw 'Error occurred';
        }

        let results = [];

        if (html === '') {
          await new Promise((resolve) => setTimeout(resolve, 5000));
          continue;
        }

        const $ = cheerio.load(html);
        for (let i = 0; i < $('.mimg').length; i++) {
          const badLink = $('.mimg')[i].attribs.src;
          const goodLink = badLink.slice(0, badLink.indexOf('?')); // Delete the parameters

          results.push(goodLink);
        }

        return results;
      }
    } catch (error) {
      console.log(`Error in retrieveImages: ${error}`);
    }
  }
}

const apikyst = ['1jADPnw7546DVwQSfgU2SEiawrcMvrj5r46Z0lp9MJpb0Uv-MGCTk6c-6wumYT9yp1EqIm7Eiub7hNOX2aAdAk7encEfIN54dLn243hJw5G_QlBrQ4WGmDnGnKbDKWL0W2B0bQjS5lmS6VuJwVZQCStr4bTnmDo_Dn_e378FS71xf3CJfuWBGG61O7hIKwfGEKNdSTK3d9NcVjyF0rPimRw', '1ttZrlV0EfkbC3IXLYJrSExXotu4nothyxA6tFzP_N4Opx-bkeE3HckcDhJaN-Yl7hdAEm5hnvf9X52aT30ymsgefhXcEFCQCR15GZwumOZy3YXBTrjPwx0dqP8OC1hkU8PwVHFi3hNJfWy6KZ5fhQiTgs3wPL_1nIWRwEpFLJ1BFyOkLVC5SelRk4Msq0R5t1DP3HSAPLz7Pwc9o_iwmow'];
const apikeybing = apikyst[Math.floor(apikyst.length * Math.random())];

module.exports = {
BingApi, 
apikeybing
};