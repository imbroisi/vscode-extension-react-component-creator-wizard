import * as vscode from 'vscode';
import { replaceTags, writeContentToFile } from '../utils';
import { OptionsSelected } from '../extension';
import componentStyledComponent from '../models/model.component_styledComponents';
import modelComponentTailwind from '../models/model.component_tailwind';
import modelComponentCss from '../models/model.component_css';

export const createComponentFile = async (
  uri: vscode.Uri,
  name: string,
  optionsSelected: OptionsSelected
) => {
  const component = {
    'Styled Components': componentStyledComponent,
    Tailwind: modelComponentTailwind,
    CSS: modelComponentCss,
  }[optionsSelected.style] || componentStyledComponent;

  // const withSemicolon = optionsSelected.withSemicolon !== 'No';
  // const isTypescript = optionsSelected.language === 'TypeScript';

  const fileContent = replaceTags({
    optionsSelected,
    component,
    name,
    // withSemicolon, 
    // isTypescript,
});  
  const fileExtension = optionsSelected.language === 'TypeScript' ? 'tsx' : 'jsx';
  const filePath = `${uri.fsPath}/${name}/${name}.${fileExtension}`;

  await writeContentToFile(filePath, fileContent);

  return filePath;
};
