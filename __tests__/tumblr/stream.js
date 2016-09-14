import EventEmitter from 'events';
import nock from 'nock';
import Tumblr from '../../src/tumblr';
import TumblrStream from '../../src/tumblr/stream';
import { generateNewMessage, generateOldMessage } from './utils';

describe('TumblrStream', () => {
  const auth = {
    consumerKey: 'consumerKey',
  };
  const tumblr = new Tumblr(auth);
  const endpoint = 'blog/museumdemain.tumblr.com/posts';

  it('should be a class', () => {
    const stream = new TumblrStream(tumblr, endpoint, {
      runOnCreation: false,
    });
    expect(stream instanceof TumblrStream).toBeTruthy();
  });

  it('should be a class extending EventEmitter', () => {
    const stream = new TumblrStream(tumblr, endpoint, {
      runOnCreation: false,
    });
    expect(stream instanceof EventEmitter).toBeTruthy();
  });

  describe('#constructor', () => {
    it('should set internal values', () => {
      const stream = new TumblrStream(tumblr, endpoint, {
        runOnCreation: false,
      });
      expect(stream.tumblr).toEqual(tumblr);
      expect(stream.endpoint).toEqual(endpoint);
    });

    it('should be interval 20000 by default', () => {
      const stream = new TumblrStream(tumblr, endpoint, {
        runOnCreation: false,
      });
      expect(stream.interval).toEqual(20000);
    });

    it('should overwrite interval', () => {
      const stream = new TumblrStream(tumblr, endpoint, {
        runOnCreation: false,
        interval: 10000,
      });
      expect(stream.interval).toEqual(10000);
    });
  });

  describe('#makeRequest', () => {
    it('should be a function', () => {
      const stream = new TumblrStream(tumblr, endpoint, {
        runOnCreation: false,
      });
      expect(typeof stream.makeRequest).toBe('function');
    });

    it('should return messages event', (done) => {
      const data = [generateNewMessage('a')];
      const scope = nock('https://api.tumblr.com')
        .get(`/v2/${endpoint}`)
        .query({ api_key: auth.consumerKey })
        .reply(200, {
          response: {
            posts: data,
          },
        });
      const stream = new TumblrStream(tumblr, endpoint);
      stream.on('message', (message) => {
        stream.stop();
        expect(scope.isDone()).toBeTruthy();
        expect(message).toEqual(data[0]);
        done();
      });
    });

    it('should return error event', (done) => {
      const scope = nock('https://api.tumblr.com')
        .get(`/v2/${endpoint}`)
        .query({ api_key: auth.consumerKey })
        .reply(400, 'error');
      const stream = new TumblrStream(tumblr, endpoint);
      stream.on('error', (err) => {
        stream.stop();
        expect(scope.isDone()).toBeTruthy();
        expect(err.body).toEqual('error');
        done();
      });
    });

    it('should not return old messages', (done) => {
      const data = [generateOldMessage('a'), generateNewMessage('b')];
      const scope = nock('https://api.tumblr.com')
        .get(`/v2/${endpoint}`)
        .query({ api_key: auth.consumerKey })
        .reply(200, {
          response: {
            posts: data,
          },
        });
      const stream = new TumblrStream(tumblr, endpoint);
      stream.on('message', (message) => {
        stream.stop();
        expect(scope.isDone()).toBeTruthy();
        expect(message).toEqual(data[1]);
        done();
      });
    });

    it('should add messages to cache', (done) => {
      const data = [generateNewMessage('a'), generateNewMessage('b')];
      const scope = nock('https://api.tumblr.com')
        .get(`/v2/${endpoint}`)
        .query({ api_key: auth.consumerKey })
        .reply(200, {
          response: {
            posts: data,
          },
        });
      const stream = new TumblrStream(tumblr, endpoint);
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
      const scope = nock('https://api.tumblr.com')
        .get(`/v2/${endpoint}`)
        .query({ api_key: auth.consumerKey })
        .times(3)
        .reply(200, {
          response: {
            posts: data,
          },
        });
      const stream = new TumblrStream(tumblr, endpoint, {
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
      const scope = nock('https://api.tumblr.com')
        .get(`/v2/${endpoint}`)
        .query({ api_key: auth.consumerKey })
        .reply(200, { response: { posts: [] } });
      const stream = new TumblrStream(tumblr, endpoint);
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
