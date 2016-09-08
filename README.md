[![npm version](https://badge.fury.io/js/node-social-api.svg)](https://badge.fury.io/js/node-social-api)
[![Build Status](https://travis-ci.org/pradel/node-social-api.svg?branch=master)](https://travis-ci.org/pradel/node-social-api)
[![Coverage Status](https://coveralls.io/repos/github/pradel/node-social-api/badge.svg?branch=master)](https://coveralls.io/github/pradel/node-social-api?branch=master)
[![Dependency Status](https://david-dm.org/pradel/node-social-api.svg)](https://david-dm.org/pradel/node-social-api)
[![devDependency Status](https://david-dm.org/pradel/node-social-api/dev-status.svg)](https://david-dm.org/pradel/node-social-api#info=devDependencies)

# node-social-api

[Documentation](https://pradel.github.io/node-social-api)

[Examples](https://github.com/pradel/node-social-api/tree/master/examples)

Social api client for node that support promises and callback.
Include:
* [Twitter](https://pradel.github.io/node-social-api/#twitter)
* [Instagram](https://pradel.github.io/node-social-api/#instagram)
* [Facebook](https://pradel.github.io/node-social-api/#facebook)
* [Tumblr](https://pradel.github.io/node-social-api/#tumblr)

## Install

`npm install --save node-social-api`

## Usage

```javascript
import { Instagram, Twitter, Facebook, Tumblr } from 'node-social-api';

// Instagram
const instagram = new Instagram({
  clientId: 'your-client-id',
  accessToken: 'user-access-token',
});

// Some get query with promise
instagram.get('users/self').then((data) => {
  console.log(data);
});

// Some get query with callback
instagram.get('users/self', (err, data) => {
  console.log(data);
});

// Create a new stream and only receive new messages
const stream = instagram.stream('tags/:tag-name/media/recent');

stream.on('message', (message) => {
  console.log(message);
});

// Twitter
const twitter = new Twitter({
  consumerKey: 'your-consumer-key',
  consumerSecret: 'your-consumer-secret',
  accessToken: 'your-access-token',
  accessTokenSecret: 'your-access-token-secret',
});

// Some get query
twitter.get('media/recent').then((data) => {
  console.log(data);
});

// Facebook
const facebook = new Facebook({
  appId: 'your-app-id',
  appSecret: 'your-app-secret',
});

// Some get query
facebook.get(':some-id').then((data) => {
  console.log(data);
});

// Tumblr
const tumblr = new Tumblr({
  consumerKey: 'your-consumer-key',
});

// Some get query
tumblr.get('blog/scipsy.tumblr.com/info').then((data) => {
  console.log(data);
});
```
