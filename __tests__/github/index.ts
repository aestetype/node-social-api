import * as nock from 'nock';
import { Github } from '../../src';

describe('Github', () => {
  const auth = {
    accessToken: 'accessToken',
  };

  it('should be a class', () => {
    const github = new Github(auth);
    expect(github instanceof Github).toBeTruthy();
  });

  describe('#constructor', () => {
    it('should throw if no accessToken provided', () => {
      try {
        new Github({}); // tslint:disable-line
      } catch (e) {
        expect(e.message).toMatch(/accessToken/);
      }
    });

    it('should not throw if public provided', () => {
      const github = new Github({
        public: true,
      });
      expect(github.config).toEqual({});
    });

    it('should set this.config', () => {
      const github = new Github(auth);
      expect(github.config.access_token).toEqual(auth.accessToken);
    });

    it('should set this.headers by default', () => {
      const github = new Github(auth);
      expect(github.headers['User-Agent']).toEqual(
        '@aestetype/node-social-api'
      );
    });

    it('should overwrite this.headers', () => {
      const github = new Github({
        accessToken: auth.accessToken,
        userAgent: 'toto',
      });
      expect(github.headers['User-Agent']).toEqual('toto');
    });
  });

  describe('#get', () => {
    const github = new Github(auth);

    it('sould make get request', async () => {
      const endpoint = 'tag/sunset';
      nock('https://api.github.com')
        .get(`/${endpoint}`)
        .query({ access_token: auth.accessToken })
        .reply(200, 'success');
      const result = await github.get(endpoint);
      expect(result).toBe('success');
    });

    it('sould pass parameters', async () => {
      const endpoint = 'tag/sunset';
      nock('https://api.github.com')
        .get(`/${endpoint}`)
        .query({ access_token: auth.accessToken, q: 'sunset' })
        .reply(200, 'success');
      const result = await github.get(endpoint, { q: 'sunset' });
      expect(result).toBe('success');
    });
  });

  describe('#post', () => {
    const github = new Github(auth);

    it('sould make post request', async () => {
      const endpoint = 'tag/sunset';
      nock('https://api.github.com')
        .post(`/${endpoint}`, {
          access_token: auth.accessToken,
        })
        .reply(200, 'success');
      const result = await github.post(endpoint);
      expect(result).toBe('success');
    });

    it('sould pass parameters', async () => {
      const endpoint = 'tag/sunset';
      nock('https://api.github.com')
        .post(`/${endpoint}`, {
          access_token: auth.accessToken,
          q: 'sunset',
        })
        .reply(200, 'success');
      const result = await github.post(endpoint, { q: 'sunset' });
      expect(result).toBe('success');
    });
  });

  describe('#delete', () => {
    const github = new Github(auth);

    it('sould make delete request', async () => {
      const endpoint = 'tag/sunset';
      nock('https://api.github.com')
        .delete(`/${endpoint}`)
        .query({ access_token: auth.accessToken })
        .reply(200, 'success');
      const result = await github.delete(endpoint);
      expect(result).toBe('success');
    });

    it('sould pass parameters', async () => {
      const endpoint = 'tag/sunset';
      nock('https://api.github.com')
        .delete(`/${endpoint}`)
        .query({ access_token: auth.accessToken, q: 'sunset' })
        .reply(200, 'success');
      const result = await github.delete(endpoint, { q: 'sunset' });
      expect(result).toBe('success');
    });
  });
});
