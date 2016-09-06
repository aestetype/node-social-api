import { assert } from 'chai';
import * as lib from '../src/index';

describe('lib', () => {
  it('should be an object', () => {
    assert.ok(lib instanceof Object);
  });

  it('should export with default object', () => {
    assert.ok(lib.default instanceof Object);
  });

  it('should export Twitter', () => {
    assert.ok(lib.default.Twitter);
  });

  it('should export Instagram', () => {
    assert.ok(lib.default.Instagram);
  });
});
