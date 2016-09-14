import EventEmitter from 'events';
import nock from 'nock';
import Facebook from '../../src/facebook';
import FacebookStream from '../../src/facebook/stream';
import { generateNewMessage, generateOldMessage } from './utils';

describe('FacebookStream', () => {
  const auth = {
    appId: 'appId',
    appSecret: 'appSecret',
  };
  const accessToken = `${auth.appId}|${auth.appSecret}`;
  const facebook = new Facebook(auth);
  const endpoint = '1481315475498634/feed';

  it('should be a class', () => {
    const stream = new FacebookStream(facebook, endpoint, {
      runOnCreation: false,
    });
    expect(stream instanceof FacebookStream).toBeTruthy();
  });

  it('should be a class extending EventEmitter', () => {
    const stream = new FacebookStream(facebook, endpoint, {
      runOnCreation: false,
    });
    expect(stream instanceof EventEmitter).toBeTruthy();
  });

  describe('#constructor', () => {
    it('should set internal values', () => {
      const stream = new FacebookStream(facebook, endpoint, {
        runOnCreation: false,
      });
      expect(stream.facebook).toEqual(facebook);
      expect(stream.endpoint).toEqual(endpoint);
    });

    it('should be interval 20000 by default', () => {
      const stream = new FacebookStream(facebook, endpoint, {
        runOnCreation: false,
      });
      expect(stream.interval).toEqual(20000);
    });

    it('should overwrite interval', () => {
      const stream = new FacebookStream(facebook, endpoint, {
        runOnCreation: false,
        interval: 10000,
      });
      expect(stream.interval).toEqual(10000);
    });
  });

  describe('#makeRequest', () => {
    it('should be a function', () => {
      const stream = new FacebookStream(facebook, endpoint, {
        runOnCreation: false,
      });
      expect(typeof stream.makeRequest).toBe('function');
    });

    it('should return messages event', (done) => {
      const data = [generateNewMessage('a')];
      const scope = nock('https://graph.facebook.com')
        .get(`/v2.5/${endpoint}`)
        .query({ access_token: accessToken })
        .reply(200, { data });
      const stream = new FacebookStream(facebook, endpoint);
      stream.on('message', (message) => {
        stream.stop();
        expect(scope.isDone()).toBeTruthy();
        expect(message).toEqual(data[0]);
        done();
      });
    });

    it('should return error event', (done) => {
      const scope = nock('https://graph.facebook.com')
        .get(`/v2.5/${endpoint}`)
        .query({ access_token: accessToken })
        .reply(400, 'error');
      const stream = new FacebookStream(facebook, endpoint);
      stream.on('error', (err) => {
        stream.stop();
        expect(scope.isDone()).toBeTruthy();
        expect(err.body).toEqual('error');
        done();
      });
    });

    it('should not return old messages', (done) => {
      const data = [generateOldMessage('a'), generateNewMessage('b')];
      const scope = nock('https://graph.facebook.com')
        .get(`/v2.5/${endpoint}`)
        .query({ access_token: accessToken })
        .reply(200, { data });
      const stream = new FacebookStream(facebook, endpoint);
      stream.on('message', (message) => {
        stream.stop();
        expect(scope.isDone()).toBeTruthy();
        expect(message).toEqual(data[1]);
        done();
      });
    });

    it('should add messages to cache', (done) => {
      const data = [generateNewMessage('a'), generateNewMessage('b')];
      const scope = nock('https://graph.facebook.com')
        .get(`/v2.5/${endpoint}`)
        .query({ access_token: accessToken })
        .reply(200, { data });
      const stream = new FacebookStream(facebook, endpoint);
      let i = 0;
      stream.on('message', () => {
        i += 1;
        if (i === 2) {
          stream.stop();
          expect(scope.isDone()).toBeTruthy();
          expect(stream.cache).toEqual(data.map(val => val.id));
          done();
        }
      });
    });

    it('should not return messages in cache', (done) => {
      const data = [generateNewMessage('a'), generateNewMessage('b')];
      const scope = nock('https://graph.facebook.com')
        .get(`/v2.5/${endpoint}`)
        .query({ access_token: accessToken })
        .times(3)
        .reply(200, { data });
      const stream = new FacebookStream(facebook, endpoint, {
        interval: 100,
      });
      const callSpy = jest.fn();
      stream.on('message', callSpy);
      setTimeout(() => {
        stream.stop();
        expect(scope.isDone()).toBeTruthy();
        expect(callSpy.mock.calls.length).toEqual(2);
        done();
      }, 300);
    });

    it('should not return messages', (done) => {
      const scope = nock('https://graph.facebook.com')
        .get(`/v2.5/${endpoint}`)
        .query({ access_token: accessToken })
        .reply(200, { data: [] });
      const stream = new FacebookStream(facebook, endpoint);
      const callSpy = jest.fn();
      stream.on('message', callSpy);
      setTimeout(() => {
        expect(scope.isDone()).toBeTruthy();
        expect(callSpy.mock.calls.length).toEqual(0);
        stream.stop();
        done();
      }, 300);
    });
  });
});
