import nock from 'nock';
import Core from '../src/core/core';
import Tumblr from '../src/tumblr';

describe('Tumblr', () => {
  const auth = {
    consumerKey: 'consumerKey',
  };

  it('should be a class', () => {
    const tumblr = new Tumblr(auth);
    expect(tumblr instanceof Tumblr).toBeTruthy();
  });

  it('should be a class extending Core', () => {
    const tumblr = new Tumblr(auth);
    expect(tumblr instanceof Core).toBeTruthy();
  });

  describe('#constructor', () => {
    it('should throw if no consumerKey provided', () => {
      try {
        new Tumblr(); // eslint-disable-line no-new
      } catch (e) {
        expect(e.message).toMatch(/consumerKey/);
      }
    });

    it('should set this.options', () => {
      const tumblr = new Tumblr(auth);
      expect(tumblr.options.api_key).toEqual(auth.consumerKey);
    });

    it('should be api version v2 by default', () => {
      const tumblr = new Tumblr(auth);
      expect(tumblr.version).toEqual('v2');
    });

    it('should overwrite api version', () => {
      const tumblr = new Tumblr(auth, {
        version: 'v3',
      });
      expect(tumblr.version).toEqual('v3');
    });

    it('should create baseApiUrl', () => {
      const tumblr = new Tumblr(auth);
      expect(tumblr.baseApiUrl).toEqual(`${tumblr.url}/${tumblr.version}`);
    });
  });

  describe('#get', () => {
    const tumblr = new Tumblr(auth);

    it('should be a function', () => {
      expect(typeof tumblr.get).toBe('function');
    });

    it('should return a promise', () => {
      const endpoint = 'tag/sunset';
      nock('https://api.tumblr.com')
        .get(`/v2/${endpoint}`)
        .query({ api_key: auth.consumerKey })
        .reply(200, 'success');
      const promise = tumblr.get(endpoint);
      expect(promise instanceof Promise).toBeTruthy();
    });

    it('sould have callback', (done) => {
      const endpoint = 'tag/sunset';
      nock('https://api.tumblr.com')
        .get(`/v2/${endpoint}`)
        .query({ api_key: auth.consumerKey })
        .reply(200, 'success');
      tumblr.get(endpoint, (err, result) => {
        expect(err).toBe(null);
        expect(result).toBe('success');
        done();
      });
    });

    it('sould make get request', (async) () => {
      const endpoint = 'tag/sunset';
      nock('https://api.tumblr.com')
        .get(`/v2/${endpoint}`)
        .query({ api_key: auth.consumerKey })
        .reply(200, 'success');
      const result = await tumblr.get(endpoint);
      expect(result).toBe('success');
    });

    it('sould pass parameters', (async) () => {
      const endpoint = 'tag/sunset';
      nock('https://api.tumblr.com')
        .get(`/v2/${endpoint}`)
        .query({ api_key: auth.consumerKey, q: 'sunset' })
        .reply(200, 'success');
      const result = await tumblr.get(endpoint, { q: 'sunset' });
      expect(result).toBe('success');
    });
  });

  describe('#post', () => {
    const tumblr = new Tumblr(auth);

    it('should be a function', () => {
      expect(typeof tumblr.post).toBe('function');
    });

    it('should return a promise', () => {
      const endpoint = 'tag/sunset';
      nock('https://api.tumblr.com')
        .post(`/v2/${endpoint}`, {
          api_key: auth.consumerKey,
        })
        .reply(200, 'success');
      const promise = tumblr.post(endpoint);
      expect(promise instanceof Promise).toBeTruthy();
    });

    it('sould have callback', (done) => {
      const endpoint = 'tag/sunset';
      nock('https://api.tumblr.com')
        .post(`/v2/${endpoint}`, {
          api_key: auth.consumerKey,
        })
        .query({ api_key: auth.consumerKey })
        .reply(200, 'success');
      tumblr.post(endpoint, (err, result) => {
        expect(err).toBe(null);
        expect(result).toBe('success');
        done();
      });
    });

    it('sould make post request', (async) () => {
      const endpoint = 'tag/sunset';
      nock('https://api.tumblr.com')
        .post(`/v2/${endpoint}`, {
          api_key: auth.consumerKey,
        })
        .reply(200, 'success');
      const result = await tumblr.post(endpoint);
      expect(result).toBe('success');
    });

    it('sould pass parameters', (async) () => {
      const endpoint = 'tag/sunset';
      nock('https://api.tumblr.com')
        .post(`/v2/${endpoint}`, {
          api_key: auth.consumerKey, q: 'sunset',
        })
        .reply(200, 'success');
      const result = await tumblr.post(endpoint, { q: 'sunset' });
      expect(result).toBe('success');
    });
  });
});
