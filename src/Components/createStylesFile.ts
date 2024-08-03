import * as vscode from 'vscode';
import { replaceTags } from '../utils/replaceTags';
import { writeContentToFile } from '../utils/writeContentToFile';
import { OptionsSelected } from '../extension';
import modelStyleCss from '../models/model.style_css';
import modelStyleStyledComponent from '../models/model.style_styledComponents';
import modelStyleSassScss from '../models/model.style_sass_scss';
import modelStyleSassIdented from '../models/model.style_sass_idented';

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
    case 'SCSS':
      filePath = `${uri.fsPath}/${name}/${name}.scss`;
      fileContent = replaceTags({
        optionsSelected,
        component: modelStyleSassScss,
        name,
      });
      break;
    case 'Sass (Indented Syntax)':
      filePath = `${uri.fsPath}/${name}/${name}.sass`;
      fileContent = replaceTags({
        optionsSelected,
        component: modelStyleSassIdented,
        name,
      });
      break;
    default:
      return;
  }

  await writeContentToFile(filePath, fileContent);
};
