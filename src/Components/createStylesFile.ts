import * as vscode from 'vscode';
import { replaceTags } from '../utils/replaceTags';
import { writeContentToFile } from '../utils/writeContentToFile';
import { OptionsSelected } from '../extension';
import modelStyleCss from '../models/model.style_css';
import modelStyleStyledComponent from '../models/model.style_styledComponents';

export const createStylesFile = async (uri: vscode.Uri, name: string, optionsSelected: OptionsSelected) => {
  let filePath;
  let fileContent;

  switch (optionsSelected.style) {
    case 'Styled Components':
      const fileExtension = optionsSelected.language === 'TypeScript' ? 'ts' : 'js';
      filePath = `${uri.fsPath}/${name}/${name}.styles.${fileExtension}`;
      fileContent = replaceTags({
        optionsSelected,
        component: modelStyleStyledComponent,
        name, 
      }); 
      break;
    case 'Tailwind':
      return;
    case 'CSS':
      filePath = `${uri.fsPath}/${name}/${name}.css`;
      fileContent = replaceTags({
        optionsSelected,
        component: modelStyleCss,
        name,
      });
      break;
    default:
      return;
  }

  await writeContentToFile(filePath, fileContent);
};