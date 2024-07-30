import * as vscode from 'vscode';
import { writeContentToFile } from '../utils';

export const createTestsFile = (uri: vscode.Uri, componentName: string) => {
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
  
    writeContentToFile(filePath, fileContent);
  }