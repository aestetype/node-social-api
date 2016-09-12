import nock from 'nock';
import Core from '../src/core/core';
import Github from '../src/github';

describe('Github', () => {
  const auth = {
    accessToken: 'accessToken',
  };

  it('should be a class', () => {
    const github = new Github(auth);
    expect(github instanceof Github).toBeTruthy();
  });

  it('should be a class extending Core', () => {
    const github = new Github(auth);
    expect(github instanceof Core).toBeTruthy();
  });

  describe('#constructor', () => {
    it('should throw if no accessToken provided', () => {
      try {
        new Github(); // eslint-disable-line no-new
      } catch (e) {
        expect(e.message).toMatch(/accessToken/);
      }
    });

    it('should set this.options', () => {
      const github = new Github(auth);
      expect(github.options.access_token).toEqual(auth.accessToken);
    });

    it('should create baseApiUrl', () => {
      const github = new Github(auth);
      expect(github.baseApiUrl).toEqual(github.url);
    });
  });

  describe('#get', () => {
    const github = new Github(auth);

    it('should be a function', () => {
      expect(typeof github.get).toBe('function');
    });

    it('should return a promise', () => {
      const endpoint = 'tag/sunset';
      nock('https://api.github.com')
        .get(`/${endpoint}`)
        .query({ access_token: auth.accessToken })
        .reply(200, 'success');
      const promise = github.get(endpoint);
      expect(promise instanceof Promise).toBeTruthy();
    });

    it('sould have callback', (done) => {
      const endpoint = 'tag/sunset';
      nock('https://api.github.com')
        .get(`/${endpoint}`)
        .query({ access_token: auth.accessToken })
        .reply(200, 'success');
      github.get(endpoint, (err, result) => {
        expect(err).toBe(null);
        expect(result).toBe('success');
        done();
      });
    });

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

    it('should be a function', () => {
      expect(typeof github.post).toBe('function');
    });

    it('should return a promise', () => {
      const endpoint = 'tag/sunset';
      nock('https://api.github.com')
        .post(`/${endpoint}`, {
          access_token: auth.accessToken,
        })
        .reply(200, 'success');
      const promise = github.post(endpoint);
      expect(promise instanceof Promise).toBeTruthy();
    });

    it('sould have callback', (done) => {
      const endpoint = 'tag/sunset';
      nock('https://api.github.com')
        .post(`/${endpoint}`, {
          access_token: auth.accessToken,
        })
        .reply(200, 'success');
      github.post(endpoint, (err, result) => {
        expect(err).toBe(null);
        expect(result).toBe('success');
        done();
      });
    });

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
          access_token: auth.accessToken, q: 'sunset',
        })
        .reply(200, 'success');
      const result = await github.post(endpoint, { q: 'sunset' });
      expect(result).toBe('success');
    });
  });

  describe('#delete', () => {
    const github = new Github(auth);

    it('should be a function', () => {
      expect(typeof github.delete).toBe('function');
    });

    it('should return a promise', () => {
      const endpoint = 'tag/sunset';
      nock('https://api.github.com')
        .delete(`/${endpoint}`)
        .query({ access_token: auth.accessToken })
        .reply(200, 'success');
      const promise = github.delete(endpoint);
      expect(promise instanceof Promise).toBeTruthy();
    });

    it('sould have callback', (done) => {
      const endpoint = 'tag/sunset';
      nock('https://api.github.com')
        .delete(`/${endpoint}`)
        .query({ access_token: auth.accessToken })
        .reply(200, 'success');
      github.delete(endpoint, (err, result) => {
        expect(err).toBe(null);
        expect(result).toBe('success');
        done();
      });
    });

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
