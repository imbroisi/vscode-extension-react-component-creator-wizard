
import * as vscode from 'vscode';
import { replaceTags, writeContentToFile } from '../utils';
import indexFile from '../models/indexFile';
import { OptionsSelected } from '../extension';

export const createIndexFile = async (uri: vscode.Uri, componentName: string, optionsSelected: OptionsSelected) => {
    const withSemicolon = optionsSelected.withSemicolon !== 'No';
    const isTypescript = optionsSelected.language === 'TypeScript';
  
    const fileContent = replaceTags(indexFile, componentName, withSemicolon, isTypescript);
  
    const fileExtension = optionsSelected.language === 'TypeScript' ? 'tsx' : 'jsx';
    const filePath = `${uri.fsPath}/${componentName}/index.${fileExtension}`;
  
    await writeContentToFile(filePath, fileContent);
  };
  