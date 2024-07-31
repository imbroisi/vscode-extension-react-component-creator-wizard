import * as vscode from 'vscode';
import { writeContentToFile } from '../utils';
import { OptionsSelected } from '../extension';

export const createTestsFile = (uri: vscode.Uri, componentName: string, optionsSelected: OptionsSelected) => {
  if (optionsSelected.testing === 'No'){
    return;
  }

  const testDirectoryPath = optionsSelected.testing.indexOf('inside') === -1 ? '' : '__tests__/';
  const semicolon = optionsSelected.semicolon === 'No' ? '' : ';';
  const fileExtension = optionsSelected.language === 'TypeScript' ? 'tsx' : 'jsx';
  
  const filePath = `${uri.fsPath}/${componentName}/${testDirectoryPath}${componentName}.test.${fileExtension}`;
  const fileContent = `
    import { render } from '@testing-library/react'${semicolon}
    import ${componentName} from './${componentName}'${semicolon}

    describe('${componentName} component', () => {
      test('should render ${componentName}', () => {
        render(
          <${componentName} />
        )${semicolon}

        const headingElement = screen.getByRole('heading', { level: 1 })${semicolon}
        expect(headingElement).toBeInTheDocument()${semicolon}
        expect(headingElement).toHaveTextContent('${componentName}!')${semicolon}
      })${semicolon}

    })${semicolon}
  `;

  writeContentToFile(filePath, fileContent);
};