import { assert } from 'chai';
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
    assert.ok(instagram instanceof Instagram);
  });

  it('should be a class extending Core', () => {
    const instagram = new Instagram(auth);
    assert.ok(instagram instanceof Core);
  });

  describe('#constructor', () => {
    it('should throw if no clientId provided', () => {
      try {
        new Instagram(); // eslint-disable-line no-new
      } catch (e) {
        assert.match(e, /clientId/);
      }
    });

    it('should throw if no accessToken provided', () => {
      try {
        new Instagram({ clientId: 'clientId' }); // eslint-disable-line no-new
      } catch (e) {
        assert.match(e, /accessToken/);
      }
    });

    it('should set this.options', () => {
      const instagram = new Instagram(auth);
      assert.equal(instagram.options.client_id, auth.clientId, 'should set clientId');
      assert.equal(instagram.options.access_token, auth.accessToken, 'should set accessToken');
    });

    it('should be api version v1 by default', () => {
      const instagram = new Instagram(auth);
      assert.equal(instagram.version, 'v1');
    });

    it('should overwrite api version', () => {
      const instagram = new Instagram(auth, {
        version: 'v2',
      });
      assert.equal(instagram.version, 'v2');
    });

    it('should create baseApiUrl', () => {
      const instagram = new Instagram(auth);
      assert.equal(instagram.baseApiUrl, `${instagram.url}/${instagram.version}`);
    });
  });

  describe('#get', () => {
    const instagram = new Instagram(auth);

    it('should be a function', () => {
      assert.isFunction(instagram.get);
    });

    it('should return a promise', () => {
      const endpoint = 'tag/sunset';
      nock('https://api.instagram.com')
        .get(`/v1/${endpoint}`)
        .query({ client_id: auth.clientId, access_token: auth.accessToken })
        .reply(200, 'success');
      const promise = instagram.get(endpoint);
      assert.ok(promise instanceof Promise);
    });

    it('sould make get request', async () => {
      const endpoint = 'tag/sunset';
      nock('https://api.instagram.com')
        .get(`/v1/${endpoint}`)
        .query({ client_id: auth.clientId, access_token: auth.accessToken })
        .reply(200, 'success');
      const result = await instagram.get(endpoint);
      assert.equal(result, 'success');
    });

    it('sould pass parameters', async () => {
      const endpoint = 'tag/sunset';
      nock('https://api.instagram.com')
        .get(`/v1/${endpoint}`)
        .query({ client_id: auth.clientId, access_token: auth.accessToken, q: 'sunset' })
        .reply(200, 'success');
      const result = await instagram.get(endpoint, { q: 'sunset' });
      assert.equal(result, 'success');
    });
  });

  describe('#post', () => {
    const instagram = new Instagram(auth);

    it('should be a function', () => {
      assert.isFunction(instagram.post);
    });

    it('should return a promise', () => {
      const endpoint = 'tag/sunset';
      nock('https://api.instagram.com')
        .post(`/v1/${endpoint}`, {
          client_id: auth.clientId, access_token: auth.accessToken,
        })
        .reply(200, 'success');
      const promise = instagram.post(endpoint);
      assert.ok(promise instanceof Promise);
    });

    it('sould make post request', async () => {
      const endpoint = 'tag/sunset';
      nock('https://api.instagram.com')
        .post(`/v1/${endpoint}`, {
          client_id: auth.clientId, access_token: auth.accessToken,
        })
        .reply(200, 'success');
      const result = await instagram.post(endpoint);
      assert.equal(result, 'success');
    });

    it('sould pass parameters', async () => {
      const endpoint = 'tag/sunset';
      nock('https://api.instagram.com')
        .post(`/v1/${endpoint}`, {
          client_id: auth.clientId, access_token: auth.accessToken, q: 'sunset',
        })
        .reply(200, 'success');
      const result = await instagram.post(endpoint, { q: 'sunset' });
      assert.equal(result, 'success');
    });
  });

  describe('#delete', () => {
    const instagram = new Instagram(auth);

    it('should be a function', () => {
      assert.isFunction(instagram.delete);
    });

    it('should return a promise', () => {
      const endpoint = 'tag/sunset';
      nock('https://api.instagram.com')
        .delete(`/v1/${endpoint}`)
        .query({ client_id: auth.clientId, access_token: auth.accessToken })
        .reply(200, 'success');
      const promise = instagram.delete(endpoint);
      assert.ok(promise instanceof Promise);
    });

    it('sould make delete request', async () => {
      const endpoint = 'tag/sunset';
      nock('https://api.instagram.com')
        .delete(`/v1/${endpoint}`)
        .query({ client_id: auth.clientId, access_token: auth.accessToken })
        .reply(200, 'success');
      const result = await instagram.delete(endpoint);
      assert.equal(result, 'success');
    });

    it('sould pass parameters', async () => {
      const endpoint = 'tag/sunset';
      nock('https://api.instagram.com')
        .delete(`/v1/${endpoint}`)
        .query({ client_id: auth.clientId, access_token: auth.accessToken, q: 'sunset' })
        .reply(200, 'success');
      const result = await instagram.delete(endpoint, { q: 'sunset' });
      assert.equal(result, 'success');
    });
  });
});
