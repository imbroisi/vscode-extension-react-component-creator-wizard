import * as vscode from 'vscode';
import { writeContentToFile } from '../utils';
import { OptionsSelected } from '../extension';

export const createStylesFile = async (uri: vscode.Uri, componentName: string, optionsSelected: OptionsSelected) => {
  const semicolon = optionsSelected.semicolon === 'No' ? '' : ';';
  let filePath = '';
  let fileContent = '';

  switch (optionsSelected.style) {
    case 'Styled Components':
      const fileExtension = optionsSelected.language === 'TypeScript' ? 'ts' : 'js';
      filePath = `${uri.fsPath}/${componentName}/${componentName}.styles.${fileExtension}`;
      fileContent = `
          import styled from 'styled-components'${semicolon}
  
          export const Container = styled.div\`
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100%;
          \`${semicolon}
        `;
      break;
    case 'Tailwind':
      return;
    case 'CSS':
      filePath = `${uri.fsPath}/${componentName}/${componentName}.css`;
      fileContent = `
          .main {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100%;
          }
        `;
      break;
  }

  await writeContentToFile(filePath, fileContent);
};