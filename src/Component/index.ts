import * as vscode from 'vscode';
import { writeContentToFile } from '../utils';
import { createStylesFile } from './stylesFile';
import { createComponentFile } from './componentFile';
import { createTestsFile } from './testsFile';
import { OptionsSelected } from '../extension';
import { createStorybookFile } from './storybookFile';

const createIndexFile = (uri: vscode.Uri, componentName: string, optionsSelected: OptionsSelected) => {
  const semicolon = optionsSelected.semicolon === 'No' ? '' : ';';
  const fileExtension = optionsSelected.language === 'TypeScript' ? 'tsx' : 'jsx';
  const filePath = `${uri.fsPath}/${componentName}/index.${fileExtension}`;
  const fileContent = `
    /* istanbul ignore file */
    export { default } from \'./${componentName}\'${semicolon}
  `;

  console.log('POS 1.4 fileContent ->', fileContent);

  writeContentToFile(filePath, fileContent);
}

export const createComponent = (uri: vscode.Uri, componentName: string, optionsSelected: OptionsSelected) => {
  console.log('POS 1.3 optionsSelected ->', optionsSelected);

  createIndexFile(uri, componentName, optionsSelected);
  console.log('POS 1.5 optionsSelected ->', optionsSelected);

  createComponentFile(uri, componentName, optionsSelected);
  createStylesFile(uri, componentName, optionsSelected);
  createTestsFile(uri, componentName, optionsSelected);
  createStorybookFile(uri, componentName, optionsSelected);
}
