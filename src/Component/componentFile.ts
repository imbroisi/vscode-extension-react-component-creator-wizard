import * as vscode from 'vscode';
import { replaceTags, writeContentToFile } from '../utils';
import { OptionsSelected } from '../extension';
import componentStyledComponent from '../models/component.styledComponents';
import componentTailwind from '../models/component.tailwind';
import componentCss from '../models/component.css';

export const createComponentFile = async (
  uri: vscode.Uri,
  componentName: string,
  optionsSelected: OptionsSelected
) => {
  const componentChoosen = {
    'Styled Components': componentStyledComponent,
    Tailwind: componentTailwind,
    CSS: componentCss,
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
