import { Facebook } from '../src';

// Create new facebook instance
const facebook = new Facebook({
  appId: 'your-app-id',
  appSecret: 'your-app-secret',
});

// Get info about a facebook page
facebook.get(':some-id').then((data) => {
  console.log(data);
}).catch((err) => {
  console.error(err);
});
