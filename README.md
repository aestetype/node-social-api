# @aestetype/node-social-api

[![CircleCI](https://circleci.com/gh/aestetype/node-social-api.svg?style=svg)](https://circleci.com/gh/aestetype/node-social-api)
[![codecov](https://codecov.io/gh/aestetype/node-social-api/branch/master/graph/badge.svg)](https://codecov.io/gh/aestetype/node-social-api)

Social api client for node with typescript definitions that support promises.
Include:
* Twitter
* Instagram
* Facebook
* Tumblr
* Github

## Install

`yarn add @aestetype/node-social-api`

## Usage

```javascript
import { Instagram, Twitter, Facebook, Tumblr, Github } from '@aestetype/node-social-api';

// Instagram
const instagram = new Instagram({
  clientId: 'your-client-id',
  accessToken: 'user-access-token',
});

// Some get query with promise
instagram.get('users/self').then((data) => {
  console.log(data);
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

// Github
const github = new Github({
  accessToken: 'your-access-token',
});

// Some get query
github.get(':some-github-route').then((data) => {
  console.log(data);
});
```
