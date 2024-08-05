import * as vscode from 'vscode';
import { replaceTags } from '../utils/replaceTags';
import { writeContentToFile } from '../utils/writeContentToFile';
import modelTest from '../models/model.testModel';
import { OptionsSelected } from '../extension';

export const createTestsFile = async (uri: vscode.Uri, name: string, optionsSelected: OptionsSelected) => {
  if (optionsSelected.testing === 'No'){
    return;
  }

  const testDirectoryPath = optionsSelected.testing.indexOf('inside') === -1 ? '' : '__tests__/';
  
  const fileContent = replaceTags({
    optionsSelected,
    name, 
    component: modelTest, 
  });

  const fileExtension = optionsSelected.language === 'TypeScript' ? 'tsx' : 'jsx';
  const filePath = `${uri.fsPath}/${name}/${testDirectoryPath}${name}.test.${fileExtension}`;

  await writeContentToFile(filePath, fileContent);
};