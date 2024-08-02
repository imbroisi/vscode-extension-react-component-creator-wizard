
import * as vscode from 'vscode';
import { replaceTags } from '../utils/replaceTags';
import { writeContentToFile } from '../utils/writeContentToFile';
import modelIndexFile from '../models/model.index';
import { OptionsSelected } from '../extension';

export const createIndexFile = async (uri: vscode.Uri, name: string, optionsSelected: OptionsSelected) => {
    const fileContent = replaceTags({
      optionsSelected,
      component: modelIndexFile, 
      name,
    });
    const fileExtension = optionsSelected.language === 'TypeScript' ? 'tsx' : 'jsx';
    const filePath = `${uri.fsPath}/${name}/index.${fileExtension}`;
  
    await writeContentToFile(filePath, fileContent);
  };
  