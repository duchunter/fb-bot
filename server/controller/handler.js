'use strict'

import request from 'request';
let apiai = require('./apiai');

// Handles messages events
export function handleMessage(sender_psid, received_message) {
  let response;
  console.log(received_message.nlp);

  // Check if the message contains text
  if (received_message.text) {
    // Send msg
    apiai(received_message.text).then(text => {
      callSendAPI(sender_psid, { text });
    });

  } else if (received_message.attachments) {
    // Gets the URL of the message attachment
    console.log(received_message.attachments[0]);
    if (received_message.attachments[0].payload) {
      let attachment_url = received_message.attachments[0].payload.url;
      response = {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [{
              title: "Is this the right picture?",
              subtitle: "Tap a button to answer.",
              image_url: attachment_url,
              buttons: [
                {
                  type: "postback",
                  title: "Yes!",
                  payload: "yes",
                },

                {
                  type: "postback",
                  title: "No!",
                  payload: "no",
                },
              ],
            }],
          },
        }
      }
    }

    // Sends the response message
    callSendAPI(sender_psid, response);
  }
}

// Handles messaging_postbacks events
export function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "Thanks!" }
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." }
  }

  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
export function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid
    },

    message: response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    uri: "https://graph.facebook.com/v2.6/me/messages",
    qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
    method: "POST",
    json: request_body
  }, (err, res, body) => {
    if (err) {
      console.log(err);
    }
  });
}
