import EventEmitter from 'events';
import nock from 'nock';
import Instagram from '../../src/instagram';
import InstagramStream from '../../src/instagram/stream';
import { generateNewMessage, generateOldMessage } from './utils';

describe('InstagramStream', () => {
  const auth = {
    clientId: 'clientId',
    accessToken: 'accessToken',
  };
  const instagram = new Instagram(auth);
  const endpoint = 'tags/sunset/media/recent';

  it('should be a class', () => {
    const stream = new InstagramStream(instagram, 'tags/sunset/media/recent', {
      runOnCreation: false,
    });
    expect(stream instanceof InstagramStream).toBeTruthy();
  });

  it('should be a class extending EventEmitter', () => {
    const stream = new InstagramStream(instagram, 'tags/sunset/media/recent', {
      runOnCreation: false,
    });
    expect(stream instanceof EventEmitter).toBeTruthy();
  });

  describe('#constructor', () => {
    it('should set internal values', () => {
      const stream = new InstagramStream(instagram, endpoint, {
        runOnCreation: false,
      });
      expect(stream.instagram).toEqual(instagram);
      expect(stream.endpoint).toEqual(endpoint);
      expect(stream.cache).toEqual([]);
    });

    it('should be interval 10000 by default', () => {
      const stream = new InstagramStream(instagram, endpoint, {
        runOnCreation: false,
      });
      expect(stream.interval).toEqual(10000);
    });

    it('should overwrite interval', () => {
      const stream = new InstagramStream(instagram, endpoint, {
        runOnCreation: false,
        interval: 20000,
      });
      expect(stream.interval).toEqual(20000);
    });
  });

  describe('#start', () => {
    it('should be a function', () => {
      const stream = new InstagramStream(instagram, endpoint, {
        runOnCreation: false,
      });
      expect(typeof stream.start).toBe('function');
    });

    it('should call stop', () => {
      const stream = new InstagramStream(instagram, endpoint, {
        runOnCreation: false,
      });
      stream.stopSave = stream.stop;
      stream.stop = jest.fn();
      stream.makeRequest = jest.fn();
      stream.start();
      expect(stream.stop.mock.calls.length).toEqual(1);
      expect(stream.makeRequest.mock.calls.length).toEqual(1);
      stream.stopSave();
    });

    it('should call makeRequest', () => {
      const stream = new InstagramStream(instagram, endpoint, {
        runOnCreation: false,
      });
      stream.makeRequest = jest.fn();
      stream.start();
      expect(stream.makeRequest.mock.calls.length).toEqual(1);
      stream.stop();
    });

    it('should interval on makeRequest', (done) => {
      const stream = new InstagramStream(instagram, endpoint, {
        runOnCreation: false,
        interval: 100,
      });
      stream.makeRequest = jest.fn();
      stream.start();
      setTimeout(() => {
        expect(stream.makeRequest.mock.calls.length).toEqual(10);
        stream.stop();
        done();
      }, 1000);
    });
  });

  describe('#stop', () => {
    it('should be a function', () => {
      const stream = new InstagramStream(instagram, endpoint, {
        runOnCreation: false,
      });
      expect(typeof stream.stop).toBe('function');
    });

    it('should stop interval', (done) => {
      const stream = new InstagramStream(instagram, endpoint, {
        runOnCreation: false,
        interval: 100,
      });
      stream.makeRequest = jest.fn();
      stream.start();
      setTimeout(() => {
        expect(stream.makeRequest.mock.calls.length).toEqual(10);
        stream.stop();
        setTimeout(() => {
          expect(stream.makeRequest.mock.calls.length).toEqual(10);
          done();
        }, 1000);
      }, 1000);
    });
  });

  describe('#makeRequest', () => {
    it('should be a function', () => {
      const stream = new InstagramStream(instagram, endpoint, {
        runOnCreation: false,
      });
      expect(typeof stream.makeRequest).toBe('function');
    });

    it('should return messages event', (done) => {
      const data = [generateNewMessage('a')];
      const scope = nock('https://api.instagram.com')
        .get(`/v1/${endpoint}`)
        .query({ client_id: 'clientId', access_token: 'accessToken' })
        .reply(200, {
          pagination: {},
          data,
        });
      const stream = new InstagramStream(instagram, endpoint);
      stream.on('message', (message) => {
        stream.stop();
        expect(scope.isDone()).toBeTruthy();
        expect(message).toEqual(data[0]);
        done();
      });
    });

    it('should return error event', (done) => {
      const scope = nock('https://api.instagram.com')
        .get(`/v1/${endpoint}`)
        .query({ client_id: 'clientId', access_token: 'accessToken' })
        .reply(400, 'error');
      const stream = new InstagramStream(instagram, endpoint);
      stream.on('error', (err) => {
        stream.stop();
        expect(scope.isDone()).toBeTruthy();
        expect(err.body).toEqual('error');
        done();
      });
    });

    it('should not return old messages', (done) => {
      const data = [generateOldMessage('a'), generateNewMessage('b')];
      const scope = nock('https://api.instagram.com')
        .get(`/v1/${endpoint}`)
        .query({ client_id: 'clientId', access_token: 'accessToken' })
        .reply(200, {
          pagination: {},
          data,
        });
      const stream = new InstagramStream(instagram, endpoint);
      stream.on('message', (message) => {
        stream.stop();
        expect(scope.isDone()).toBeTruthy();
        expect(message).toEqual(data[1]);
        done();
      });
    });

    it('should add messages to cache', (done) => {
      const data = [generateNewMessage('a'), generateNewMessage('b')];
      const scope = nock('https://api.instagram.com')
        .get(`/v1/${endpoint}`)
        .query({ client_id: 'clientId', access_token: 'accessToken' })
        .reply(200, {
          pagination: {},
          data,
        });
      const stream = new InstagramStream(instagram, endpoint);
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
      const scope = nock('https://api.instagram.com')
        .get(`/v1/${endpoint}`)
        .query({ client_id: 'clientId', access_token: 'accessToken' })
        .times(3)
        .reply(200, {
          pagination: {},
          data,
        });
      const stream = new InstagramStream(instagram, endpoint, {
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
      const scope = nock('https://api.instagram.com')
        .get(`/v1/${endpoint}`)
        .query({ client_id: 'clientId', access_token: 'accessToken' })
        .reply(200, { pagination: {}, data: [] });
      const stream = new InstagramStream(instagram, endpoint);
      const callSpy = jest.fn();
      stream.on('message', callSpy);
      setTimeout(() => {
        expect(scope.isDone()).toBeTruthy();
        expect(callSpy.mock.calls.length).toEqual(0);
        stream.stop();
        done();
      }, 300);
    });

    it('should make next request with min_tag_id if provided', (done) => {
      const data = [generateNewMessage('a'), generateNewMessage('b')];
      const scope1 = nock('https://api.instagram.com')
        .get(`/v1/${endpoint}`)
        .query({ client_id: 'clientId', access_token: 'accessToken' })
        .reply(200, {
          pagination: {
            min_tag_id: 'tag_id',
          },
          data,
        });
      const scope2 = nock('https://api.instagram.com')
        .get(`/v1/${endpoint}`)
        .query({ client_id: 'clientId', access_token: 'accessToken', min_tag_id: 'tag_id' })
        .reply(200, {
          pagination: {},
          data,
        });
      const stream = new InstagramStream(instagram, endpoint, {
        interval: 100,
      });
      const callSpy = jest.fn();
      stream.on('message', callSpy);
      setTimeout(() => {
        stream.stop();
        expect(scope1.isDone()).toBeTruthy();
        expect(scope2.isDone()).toBeTruthy();
        expect(callSpy.mock.calls.length).toEqual(4);
        done();
      }, 200);
    });
  });
});
