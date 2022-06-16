import { toQueryParams } from '../utils';
 
describe('utils: toQueryParams', () => {
  
  test('should be equal to given string', () => {
    const obj = {
      key2: 'val2',
      key1: 'val1',
    }
    const result = 'key2=val2&key1=val1' 
    expect(toQueryParams(obj)).toBe(result);
  });

});