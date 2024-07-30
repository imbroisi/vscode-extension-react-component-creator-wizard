import * as vscode from 'vscode';
import { writeContentToFile } from '../utils';

export const createStylesFile = (uri: vscode.Uri, componentName: string, componentStyle: string) => {
    let filePath = '';
    let fileContent = '';
  
    switch (componentStyle) {
      case 'Styled Components':
        filePath = `${uri.fsPath}/${componentName}/${componentName}.styles.ts`;
        fileContent = `
          import styled from 'styled-components';
  
          export const Container = styled.div\`
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100%;
          \`;
        `;
        break;
      case 'TailwindCSS':
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
  
    writeContentToFile(filePath, fileContent);
  }