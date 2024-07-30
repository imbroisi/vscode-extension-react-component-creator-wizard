import * as vscode from 'vscode';
import { trimString } from '../utils';

const writeContentToFile = (filePath: string, fileContent: string) => {
  const fileUri = vscode.Uri.file(filePath);
  const writeOperation = new vscode.WorkspaceEdit();
  writeOperation.createFile(fileUri, { ignoreIfExists: true });
  writeOperation.insert(fileUri, new vscode.Position(0, 0), fileContent);
  vscode.workspace.applyEdit(writeOperation);
}

const createComponentFile = (uri: vscode.Uri, componentName: string, componentStyle: string) => {
  const filePath = `${uri.fsPath}/${componentName}/${componentName}.tsx`;
  let fileContent = '';

  switch (componentStyle) {
    case 'Styled Components':
      fileContent = `
        import { Container } from \'./${componentName}.styles\';

        export default function ${componentName} () {
          return (
            <Container>
              <h1>${componentName}!</h1>
            </Container>
          );
        } 
      `;
      break;
    case 'TailwindCSS':
      fileContent = `
        export default function ${componentName} () {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <h1>${componentName}!</h1>
            </div>
          );
        } 
      `;
      break;
      case 'CSS':
        fileContent = `
          import './${componentName}.css';

          export default function ${componentName} () {
            return (
              <div className="main">
                <h1>${componentName}!</h1>
              </div>
            );
          } 
        `;
        break;
  }

  writeContentToFile(filePath, trimString(fileContent));
}

const createStylesFile = (uri: vscode.Uri, componentName: string, componentStyle: string) => {
  let filePath = '';
  let fileContent = '';

  switch (componentStyle) {
    case 'Styled Components':
      filePath = `${uri.fsPath}/${componentName}/${componentName}.styles.ts`;
      fileContent = `
        import styled from 'styled-components';

        export const Container = styled.div\`
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100%;
        \`;
      `;
      break;
    case 'TailwindCSS':
      return;
    case 'CSS':
      filePath = `${uri.fsPath}/${componentName}/${componentName}.css`;
      fileContent = `
        .main {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100%;
        }
      `;
      break;
  }

  writeContentToFile(filePath, trimString(fileContent));
}

const createTestsFile = (uri: vscode.Uri, componentName: string) => {
  const filePath = `${uri.fsPath}/${componentName}/${componentName}.test.tsx`;
  const fileContent = `
    import { render } from '@testing-library/react';
    import ${componentName} from './${componentName}';

    describe('${componentName} component', () => {
      test('should render ${componentName}', () => {
        render(
          <${componentName} />
        );

        const headingElement = screen.getByRole('heading', { level: 1 });
        expect(headingElement).toBeInTheDocument();
        expect(headingElement).toHaveTextContent('${componentName}!');
      });

    });
  `;

  writeContentToFile(filePath, trimString(fileContent));
}

const createIndexFile = (uri: vscode.Uri, componentName: string) => {
  const filePath = `${uri.fsPath}/${componentName}/index.tsx`;
  const fileContent = `
    /* istanbul ignore file */
    export { default } from \'./${componentName}\';
  `;

  writeContentToFile(filePath, trimString(fileContent));
}

export const createComponent = (uri: vscode.Uri, componentName: string, componentStyle: string) => {
  createIndexFile(uri, componentName);
  createComponentFile(uri, componentName, componentStyle);
  createStylesFile(uri, componentName, componentStyle);
  createTestsFile(uri, componentName);
}
