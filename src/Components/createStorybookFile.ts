import * as vscode from 'vscode';
import { replaceTags } from '../utils/replaceTags';
import { writeContentToFile } from '../utils/writeContentToFile';
import { OptionsSelected } from '../extension';
import modelStorybook from '../models/model.storybook';

export const createStorybookFile = async (uri: vscode.Uri, name: string, optionsSelected: OptionsSelected) => {
  if (optionsSelected.storybook === 'No') {
    return;
  }

  const fileContent = replaceTags({
    optionsSelected,
    component: modelStorybook,
    name,
  });
  
  const fileExtension = optionsSelected.language === 'TypeScript' ? 'tsx' : 'jsx';
  const filePath = `${uri.fsPath}/${name}/${name}.stories.${fileExtension}`;

  await writeContentToFile(filePath, fileContent);
};
