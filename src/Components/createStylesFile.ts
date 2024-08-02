import * as vscode from 'vscode';
import { replaceTags, writeContentToFile } from '../utils';
import { OptionsSelected } from '../extension';
import modelStyleCss from '../models/model.style_css';
import modelStyleStyledComponent from '../models/model.style_styledComponents';

export const createStylesFile = async (uri: vscode.Uri, name: string, optionsSelected: OptionsSelected) => {
  const withSemicolon = optionsSelected.withSemicolon !== 'No';
  const isTypescript = optionsSelected.language === 'TypeScript';

  let filePath = '';
  let fileContent = '';

  switch (optionsSelected.style) {
    case 'Styled Components':
      const fileExtension = optionsSelected.language === 'TypeScript' ? 'ts' : 'js';
      filePath = `${uri.fsPath}/${name}/${name}.styles.${fileExtension}`;
      fileContent = replaceTags({
        optionsSelected,
        component: modelStyleStyledComponent,
        name, 
        // withSemicolon, 
        // isTypescript
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
        // withSemicolon,
        // isTypescript
      });
      break;
  }

  await writeContentToFile(filePath, fileContent);
};