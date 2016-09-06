import { assert } from 'chai';
import Bluebird from 'bluebird';
import nock from 'nock';
import Core from '../src/core/core';

describe('Core', () => {
  it('should be a class', () => {
    const core = new Core({});
    assert.ok(core instanceof Core);
  });

  describe('#constructor', () => {
    it('should set global Promise by default', () => {
      const core = new Core({});
      assert.equal(core.Promise, Promise);
    });

    it('should overwrite Promise', () => {
      const core = new Core({ Promise: Bluebird });
      assert.equal(core.Promise, Bluebird);
    });
  });

  describe('#checkValidConfig', () => {
    // TODO test checkValidConfig
  });

  describe('#request', () => {
    const core = new Core({});

    it('should return a promise', () => {
      nock('https://api.instagram.com')
        .get('/')
        .reply(200, 'success');
      const promise = core.request({
        method: 'GET',
        uri: 'https://api.instagram.com',
      });
      assert.ok(promise instanceof Promise);
    });

    it('should return request result', async () => {
      nock('https://api.instagram.com')
        .get('/')
        .reply(200, 'success');
      const result = await core.request({
        method: 'GET',
        uri: 'https://api.instagram.com',
      });
      assert.equal(result, 'success');
    });

    it('should return request error', async () => {
      nock('https://api.instagram.com')
        .get('/')
        .reply(400, 'error');
      try {
        await core.request({
          method: 'GET',
          uri: 'https://api.instagram.com',
        });
      } catch (err) {
        assert.equal(err.body, 'error');
      }
    });
  });
});
