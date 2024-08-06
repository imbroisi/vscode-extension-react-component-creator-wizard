import { isValidComponentName } from '../validateComponentName';

describe('isValidComponentName', () => {
  test('should return true for valid component names', () => {
    expect(isValidComponentName('MyComponent')).toBe(true);
    expect(isValidComponentName('Component123')).toBe(true);
    expect(isValidComponentName('Another_$Component')).toBe(true);
  });

  test('should return false for invalid component names', () => {
    expect(isValidComponentName('component')).toBe(false);
    expect(isValidComponentName('123Component')).toBe(false);
    expect(isValidComponentName('_Component')).toBe(false);
    expect(isValidComponentName('$Component')).toBe(false);
  });
});
