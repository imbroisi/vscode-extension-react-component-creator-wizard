import * as vscode from 'vscode';
import { replaceTags, writeContentToFile } from '../utils';
import { OptionsSelected } from '../extension';
import componentStyledComponent from '../models/model.component.styledComponents';
import modelComponentTailwind from '../models/model.component.tailwind';
import modelComponentCss from '../models/model.component.css';

export const createComponentFile = async (
  uri: vscode.Uri,
  componentName: string,
  optionsSelected: OptionsSelected
) => {
  const componentChoosen = {
    'Styled Components': componentStyledComponent,
    Tailwind: modelComponentTailwind,
    CSS: modelComponentCss,
  }[optionsSelected.style] || componentStyledComponent;

  const withSemicolon = optionsSelected.withSemicolon !== 'No';
  const isTypescript = optionsSelected.language === 'TypeScript';

  const fileContent = replaceTags(
    componentChoosen, 
    componentName, 
    withSemicolon, 
    isTypescript,
  );  
  const fileExtension = isTypescript ? 'tsx' : 'jsx';
  const filePath = `${uri.fsPath}/${componentName}/${componentName}.${fileExtension}`;

  await writeContentToFile(filePath, fileContent);

  return filePath;
};
