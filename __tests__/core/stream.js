import Stream from '../../src/core/stream';

describe('Stream', () => {
  it('should be a class', () => {
    const stream = new Stream({
      runOnCreation: false,
    });
    expect(stream instanceof Stream).toBeTruthy();
  });

  describe('#constructor', () => {
    it('should set cache', () => {
      const stream = new Stream({
        runOnCreation: false,
      });
      expect(stream.cache).toEqual([]);
    });
  });

  describe('#start', () => {
    it('should call stop', () => {
      const stream = new Stream({
        runOnCreation: false,
      });
      stream.saveStop = stream.stop;
      stream.stop = jest.fn();
      stream.makeRequest = jest.fn();
      stream.start();
      stream.saveStop();
      expect(stream.stop.mock.calls.length).toEqual(1);
      expect(stream.makeRequest.mock.calls.length).toEqual(1);
    });

    it('should call makeRequest', () => {
      const stream = new Stream({
        runOnCreation: false,
      });
      stream.makeRequest = jest.fn();
      stream.start();
      stream.stop();
      expect(stream.makeRequest.mock.calls.length).toEqual(1);
    });

    it('should set startDate', () => {
      const stream = new Stream({
        runOnCreation: false,
      });
      stream.makeRequest = jest.fn();
      const date = new Date();
      stream.start();
      stream.stop();
      expect(date.getTime()).toEqual(date.getTime());
      expect(stream.makeRequest.mock.calls.length).toEqual(1);
    });

    it('should set intervalId', () => {
      const stream = new Stream({
        runOnCreation: false,
      });
      stream.makeRequest = jest.fn();
      stream.start();
      expect(stream.intervalId).toBeTruthy();
      stream.stop();
      expect(stream.makeRequest.mock.calls.length).toEqual(1);
    });
  });

  describe('#stop', () => {
    it('should clear intervalId', () => {
      const stream = new Stream({
        runOnCreation: false,
      });
      stream.makeRequest = jest.fn();
      stream.start();
      expect(stream.intervalId).toBeTruthy();
      stream.stop();
      expect(stream.intervalId._onTimeout) // eslint-disable-line no-underscore-dangle
        .not.toBeTruthy();
      expect(stream.makeRequest.mock.calls.length).toEqual(1);
    });
  });
});
