import { Twitter } from '../src';

// Twitter
const twitter = new Twitter({
  consumerKey: 'your-consumer-key',
  consumerSecret: 'your-consumer-secret',
  accessToken: 'your-access-token',
  accessTokenSecret: 'your-access-token-secret',
});

// Get some #sunset posts
twitter.get('search/tweets', { q: '#sunset' }).then((data) => {
  console.log(data);
}).catch((err) => {
  console.error(err);
});
