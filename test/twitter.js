import { assert } from 'chai';
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
    assert.ok(twitter instanceof Twitter);
  });

  it('should be a class extending Core', () => {
    const twitter = new Twitter(oauth);
    assert.ok(twitter instanceof Core);
  });

  describe('#constructor', () => {
    it('should throw if no consumerKey provided', () => {
      try {
        new Twitter(); // eslint-disable-line no-new
      } catch (e) {
        assert.match(e, /consumerKey/);
      }
    });

    it('should throw if no consumerSecret provided', () => {
      try {
        new Twitter({ consumerKey: 'consumerKey' }); // eslint-disable-line no-new
      } catch (e) {
        assert.match(e, /consumerSecret/);
      }
    });

    it('should throw if no accessToken provided', () => {
      try {
        new Twitter({ // eslint-disable-line no-new
          consumerKey: 'consumerKey',
          consumerSecret: 'consumerSecret',
        });
      } catch (e) {
        assert.match(e, /accessToken/);
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
        assert.match(e, /accessTokenSecret/);
      }
    });

    it('should set this.oauth', () => {
      const twitter = new Twitter(oauth);
      assert.equal(twitter.oauth.consumer_key, oauth.consumerKey, 'should set consumerKey');
      assert.equal(twitter.oauth.consumer_secret, oauth.consumerSecret,
        'should set consumerSecret');
      assert.equal(twitter.oauth.token, oauth.accessToken,
        'should set accessToken');
      assert.equal(twitter.oauth.token_secret, oauth.accessTokenSecret,
        'should set accessTokenSecret');
    });

    it('should be api version 1.1 by default', () => {
      const twitter = new Twitter(oauth);
      assert.equal(twitter.version, '1.1');
    });

    it('should overwrite api version', () => {
      const twitter = new Twitter(oauth, {
        version: '2',
      });
      assert.equal(twitter.version, '2');
    });

    it('should create baseApiUrl', () => {
      const twitter = new Twitter(oauth);
      assert.equal(twitter.baseApiUrl, `${twitter.url}/${twitter.version}`);
    });
  });

  // TODO should pass autorization oauth headers

  describe('#get', () => {
    const twitter = new Twitter(oauth);

    it('should be a function', () => {
      assert.isFunction(twitter.get);
    });

    it('should return a promise', () => {
      const endpoint = 'media/recent';
      nock('https://api.twitter.com')
        .get(`/1.1/${endpoint}.json`)
        .reply(200, 'success');
      const promise = twitter.get(endpoint);
      assert.ok(promise instanceof Promise);
    });

    it('sould make get request', async () => {
      const endpoint = 'media/recent';
      nock('https://api.twitter.com')
        .get(`/1.1/${endpoint}.json`)
        .reply(200, 'success');
      const result = await twitter.get(endpoint);
      assert.equal(result, 'success');
    });

    it('sould pass parameters', async () => {
      const endpoint = 'search/tweets';
      nock('https://api.twitter.com')
        .get(`/1.1/${endpoint}.json`)
        .query({ q: 'sunset' })
        .reply(200, 'success');
      const result = await twitter.get(endpoint, { q: 'sunset' });
      assert.equal(result, 'success');
    });
  });

  describe('#post', () => {
    const twitter = new Twitter(oauth);

    it('should be a function', () => {
      assert.isFunction(twitter.post);
    });

    it('should return a promise', () => {
      const endpoint = 'media/recent';
      nock('https://api.twitter.com')
        .post(`/1.1/${endpoint}.json`)
        .reply(200, 'success');
      const promise = twitter.post(endpoint);
      assert.ok(promise instanceof Promise);
    });

    it('sould make post request', async () => {
      const endpoint = 'media/recent';
      nock('https://api.twitter.com')
        .post(`/1.1/${endpoint}.json`)
        .reply(200, 'success');
      const result = await twitter.post(endpoint);
      assert.equal(result, 'success');
    });

    it('sould pass parameters', async () => {
      const endpoint = 'statuses/update';
      nock('https://api.twitter.com')
        .post(`/1.1/${endpoint}.json`, {
          status: 'sunset',
        })
        .reply(200, 'success');
      const result = await twitter.post(endpoint, { status: 'sunset' });
      assert.equal(result, 'success');
    });
  });

  describe('#delete', () => {
    const twitter = new Twitter(oauth);

    it('should be a function', () => {
      assert.isFunction(twitter.delete);
    });

    it('should return a promise', () => {
      const endpoint = 'media/recent';
      nock('https://api.twitter.com')
        .delete(`/1.1/${endpoint}.json`)
        .reply(200, 'success');
      const promise = twitter.delete(endpoint);
      assert.ok(promise instanceof Promise);
    });

    it('sould make delete request', async () => {
      const endpoint = 'media/recent';
      nock('https://api.twitter.com')
        .delete(`/1.1/${endpoint}.json`)
        .reply(200, 'success');
      const result = await twitter.delete(endpoint);
      assert.equal(result, 'success');
    });

    it('sould pass parameters', async () => {
      const endpoint = 'search/tweets';
      nock('https://api.twitter.com')
        .delete(`/1.1/${endpoint}.json`)
        .query({ q: 'sunset' })
        .reply(200, 'success');
      const result = await twitter.delete(endpoint, { q: 'sunset' });
      assert.equal(result, 'success');
    });
  });
});
