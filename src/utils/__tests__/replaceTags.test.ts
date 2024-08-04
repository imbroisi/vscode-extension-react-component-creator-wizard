import { replaceTags } from '../replaceTags';

describe('replaceTags', () => {
  it('should replace tags correctly', () => {
    const funcProps = {
      optionsSelected: {
        testing: 'inside',
        language: 'TypeScript',
        withSemicolon: 'Yes',
        function: 'Arrow function'
      },
      component: 'Hello {{FUNCTION_TYPE}}',
      name: 'World'
    };

    const expectedOutput = 'Hello const World = (props: WorldProps) => {';
    const result = replaceTags(funcProps);

    expect(result).toBe(expectedOutput);
  });

  it('should replace tags correctly when testing is outside', () => {
    const funcProps = {
      optionsSelected: {
        testing: 'outside',
        language: 'TypeScript',
        withSemicolon: 'Yes',
        function: 'Arrow function'
      },
      component: 'Hello {{FUNCTION_TYPE}}',
      name: 'World'
    };

    const expectedOutput = 'Hello const World = (props: WorldProps) => {';
    const result = replaceTags(funcProps);

    expect(result).toBe(expectedOutput);
  });

  it('should replace tags correctly when language is JavaScript', () => {
    const funcProps = {
      optionsSelected: {
        testing: 'inside',
        language: 'JavaScript',
        withSemicolon: 'Yes',
        function: 'Arrow function'
      },
      component: 'Hello {{FUNCTION_TYPE}}',
      name: 'World'
    };

    const expectedOutput = 'Hello const World = () => {';
    const result = replaceTags(funcProps);

    expect(result).toBe(expectedOutput);
  });

  it('should replace tags correctly when withSemicolon is No', () => {
    const funcProps = {
      optionsSelected: {
        testing: 'inside',
        language: 'TypeScript',
        withSemicolon: 'No',
        function: 'Arrow function'
      },
      component: 'Hello {{FUNCTION_TYPE}}',
      name: 'World'
    };

    const expectedOutput = 'Hello const World = (props: WorldProps) => {';
    const result = replaceTags(funcProps);

    expect(result).toBe(expectedOutput);
  });

  it('should replace tags correctly when function is Function', () => {
    const funcProps = {
      optionsSelected: {
        testing: 'inside',
        language: 'TypeScript',
        withSemicolon: 'Yes',
        function: 'Function'
      },
      component: 'Hello {{FUNCTION_TYPE}}',
      name: 'World'
    };

    const expectedOutput = 'Hello export default function World(props: WorldProps) {';
    const result = replaceTags(funcProps);

    expect(result).toBe(expectedOutput);
  });
});
