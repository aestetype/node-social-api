import * as nock from 'nock';
import { Facebook } from '../../src';

describe('Facebook', () => {
  const auth = {
    appId: 'appId',
    appSecret: 'appSecret',
  };

  it('should be a class', () => {
    const facebook = new Facebook(auth);
    expect(facebook instanceof Facebook).toBeTruthy();
  });

  describe('#constructor', () => {
    it('should throw if no appId provided', () => {
      try {
        new Facebook({}); // eslint-disable-line no-new
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
      const facebook = new Facebook({
        // eslint-disable-line no-new
        accessToken: 'accessToken',
      });
      expect(facebook).toBeTruthy();
    });

    it('should set this.options', () => {
      const facebook = new Facebook({ accessToken: 'accessToken' });
      expect(facebook.config.access_token).toEqual('accessToken');
    });

    it('should generate access_token with appId and appSecret', () => {
      const facebook = new Facebook(auth);
      expect(facebook.config.access_token).toEqual(
        `${auth.appId}|${auth.appSecret}`,
      );
    });

    it('should overwrite api version', () => {
      const facebook = new Facebook({ ...auth, apiVersion: 'v3' });
      expect(facebook.apiUrl).toEqual('https://graph.facebook.com/v3');
    });
  });

  describe('#get', () => {
    const facebook = new Facebook(auth);
    const accessToken = `${auth.appId}|${auth.appSecret}`;

    it('sould make get request', async () => {
      const endpoint = 'media/recent';
      nock('https://graph.facebook.com')
        .get(`/v2.9/${endpoint}`)
        .query({ access_token: accessToken })
        .reply(200, 'success');
      const result = await facebook.get(endpoint);
      expect(result).toBe('success');
    });

    it('sould pass parameters', async () => {
      const endpoint = 'search/tweets';
      nock('https://graph.facebook.com')
        .get(`/v2.9/${endpoint}`)
        .query({ access_token: accessToken, q: 'sunset' })
        .reply(200, 'success');
      const result = await facebook.get(endpoint, { q: 'sunset' });
      expect(result).toBe('success');
    });
  });

  describe('#post', () => {
    const facebook = new Facebook(auth);

    it('sould make post request', async () => {
      const endpoint = 'media/recent';
      nock('https://graph.facebook.com')
        .post(`/v2.9/${endpoint}`)
        .reply(200, 'success');
      const result = await facebook.post(endpoint);
      expect(result).toBe('success');
    });

    it('sould pass parameters', async () => {
      const endpoint = 'statuses/update';
      nock('https://graph.facebook.com')
        .post(`/v2.9/${endpoint}`, {
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

    it('sould make delete request', async () => {
      const endpoint = 'media/recent';
      nock('https://graph.facebook.com')
        .delete(`/v2.9/${endpoint}`)
        .query({ access_token: accessToken })
        .reply(200, 'success');
      const result = await facebook.delete(endpoint);
      expect(result).toBe('success');
    });

    it('sould pass parameters', async () => {
      const endpoint = 'search/tweets';
      nock('https://graph.facebook.com')
        .delete(`/v2.9/${endpoint}`)
        .query({ access_token: accessToken, q: 'sunset' })
        .reply(200, 'success');
      const result = await facebook.delete(endpoint, { q: 'sunset' });
      expect(result).toBe('success');
    });
  });
});
