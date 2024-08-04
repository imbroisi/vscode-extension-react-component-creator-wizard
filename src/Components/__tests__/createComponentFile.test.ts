import * as vscode from 'vscode';
import { createComponentFile } from '../createComponentFile';
import { writeContentToFile } from '../../utils/writeContentToFile';

jest.mock('../../utils/writeContentToFile', () => ({
  writeContentToFile: jest.fn(),
}));

describe('createComponentFile', () => {
  const uri = {
    fsPath: '/path/to/file'
  } as vscode.Uri;
  const name = 'MyComponent';

  it('should create component file with Styled Components, TypeScript', async () => {
    const optionsSelected = {
      style: 'Styled Components',
      language: 'TypeScript',
      testing: 'inside',
    };
    const expectedFileContent =
    `import { Container } from './MyComponent.styles';\n` +
    '\n' +
    'export interface MyComponentProps {\n' +
    '\n' +
    '}\n' +
    '\n' +
    'export default function MyComponent(props: MyComponentProps) {\n' +
    '  return (\n' +
    '    <Container>\n' +
    '      <h1>Hello</h1>\n' +
    '    </Container>\n' +
    '  );\n' +
    '}\n';

  const expectedFilePath = '/path/to/file/MyComponent/MyComponent.tsx';
  const result = await createComponentFile(uri, name, optionsSelected);

  expect(result).toBe(expectedFilePath);
  expect(writeContentToFile).toHaveBeenCalledWith(expectedFilePath, expectedFileContent);
});

  it('should create component file with Styled Components, JavaScript', async () => {
    const optionsSelected = {
      style: 'Styled Components',
      language: 'JavaScript',
      testing: 'inside',
    };
    const expectedFileContent =
      `import { Container } from './MyComponent.styles';\n` +
      '\n' +
      'export default function MyComponent() {\n' +
      '  return (\n' +
      '    <Container>\n' +
      '      <h1>Hello</h1>\n' +
      '    </Container>\n' +
      '  );\n' +
      '}\n';

    const expectedFilePath = '/path/to/file/MyComponent/MyComponent.jsx';
    const result = await createComponentFile(uri, name, optionsSelected);

    expect(result).toBe(expectedFilePath);
    expect(writeContentToFile).toHaveBeenCalledWith(expectedFilePath, expectedFileContent);
  });

  it('should create component file with Tailwind, TypeScript', async () => {
    const optionsSelected = {
      style: 'Tailwind',
      language: 'TypeScript',
      testing: 'ouside',
    };
    const expectedFileContent =
      'export interface MyComponentProps {\n' +
      '\n' +
      '}\n' +
      '\n' +
      'export default function MyComponent(props: MyComponentProps) {\n' +
      '  return (\n' +
      '    <div className=\"flex items-center justify-center\">\n' +
      '      <h1>Hello</h1>\n' +
      '    </div>\n' +
      '  );\n' +
      '}\n';

    const expectedFilePath = '/path/to/file/MyComponent/MyComponent.tsx';
    const result = await createComponentFile(uri, name, optionsSelected);

    expect(result).toBe(expectedFilePath);
    expect(writeContentToFile).toHaveBeenCalledWith(expectedFilePath, expectedFileContent);
  });

  it('should create component file with SCSS, JavaScript', async () => {
    const optionsSelected = {
      style: 'SCSS',
      language: 'JavaScript',
      testing: 'ouside',
      function: 'Arrow function',
    };
    const expectedFileContent =
      'import \'./MyComponent.scss\';\n' +
      '\n' +
      'const MyComponent = () => {\n' +
      '  return (\n' +
      '    <div>\n' +
      '      <h1>Hello</h1>\n' +
      '    </div>\n' +
      '  );\n' +
      '}\n' +
      '\n' +
      'export default MyComponent;\n';

    const expectedFilePath = '/path/to/file/MyComponent/MyComponent.jsx';
    const result = await createComponentFile(uri, name, optionsSelected);

    expect(result).toBe(expectedFilePath);
    expect(writeContentToFile).toHaveBeenCalledWith(expectedFilePath, expectedFileContent);
  });

  it('should create component file with SASS, TypeScript', async () => {
    const optionsSelected = {
      style: 'Sass (Indented Syntax)',
      language: 'TypeScript',
      testing: 'ouside',
    };
    const expectedFileContent =
      'import \'./MyComponent.sass\';\n' +
      '\n' +
      'export interface MyComponentProps {\n' +
      '\n' +
      '}\n' +
      '\n' +
      'export default function MyComponent(props: MyComponentProps) {\n' +
      '  return (\n' +
      '    <div>\n' +
      '      <h1>Hello</h1>\n' +
      '    </div>\n' +
      '  );\n' +
      '}\n';

    const expectedFilePath = '/path/to/file/MyComponent/MyComponent.tsx';
    const result = await createComponentFile(uri, name, optionsSelected);

    expect(result).toBe(expectedFilePath);
    expect(writeContentToFile).toHaveBeenCalledWith(expectedFilePath, expectedFileContent);
  });

  it('should create component file with CSS, JavaScript, no semicolon', async () => {
    const optionsSelected = {
      style: 'CSS',
      language: 'JavaScript',
      testing: 'ouside',
      withSemicolon: 'No',
    };
    const expectedFileContent =
      'import \'./MyComponent.css\'\n' +
      '\n' +
      'export default function MyComponent() {\n' +
      '  return (\n' +
      '    <div className="main">\n' +
      '      <h1>Hello</h1>\n' +
      '    </div>\n' +
      '  )\n' +
      '}\n';

    const expectedFilePath = '/path/to/file/MyComponent/MyComponent.jsx';
    const result = await createComponentFile(uri, name, optionsSelected);

    expect(result).toBe(expectedFilePath);
    expect(writeContentToFile).toHaveBeenCalledWith(expectedFilePath, expectedFileContent);
  });
});

