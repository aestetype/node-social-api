import nock from 'nock';
import Core from '../src/core/core';
import Twitter from '../src/twitter';

describe('Twitter', () => {
  const oauth = {
    consumerKey: 'consumerKey',
    consumerSecret: 'consumerSecret',
    accessToken: 'accessToken',
    accessTokenSecret: 'accessTokenSecret',
  };

  it('should be a class', () => {
    const twitter = new Twitter(oauth);
    expect(twitter instanceof Twitter).toBeTruthy();
  });

  it('should be a class extending Core', () => {
    const twitter = new Twitter(oauth);
    expect(twitter instanceof Core).toBeTruthy();
  });

  describe('#constructor', () => {
    it('should throw if no consumerKey provided', () => {
      try {
        new Twitter(); // eslint-disable-line no-new
      } catch (e) {
        expect(e.message).toMatch(/consumerKey/);
      }
    });

    it('should throw if no consumerSecret provided', () => {
      try {
        new Twitter({ consumerKey: 'consumerKey' }); // eslint-disable-line no-new
      } catch (e) {
        expect(e.message).toMatch(/consumerSecret/);
      }
    });

    it('should throw if no accessToken provided', () => {
      try {
        new Twitter({ // eslint-disable-line no-new
          consumerKey: 'consumerKey',
          consumerSecret: 'consumerSecret',
        });
      } catch (e) {
        expect(e.message).toMatch(/accessToken/);
      }
    });

    it('should throw if no accessTokenSecret provided', () => {
      try {
        new Twitter({ // eslint-disable-line no-new
          consumerKey: 'consumerKey',
          consumerSecret: 'consumerSecret',
          accessToken: 'accessToken',
        });
      } catch (e) {
        expect(e.message).toMatch(/accessTokenSecret/);
      }
    });

    it('should set this.oauth', () => {
      const twitter = new Twitter(oauth);
      expect(twitter.oauth.consumer_key).toEqual(oauth.consumerKey);
      expect(twitter.oauth.consumer_secret).toEqual(oauth.consumerSecret);
      expect(twitter.oauth.token).toEqual(oauth.accessToken);
      expect(twitter.oauth.token_secret).toEqual(oauth.accessTokenSecret);
    });

    it('should be api version 1.1 by default', () => {
      const twitter = new Twitter(oauth);
      expect(twitter.version).toEqual('1.1');
    });

    it('should overwrite api version', () => {
      const twitter = new Twitter(oauth, {
        version: '2',
      });
      expect(twitter.version).toEqual('2');
    });

    it('should create baseApiUrl', () => {
      const twitter = new Twitter(oauth);
      expect(twitter.baseApiUrl).toEqual(`${twitter.url}/${twitter.version}`);
    });
  });

  // TODO should pass autorization oauth headers

  describe('#get', () => {
    const twitter = new Twitter(oauth);

    it('should be a function', () => {
      expect(typeof twitter.get).toBe('function');
    });

    it('should return a promise', () => {
      const endpoint = 'media/recent';
      nock('https://api.twitter.com')
        .get(`/1.1/${endpoint}.json`)
        .reply(200, 'success');
      const promise = twitter.get(endpoint);
      expect(promise instanceof Promise).toBeTruthy();
    });

    it('sould make get request', async () => {
      const endpoint = 'media/recent';
      nock('https://api.twitter.com')
        .get(`/1.1/${endpoint}.json`)
        .reply(200, 'success');
      const result = await twitter.get(endpoint);
      expect(result).toBe('success');
    });

    it('sould pass parameters', async () => {
      const endpoint = 'search/tweets';
      nock('https://api.twitter.com')
        .get(`/1.1/${endpoint}.json`)
        .query({ q: 'sunset' })
        .reply(200, 'success');
      const result = await twitter.get(endpoint, { q: 'sunset' });
      expect(result).toBe('success');
    });
  });

  describe('#post', () => {
    const twitter = new Twitter(oauth);

    it('should be a function', () => {
      expect(typeof twitter.post).toBe('function');
    });

    it('should return a promise', () => {
      const endpoint = 'media/recent';
      nock('https://api.twitter.com')
        .post(`/1.1/${endpoint}.json`)
        .reply(200, 'success');
      const promise = twitter.post(endpoint);
      expect(promise instanceof Promise).toBeTruthy();
    });

    it('sould make post request', async () => {
      const endpoint = 'media/recent';
      nock('https://api.twitter.com')
        .post(`/1.1/${endpoint}.json`)
        .reply(200, 'success');
      const result = await twitter.post(endpoint);
      expect(result).toBe('success');
    });

    it('sould pass parameters', async () => {
      const endpoint = 'statuses/update';
      nock('https://api.twitter.com')
        .post(`/1.1/${endpoint}.json`, {
          status: 'sunset',
        })
        .reply(200, 'success');
      const result = await twitter.post(endpoint, { status: 'sunset' });
      expect(result).toBe('success');
    });
  });

  describe('#delete', () => {
    const twitter = new Twitter(oauth);

    it('should be a function', () => {
      expect(typeof twitter.delete).toBe('function');
    });

    it('should return a promise', () => {
      const endpoint = 'media/recent';
      nock('https://api.twitter.com')
        .delete(`/1.1/${endpoint}.json`)
        .reply(200, 'success');
      const promise = twitter.delete(endpoint);
      expect(promise instanceof Promise).toBeTruthy();
    });

    it('sould make delete request', async () => {
      const endpoint = 'media/recent';
      nock('https://api.twitter.com')
        .delete(`/1.1/${endpoint}.json`)
        .reply(200, 'success');
      const result = await twitter.delete(endpoint);
      expect(result).toBe('success');
    });

    it('sould pass parameters', async () => {
      const endpoint = 'search/tweets';
      nock('https://api.twitter.com')
        .delete(`/1.1/${endpoint}.json`)
        .query({ q: 'sunset' })
        .reply(200, 'success');
      const result = await twitter.delete(endpoint, { q: 'sunset' });
      expect(result).toBe('success');
    });
  });
});
