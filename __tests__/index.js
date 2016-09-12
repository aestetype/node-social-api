import * as lib from '../src/index';

describe('lib', () => {
  it('should be an object', () => {
    expect(typeof lib).toEqual('object');
  });

  it('should export with default object', () => {
    expect(typeof lib.default).toEqual('object');
  });

  it('should export Twitter', () => {
    expect(lib.default.Twitter).toBeTruthy();
  });

  it('should export Instagram', () => {
    expect(lib.default.Instagram).toBeTruthy();
  });

  it('should export Facebook', () => {
    expect(lib.default.Facebook).toBeTruthy();
  });

  it('should export Tumblr', () => {
    expect(lib.default.Tumblr).toBeTruthy();
  });

  it('should export Github', () => {
    expect(lib.default.Github).toBeTruthy();
  });
});
