import * as vscode from 'vscode';
import { replaceTags, writeContentToFile } from '../utils';
import { OptionsSelected } from '../extension';
import modelStorybook from '../models/model.storybook';

export const createStorybookFile = async (uri: vscode.Uri, name: string, optionsSelected: OptionsSelected) => {
  if (optionsSelected.storybook === 'No') {
    return;
  }

  // const withSemicolon = optionsSelected.withSemicolon !== 'No';
  // const isTypescript = optionsSelected.language === 'TypeScript';

  const fileContent = replaceTags({
    optionsSelected,
    component: modelStorybook,
    name,
    // withSemicolon,
    // isTypescript
  });
  
  const fileExtension = optionsSelected.language === 'TypeScript' ? 'tsx' : 'jsx';
  const filePath = `${uri.fsPath}/${name}/${name}.stories.${fileExtension}`;

  await writeContentToFile(filePath, fileContent);
};
