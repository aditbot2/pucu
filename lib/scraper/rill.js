const axios = require('axios');

async function gptLogic(q, logic, realtime) {
 try {
   const a = await axios.get(`https://itzpire.site/ai/gpt-logic?q=${q}&logic=${logic}&realtime=${realtime}`);
   return a.data.data.response;
 } catch (error) {
   console.error('Error fetching data:', error);
   return null;
 }
}

module.exports = { gptLogic };