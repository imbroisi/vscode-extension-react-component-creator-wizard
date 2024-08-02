import * as vscode from 'vscode';
import { replaceTags, writeContentToFile } from '../utils';
import { OptionsSelected } from '../extension';
import modelTest from '../models/model.test';

export const createTestsFile = async (uri: vscode.Uri, name: string, optionsSelected: OptionsSelected) => {
  if (optionsSelected.testing === 'No'){
    return;
  }

  const testDirectoryPath = optionsSelected.testing.indexOf('inside') === -1 ? '' : '__tests__/';
  // const withSemicolon = optionsSelected.withSemicolon !== 'No';
  // const isTypescript = optionsSelected.language === 'TypeScript';
  
  const fileContent = replaceTags({
    optionsSelected,
    name, 
    component: modelTest, 
  });

  const fileExtension = optionsSelected.language === 'TypeScript' ? 'tsx' : 'jsx';
  const filePath = `${uri.fsPath}/${name}/${testDirectoryPath}${name}.test.${fileExtension}`;

  await writeContentToFile(filePath, fileContent);
};