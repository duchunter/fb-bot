# fb-bot

A test project (actually, this is a webhook) using:
* Facebook [messenger chatbot tutorial](https://developers.facebook.com/docs/messenger-platform/getting-started) with nlp enabled
* Dialogflow SmallTalk feature

### Before you build
- Create ```.env``` with following content:
```
PAGE_ACCESS_TOKEN='PAGE_ACCESS_TOKEN'
VERIFY_TOKEN='VERIFY_TOKEN'
```

- Create ```controller/config.js``` with following content:

```javascript
module.exports = 'APIAI_TOKEN';
```

> I don't know why but include this token in ```.env``` doesn't work


### Build Setup

``` bash
# install dependencies
npm install

# build for production with minification
npm run build

# push /build, package.json, package-lock.json to Heroku or any cloud platform
```
