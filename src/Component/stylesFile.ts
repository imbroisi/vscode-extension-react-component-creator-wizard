import * as vscode from 'vscode';
import { replaceTags, writeContentToFile } from '../utils';
import { OptionsSelected } from '../extension';
import styleFileCss from '../models/style.css';
import styleFileStyledComponent from '../models/style.styledComponents';


export const createStylesFile = async (uri: vscode.Uri, componentName: string, optionsSelected: OptionsSelected) => {
  const withSemicolon = optionsSelected.withSemicolon !== 'No';
  const isTypescript = optionsSelected.language === 'TypeScript';

  let filePath = '';
  let fileContent = '';


  switch (optionsSelected.style) {
    case 'Styled Components':
      const fileExtension = optionsSelected.language === 'TypeScript' ? 'ts' : 'js';
      filePath = `${uri.fsPath}/${componentName}/${componentName}.styles.${fileExtension}`;
      fileContent = replaceTags(styleFileStyledComponent, componentName, withSemicolon, isTypescript); 
      break;
    case 'Tailwind':
      return;
    case 'CSS':
      filePath = `${uri.fsPath}/${componentName}/${componentName}.css`;
      fileContent = replaceTags(styleFileCss, componentName, withSemicolon, isTypescript);
      break;
  }

  await writeContentToFile(filePath, fileContent);
};