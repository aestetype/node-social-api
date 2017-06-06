import nock from 'nock';
import { Instagram } from '../../src';

describe('Instagram', () => {
  const auth = {
    clientId: 'clientId',
    accessToken: 'accessToken',
  };

  it('should be a class', () => {
    const instagram = new Instagram(auth);
    expect(instagram instanceof Instagram).toBeTruthy();
  });

  describe('#constructor', () => {
    it('should throw if no clientId provided', () => {
      try {
        new Instagram();
      } catch (e) {
        expect(e.message).toMatch(/clientId/);
      }
    });

    it('should throw if no accessToken provided', () => {
      try {
        new Instagram({ clientId: 'clientId' });
      } catch (e) {
        expect(e.message).toMatch(/accessToken/);
      }
    });

    it('should set this.options', () => {
      const instagram = new Instagram(auth);
      expect(instagram.config.client_id).toEqual(auth.clientId);
      expect(instagram.config.access_token).toEqual(auth.accessToken);
    });

    it('should overwrite api version', () => {
      const instagram = new Instagram({ ...auth, apiVersion: 'v2' });
      expect(instagram.apiUrl).toEqual('https://api.instagram.com/v2');
    });
  });

  describe('#get', () => {
    const instagram = new Instagram(auth);

    it('sould make get request', async () => {
      const endpoint = 'tag/sunset';
      nock('https://api.instagram.com')
        .get(`/v1/${endpoint}`)
        .query({ client_id: auth.clientId, access_token: auth.accessToken })
        .reply(200, 'success');
      const result = await instagram.get(endpoint);
      expect(result).toBe('success');
    });

    it('sould pass parameters', async () => {
      const endpoint = 'tag/sunset';
      nock('https://api.instagram.com')
        .get(`/v1/${endpoint}`)
        .query({ client_id: auth.clientId, access_token: auth.accessToken, q: 'sunset' })
        .reply(200, 'success');
      const result = await instagram.get(endpoint, { q: 'sunset' });
      expect(result).toBe('success');
    });
  });

  describe('#post', () => {
    const instagram = new Instagram(auth);

    it('sould make post request', async () => {
      const endpoint = 'tag/sunset';
      nock('https://api.instagram.com')
        .post(`/v1/${endpoint}`, {
          client_id: auth.clientId, access_token: auth.accessToken,
        })
        .reply(200, 'success');
      const result = await instagram.post(endpoint);
      expect(result).toBe('success');
    });

    it('sould pass parameters', async () => {
      const endpoint = 'tag/sunset';
      nock('https://api.instagram.com')
        .post(`/v1/${endpoint}`, {
          client_id: auth.clientId, access_token: auth.accessToken, q: 'sunset',
        })
        .reply(200, 'success');
      const result = await instagram.post(endpoint, { q: 'sunset' });
      expect(result).toBe('success');
    });
  });

  describe('#delete', () => {
    const instagram = new Instagram(auth);

    it('sould make delete request', async () => {
      const endpoint = 'tag/sunset';
      nock('https://api.instagram.com')
        .delete(`/v1/${endpoint}`)
        .query({ client_id: auth.clientId, access_token: auth.accessToken })
        .reply(200, 'success');
      const result = await instagram.delete(endpoint);
      expect(result).toBe('success');
    });

    it('sould pass parameters', async () => {
      const endpoint = 'tag/sunset';
      nock('https://api.instagram.com')
        .delete(`/v1/${endpoint}`)
        .query({ client_id: auth.clientId, access_token: auth.accessToken, q: 'sunset' })
        .reply(200, 'success');
      const result = await instagram.delete(endpoint, { q: 'sunset' });
      expect(result).toBe('success');
    });
  });
});
