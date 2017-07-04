import * as nock from 'nock';
import { Tumblr } from '../../src';

describe('Tumblr', () => {
  const auth = {
    consumerKey: 'consumerKey',
  };

  it('should be a class', () => {
    const tumblr = new Tumblr(auth);
    expect(tumblr instanceof Tumblr).toBeTruthy();
  });

  describe('#constructor', () => {
    it('should throw if no consumerKey provided', () => {
      try {
        new Tumblr(); // tslint:disable-line
      } catch (e) {
        expect(e.message).toMatch(/consumerKey/);
      }
    });

    it('should set this.config', () => {
      const tumblr = new Tumblr(auth);
      expect(tumblr.config.api_key).toEqual(auth.consumerKey);
    });

    it('should overwrite api version', () => {
      const tumblr = new Tumblr({ ...auth, apiVersion: 'v3' });
      expect(tumblr.apiUrl).toEqual('https://api.tumblr.com/v3');
    });
  });

  describe('#get', () => {
    const tumblr = new Tumblr(auth);

    it('sould make get request', async () => {
      const endpoint = 'tag/sunset';
      nock('https://api.tumblr.com')
        .get(`/v2/${endpoint}`)
        .query({ api_key: auth.consumerKey })
        .reply(200, 'success');
      const result = await tumblr.get(endpoint);
      expect(result).toBe('success');
    });

    it('sould pass parameters', async () => {
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

    it('sould make post request', async () => {
      const endpoint = 'tag/sunset';
      nock('https://api.tumblr.com')
        .post(`/v2/${endpoint}`, {
          api_key: auth.consumerKey,
        })
        .reply(200, 'success');
      const result = await tumblr.post(endpoint);
      expect(result).toBe('success');
    });

    it('sould pass parameters', async () => {
      const endpoint = 'tag/sunset';
      nock('https://api.tumblr.com')
        .post(`/v2/${endpoint}`, {
          api_key: auth.consumerKey,
          q: 'sunset',
        })
        .reply(200, 'success');
      const result = await tumblr.post(endpoint, { q: 'sunset' });
      expect(result).toBe('success');
    });
  });
});
