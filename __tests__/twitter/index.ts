import * as nock from 'nock';
import { Twitter } from '../../src';

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

  describe('#constructor', () => {
    it('should throw if no consumerKey provided', () => {
      try {
        new Twitter();
      } catch (e) {
        expect(e.message).toMatch(/consumerKey/);
      }
    });

    it('should throw if no consumerSecret provided', () => {
      try {
        new Twitter({ consumerKey: 'consumerKey' });
      } catch (e) {
        expect(e.message).toMatch(/consumerSecret/);
      }
    });

    it('should throw if no accessToken provided', () => {
      try {
        new Twitter({
          consumerKey: 'consumerKey',
          consumerSecret: 'consumerSecret',
        });
      } catch (e) {
        expect(e.message).toMatch(/accessToken/);
      }
    });

    it('should throw if no accessTokenSecret provided', () => {
      try {
        new Twitter({
          consumerKey: 'consumerKey',
          consumerSecret: 'consumerSecret',
          accessToken: 'accessToken',
        });
      } catch (e) {
        expect(e.message).toMatch(/accessTokenSecret/);
      }
    });

    it('should set this.config', () => {
      const twitter = new Twitter(oauth);
      expect(twitter.config.consumer_key).toEqual(oauth.consumerKey);
      expect(twitter.config.consumer_secret).toEqual(oauth.consumerSecret);
      expect(twitter.config.token).toEqual(oauth.accessToken);
      expect(twitter.config.token_secret).toEqual(oauth.accessTokenSecret);
    });

    it('should overwrite api version', () => {
      const twitter = new Twitter({ ...oauth, apiVersion: '2' });
      expect(twitter.apiUrl).toEqual('https://api.twitter.com/2');
    });
  });

  describe('#get', () => {
    const twitter = new Twitter(oauth);

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
