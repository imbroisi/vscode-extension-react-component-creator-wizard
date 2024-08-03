import { validateComponentName } from '../validateComponentName';

describe('validateComponentName', () => {
  it('should return true for valid component names', () => {
    expect(validateComponentName('Component')).toBe(true);
    expect(validateComponentName('MyComponent')).toBe(true);
    expect(validateComponentName('Component123')).toBe(true);
  });

  it('should return false for invalid component names', () => {
    expect(validateComponentName('component')).toBe(false);
    expect(validateComponentName('123Component')).toBe(false);
    expect(validateComponentName('Component-123')).toBe(false);
    expect(validateComponentName('Component Name')).toBe(false);
  });
});
