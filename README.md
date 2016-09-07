[![npm version](https://badge.fury.io/js/node-social-api.svg)](https://badge.fury.io/js/node-social-api)
[![Build Status](https://travis-ci.org/pradel/node-social-api.svg?branch=master)](https://travis-ci.org/pradel/node-social-api)
[![Coverage Status](https://coveralls.io/repos/github/pradel/node-social-api/badge.svg?branch=master)](https://coveralls.io/github/pradel/node-social-api?branch=master)
[![Dependency Status](https://david-dm.org/pradel/node-social-api.svg)](https://david-dm.org/pradel/node-social-api)
[![devDependency Status](https://david-dm.org/pradel/node-social-api/dev-status.svg)](https://david-dm.org/pradel/node-social-api#info=devDependencies)

# node-social-api

Social api client for node that support promises.
Include:
* Twitter
* Instagram
* Facebook
* Tumblr

## Install

`npm install --save node-social-api`

## Usage

```javascript
import { Instagram, Twitter, Facebook } from 'node-social-api';

// Create a new Instagram instance.
const instagram = new Instagram({
  clientId: 'your-client-id',
  accessToken: 'user-access-token',
});

// Some get query
instagram.get('users/self').then((data) => {
  console.log(data);
});

// Create a new Twitter instance.
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

// Create a new Facebook instance.
const facebook = new Facebook({
  appId: 'your-app-id',
  appSecret: 'your-app-secret',
});

// Some get query
facebook.get(':some-id').then((data) => {
  console.log(data);
});

// Create a new Facebook instance.
const tumblr = new Tumblr({
  consumerKey: 'your-consumer-key',
});

// Some get query
tumblr.get('blog/scipsy.tumblr.com/info').then((data) => {
  console.log(data);
});
```
