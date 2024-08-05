import * as vscode from 'vscode';
import { replaceTags } from '../utils/replaceTags';
import { writeContentToFile } from '../utils/writeContentToFile';
import componentStyledComponent from '../models/model.component_styledComponents';
import modelComponentTailwind from '../models/model.component_tailwind';
import modelComponentCss from '../models/model.component_css';
import modelComponentScss from '../models/model.component_scss';
import modelComponentSass from '../models/model.component_sass';
import { OptionsSelected } from '../extension';

interface X {
  'Styled Components': string;
  Tailwind: string;
  CSS: string;
  SCSS: string;
  'Sass (Indented Syntax)': string;
}
  
export const createComponentFile = async (
  uri: vscode.Uri,
  name: string,
  optionsSelected: OptionsSelected
) => {
  const component = {
    'Styled Components': componentStyledComponent,
    Tailwind: modelComponentTailwind,
    CSS: modelComponentCss,
    SCSS: modelComponentScss,
    'Sass (Indented Syntax)': modelComponentSass,
  }[ optionsSelected.style as string];

  const fileContent = replaceTags({
    optionsSelected,
    component,
    name,
  });  
  const fileExtension = optionsSelected.language === 'TypeScript' ? 'tsx' : 'jsx';
  const filePath = `${uri.fsPath}/${name}/${name}.${fileExtension}`;

  await writeContentToFile(filePath, fileContent);
  
  return filePath;
};
