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
  const optionsSelected = {
    style: 'Styled Components',
    language: 'TypeScript',
    testing: 'inside',
  };

  it('should create component file with correct content', async () => {

    const expectedFileContent = 
`import { Container } from './MyComponent.styles';\n
export interface MyComponentProps {\n
}\n
export default function MyComponent(props: MyComponentProps) {
  return (
    <Container>
      <h1>Hello</h1>
    </Container>
  );
}
`;
    
    const expectedFilePath = '/path/to/file/MyComponent/MyComponent.tsx';
    const result = await createComponentFile(uri, name, optionsSelected);

    expect(result).toBe(expectedFilePath);    
    expect(writeContentToFile).toHaveBeenCalledWith(expectedFilePath, expectedFileContent);
  });
});
