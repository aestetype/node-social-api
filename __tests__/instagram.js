import nock from 'nock';
import Core from '../src/core/core';
import Instagram from '../src/instagram';

describe('Instagram', () => {
  const auth = {
    clientId: 'clientId',
    accessToken: 'accessToken',
  };

  it('should be a class', () => {
    const instagram = new Instagram(auth);
    expect(instagram instanceof Instagram).toBeTruthy();
  });

  it('should be a class extending Core', () => {
    const instagram = new Instagram(auth);
    expect(instagram instanceof Core).toBeTruthy();
  });

  describe('#constructor', () => {
    it('should throw if no clientId provided', () => {
      try {
        new Instagram(); // eslint-disable-line no-new
      } catch (e) {
        expect(e.message).toMatch(/clientId/);
      }
    });

    it('should throw if no accessToken provided', () => {
      try {
        new Instagram({ clientId: 'clientId' }); // eslint-disable-line no-new
      } catch (e) {
        expect(e.message).toMatch(/accessToken/);
      }
    });

    it('should set this.options', () => {
      const instagram = new Instagram(auth);
      expect(instagram.options.client_id).toEqual(auth.clientId);
      expect(instagram.options.access_token).toEqual(auth.accessToken);
    });

    it('should be api version v1 by default', () => {
      const instagram = new Instagram(auth);
      expect(instagram.version).toEqual('v1');
    });

    it('should overwrite api version', () => {
      const instagram = new Instagram(auth, {
        version: 'v2',
      });
      expect(instagram.version).toEqual('v2');
    });

    it('should create baseApiUrl', () => {
      const instagram = new Instagram(auth);
      expect(instagram.baseApiUrl).toEqual(`${instagram.url}/${instagram.version}`);
    });
  });

  describe('#get', () => {
    const instagram = new Instagram(auth);

    it('should be a function', () => {
      expect(typeof instagram.get).toBe('function');
    });

    it('should return a promise', () => {
      const endpoint = 'tag/sunset';
      nock('https://api.instagram.com')
        .get(`/v1/${endpoint}`)
        .query({ client_id: auth.clientId, access_token: auth.accessToken })
        .reply(200, 'success');
      const promise = instagram.get(endpoint);
      expect(promise instanceof Promise).toBeTruthy();
    });

    it('sould have callback', (done) => {
      const endpoint = 'tag/sunset';
      nock('https://api.instagram.com')
        .get(`/v1/${endpoint}`)
        .query({ client_id: auth.clientId, access_token: auth.accessToken })
        .reply(200, 'success');
      instagram.get(endpoint, (err, result) => {
        expect(err).toBe(null);
        expect(result).toBe('success');
        done();
      });
    });

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

    it('should be a function', () => {
      expect(typeof instagram.post).toBe('function');
    });

    it('should return a promise', () => {
      const endpoint = 'tag/sunset';
      nock('https://api.instagram.com')
        .post(`/v1/${endpoint}`, {
          client_id: auth.clientId, access_token: auth.accessToken,
        })
        .reply(200, 'success');
      const promise = instagram.post(endpoint);
      expect(promise instanceof Promise).toBeTruthy();
    });

    it('sould have callback', (done) => {
      const endpoint = 'tag/sunset';
      nock('https://api.instagram.com')
        .post(`/v1/${endpoint}`, {
          client_id: auth.clientId, access_token: auth.accessToken,
        })
        .reply(200, 'success');
      instagram.post(endpoint, (err, result) => {
        expect(err).toBe(null);
        expect(result).toBe('success');
        done();
      });
    });

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

    it('should be a function', () => {
      expect(typeof instagram.delete).toBe('function');
    });

    it('should return a promise', () => {
      const endpoint = 'tag/sunset';
      nock('https://api.instagram.com')
        .delete(`/v1/${endpoint}`)
        .query({ client_id: auth.clientId, access_token: auth.accessToken })
        .reply(200, 'success');
      const promise = instagram.delete(endpoint);
      expect(promise instanceof Promise).toBeTruthy();
    });

    it('sould have callback', (done) => {
      const endpoint = 'tag/sunset';
      nock('https://api.instagram.com')
        .delete(`/v1/${endpoint}`)
        .query({ client_id: auth.clientId, access_token: auth.accessToken })
        .reply(200, 'success');
      instagram.delete(endpoint, (err, result) => {
        expect(err).toBe(null);
        expect(result).toBe('success');
        done();
      });
    });

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
