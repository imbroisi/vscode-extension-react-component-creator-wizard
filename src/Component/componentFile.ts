import * as vscode from 'vscode';
import { writeContentToFile } from '../utils';
import { OptionsSelected } from '../extension';

export const createComponentFile = (uri: vscode.Uri, componentName: string, optionsSelected: OptionsSelected) => {
  const semicolon = optionsSelected.semicolon === 'No' ? '' : ';';
  const fileExtension = optionsSelected.language === 'TypeScript' ? 'tsx' : 'jsx';
  const filePath = `${uri.fsPath}/${componentName}/${componentName}.${fileExtension}`;
    let fileContent = '';
  
    switch (optionsSelected.style) {
      case 'Styled Components':
        fileContent = `
          import { Container } from \'./${componentName}.styles\'${semicolon}
  
          export default function ${componentName} () {
            return (
              <Container>
                <h1>${componentName}!</h1>
              </Container>
            )${semicolon}
          } 
        `;
        break;
      case 'Tailwind':
        fileContent = `
          export default function ${componentName} () {
            return (
              <div className="min-h-screen flex items-center justify-center">
                <h1>${componentName}!</h1>
              </div>
            )${semicolon}
          } 
        `;
        break;
        case 'CSS':
          fileContent = `
            import './${componentName}.css'${semicolon}
  
            export default function ${componentName} () {
              return (
                <div className="main">
                  <h1>${componentName}!</h1>
                </div>
              )${semicolon}
            } 
          `;
          break;
    }
  
    writeContentToFile(filePath, fileContent);
  }