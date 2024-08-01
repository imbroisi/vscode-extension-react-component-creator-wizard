import * as vscode from 'vscode';
import { replaceTags, writeContentToFile } from '../utils';
import { OptionsSelected } from '../extension';
import testModel from '../models/test';


export const createTestsFile = async (uri: vscode.Uri, componentName: string, optionsSelected: OptionsSelected) => {
  if (optionsSelected.testing === 'No'){
    return;
  }

  const testDirectoryPath = optionsSelected.testing.indexOf('inside') === -1 ? '' : '__tests__/';
  const withSemicolon = optionsSelected.withSemicolon !== 'No';
  const isTypescript = optionsSelected.language === 'TypeScript';
  const testParentPath = optionsSelected.testing.indexOf('inside') === -1 ? '.' : '..';
  
  const fileContent = replaceTags(
    testModel, 
    componentName, 
    withSemicolon, 
    isTypescript,
    testParentPath,
  );

  // const fileContent = `
  //   import { render } from '@testing-library/react'${semicolon}
  //   import ${componentName} from './${componentName}'${semicolon}

  //   describe('${componentName} component', () => {
  //     test('should render ${componentName}', () => {
  //       render(
  //         <${componentName} />
  //       )${semicolon}

  //       const headingElement = screen.getByRole('heading', { level: 1 })${semicolon}
  //       expect(headingElement).toBeInTheDocument()${semicolon}
  //       expect(headingElement).toHaveTextContent('${componentName}!')${semicolon}
  //     })${semicolon}

  //   })${semicolon}
  // `;

  const fileExtension = optionsSelected.language === 'TypeScript' ? 'tsx' : 'jsx';
  const filePath = `${uri.fsPath}/${componentName}/${testDirectoryPath}${componentName}.test.${fileExtension}`;

  await writeContentToFile(filePath, fileContent);
};