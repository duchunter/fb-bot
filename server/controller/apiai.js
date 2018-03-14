const uuidv1 = require('uuid/v1');
const bot = require('apiai-promise')();

async function apiai(text) {
  let res;
  try {
    let res = await bot.textRequest(text, {
      sessionId: uuidv1()
    });
  } catch (e) {
    console.log(e);
    return 'Connection error';
  }

  return res;
}

apiai("Hello").then(res => console.log(res));
