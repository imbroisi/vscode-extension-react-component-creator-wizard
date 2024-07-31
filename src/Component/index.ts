import * as vscode from 'vscode';
import { writeContentToFile } from '../utils';
import { createStylesFile } from './stylesFile';
import { createComponentFile } from './componentFile';
import { createTestsFile } from './testsFile';
import { OptionsSelected } from '../extension';

const createIndexFile = (uri: vscode.Uri, componentName: string, optionsSelected: OptionsSelected) => {
  const semicolon = optionsSelected.semicolon === 'No' ? '' : ';';
  const fileExtension = optionsSelected.language === 'TypeScript' ? 'tsx' : 'jsx';
  const filePath = `${uri.fsPath}/${componentName}/index.${fileExtension}`;
  const fileContent = `
    /* istanbul ignore file */
    export { default } from \'./${componentName}\'${semicolon}
  `;

  writeContentToFile(filePath, fileContent);
}

export const createComponent = (uri: vscode.Uri, componentName: string, optionsSelected: OptionsSelected) => {
  createIndexFile(uri, componentName, optionsSelected);
  createComponentFile(uri, componentName, optionsSelected);
  createStylesFile(uri, componentName, optionsSelected);
  createTestsFile(uri, componentName, optionsSelected);
}
