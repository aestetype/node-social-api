import * as lib from '../src/index';

describe('lib', () => {
  it('should be an object', () => {
    expect(typeof lib).toEqual('object');
  });

  it('should export Instagram', () => {
    expect(lib.Instagram).toBeTruthy();
  });
});
