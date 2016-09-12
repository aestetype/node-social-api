import * as lib from '../src/index';

describe('lib', () => {
  it('should be an object', () => {
    expect(typeof lib).toEqual('object');
  });

  it('should export Twitter', () => {
    expect(lib.Twitter).toBeTruthy();
  });

  it('should export Instagram', () => {
    expect(lib.Instagram).toBeTruthy();
  });

  it('should export Facebook', () => {
    expect(lib.Facebook).toBeTruthy();
  });

  it('should export Tumblr', () => {
    expect(lib.Tumblr).toBeTruthy();
  });

  it('should export Github', () => {
    expect(lib.Github).toBeTruthy();
  });
});
