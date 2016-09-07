import nock from 'nock';
import Core from '../src/core/core';
import Facebook from '../src/facebook';

describe('Facebook', () => {
  const auth = {
    appId: 'appId',
    appSecret: 'appSecret',
  };

  it('should be a class', () => {
    const facebook = new Facebook(auth);
    expect(facebook instanceof Facebook).toBeTruthy();
  });

  it('should be a class extending Core', () => {
    const facebook = new Facebook(auth);
    expect(facebook instanceof Core).toBeTruthy();
  });

  describe('#constructor', () => {
    it('should throw if no appId provided', () => {
      try {
        new Facebook(); // eslint-disable-line no-new
      } catch (e) {
        expect(e.message).toMatch(/appId/);
      }
    });

    it('should throw if no appSecret provided', () => {
      try {
        new Facebook({ appId: 'appId' }); // eslint-disable-line no-new
      } catch (e) {
        expect(e.message).toMatch(/appSecret/);
      }
    });

    it('should not throw if accessToken provided', () => {
      const facebook = new Facebook({ // eslint-disable-line no-new
        accessToken: 'accessToken',
      });
      expect(facebook).toBeTruthy();
    });

    it('should set this.auth', () => {
      const facebook = new Facebook(auth);
      expect(facebook.auth.appId).toEqual(auth.appId);
      expect(facebook.auth.appSecret).toEqual(auth.appSecret);
    });

    it('should set this.options', () => {
      const facebook = new Facebook({ accessToken: 'accessToken' });
      expect(facebook.options.access_token).toEqual('accessToken');
    });

    it('should generate access_token with appId and appSecret', () => {
      const facebook = new Facebook(auth);
      expect(facebook.options.access_token)
        .toEqual(`${auth.appId}|${auth.appSecret}`);
    });

    it('should be api version v2.5 by default', () => {
      const facebook = new Facebook(auth);
      expect(facebook.version).toEqual('v2.5');
    });

    it('should overwrite api version', () => {
      const facebook = new Facebook(auth, {
        version: 'v3',
      });
      expect(facebook.version).toEqual('v3');
    });

    it('should create baseApiUrl', () => {
      const facebook = new Facebook(auth);
      expect(facebook.baseApiUrl).toEqual(`${facebook.url}/${facebook.version}`);
    });
  });

  describe('#get', () => {
    const facebook = new Facebook(auth);
    const accessToken = `${auth.appId}|${auth.appSecret}`;

    it('should be a function', () => {
      expect(typeof facebook.get).toBe('function');
    });

    it('should return a promise', () => {
      const endpoint = 'media/recent';
      nock('https://graph.facebook.com')
        .get(`/v2.5/${endpoint}`)
        .query({ access_token: accessToken })
        .reply(200, 'success');
      const promise = facebook.get(endpoint);
      expect(promise instanceof Promise).toBeTruthy();
    });

    it('sould make get request', async () => {
      const endpoint = 'media/recent';
      nock('https://graph.facebook.com')
        .get(`/v2.5/${endpoint}`)
        .query({ access_token: accessToken })
        .reply(200, 'success');
      const result = await facebook.get(endpoint);
      expect(result).toBe('success');
    });

    it('sould pass parameters', async () => {
      const endpoint = 'search/tweets';
      nock('https://graph.facebook.com')
        .get(`/v2.5/${endpoint}`)
        .query({ access_token: accessToken, q: 'sunset' })
        .reply(200, 'success');
      const result = await facebook.get(endpoint, { q: 'sunset' });
      expect(result).toBe('success');
    });
  });

  describe('#post', () => {
    const facebook = new Facebook(auth);

    it('should be a function', () => {
      expect(typeof facebook.post).toBe('function');
    });

    it('should return a promise', () => {
      const endpoint = 'media/recent';
      nock('https://graph.facebook.com')
        .post(`/v2.5/${endpoint}`)
        .reply(200, 'success');
      const promise = facebook.post(endpoint);
      expect(promise instanceof Promise).toBeTruthy();
    });

    it('sould make post request', async () => {
      const endpoint = 'media/recent';
      nock('https://graph.facebook.com')
        .post(`/v2.5/${endpoint}`)
        .reply(200, 'success');
      const result = await facebook.post(endpoint);
      expect(result).toBe('success');
    });

    it('sould pass parameters', async () => {
      const endpoint = 'statuses/update';
      nock('https://graph.facebook.com')
        .post(`/v2.5/${endpoint}`, {
          status: 'sunset',
        })
        .reply(200, 'success');
      const result = await facebook.post(endpoint, { status: 'sunset' });
      expect(result).toBe('success');
    });
  });

  describe('#delete', () => {
    const facebook = new Facebook(auth);
    const accessToken = `${auth.appId}|${auth.appSecret}`;

    it('should be a function', () => {
      expect(typeof facebook.delete).toBe('function');
    });

    it('should return a promise', () => {
      const endpoint = 'media/recent';
      nock('https://graph.facebook.com')
        .delete(`/v2.5/${endpoint}`)
        .query({ access_token: accessToken })
        .reply(200, 'success');
      const promise = facebook.delete(endpoint);
      expect(promise instanceof Promise).toBeTruthy();
    });

    it('sould make delete request', async () => {
      const endpoint = 'media/recent';
      nock('https://graph.facebook.com')
        .delete(`/v2.5/${endpoint}`)
        .query({ access_token: accessToken })
        .reply(200, 'success');
      const result = await facebook.delete(endpoint);
      expect(result).toBe('success');
    });

    it('sould pass parameters', async () => {
      const endpoint = 'search/tweets';
      nock('https://graph.facebook.com')
        .delete(`/v2.5/${endpoint}`)
        .query({ access_token: accessToken, q: 'sunset' })
        .reply(200, 'success');
      const result = await facebook.delete(endpoint, { q: 'sunset' });
      expect(result).toBe('success');
    });
  });
});
