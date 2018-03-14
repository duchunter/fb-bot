const uuidv1 = require('uuid/v1');
const bot = require('apiai-promise')('f09a2e54d38d49b4aa78b148c3a775c5');

module.exports = apiai;

async function apiai(text) {
  let res;
  try {
    res = await bot.textRequest(text, {
      sessionId: uuidv1()
    });
  } catch (e) {
    return `Err, i don't understand that`;
  }

  return res.result.fulfillment.speech;
}
