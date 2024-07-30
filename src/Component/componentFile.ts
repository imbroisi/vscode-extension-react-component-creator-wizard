import * as vscode from 'vscode';
import { writeContentToFile } from '../utils';

export const createComponentFile = (uri: vscode.Uri, componentName: string, componentStyle: string) => {
    const filePath = `${uri.fsPath}/${componentName}/${componentName}.tsx`;
    let fileContent = '';
  
    switch (componentStyle) {
      case 'Styled Components':
        fileContent = `
          import { Container } from \'./${componentName}.styles\';
  
          export default function ${componentName} () {
            return (
              <Container>
                <h1>${componentName}!</h1>
              </Container>
            );
          } 
        `;
        break;
      case 'TailwindCSS':
        fileContent = `
          export default function ${componentName} () {
            return (
              <div className="min-h-screen flex items-center justify-center">
                <h1>${componentName}!</h1>
              </div>
            );
          } 
        `;
        break;
        case 'CSS':
          fileContent = `
            import './${componentName}.css';
  
            export default function ${componentName} () {
              return (
                <div className="main">
                  <h1>${componentName}!</h1>
                </div>
              );
            } 
          `;
          break;
    }
  
    writeContentToFile(filePath, fileContent);
  }