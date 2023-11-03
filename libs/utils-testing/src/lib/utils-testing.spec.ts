import { getName } from './utils-testing';

describe('getName', () => {
  it('should work', () => {
    expect(getName()).toEqual('utils-testing');
  });
});
