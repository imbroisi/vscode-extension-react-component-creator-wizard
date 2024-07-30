import * as vscode from 'vscode';
import { createComponent } from './Component';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.createReactElement', async (uri: vscode.Uri) => {
    const options = [
      'Component', 
      'Hook', 
      'Context',
    ];
    const selectedOption = await vscode.window.showQuickPick(options, {
      placeHolder: 'Choose the type of React element you want to create',
    });

    if (!selectedOption) {
      vscode.window.showInformationMessage('No option selected');
      return;
    }
    
    let subOptions: string[] = [];
    let placeHolder: string = '';
    switch (selectedOption) {
      case 'Component':
        subOptions = ['Styled Components', 'TailwindCSS', 'CSS'];
        placeHolder = 'Choose the style type for the component';
        break;
      case 'Hook':
        subOptions = ['Sub Option 2.1', 'Sub Option 2.2'];
        placeHolder = '???? Choose a style type for the component';
        break;
      case 'Context':
        subOptions = ['Sub Option 3.1', 'Sub Option 3.2'];
        placeHolder = '???? Choose a style type for the component';
        break;
    }

    const selectedSubOption = await vscode.window.showQuickPick(subOptions, {
      placeHolder,
    });

    if (!selectedSubOption) {
      vscode.window.showInformationMessage('No sub-option selected');
      return;
    }

    if (selectedOption === 'Component') {
      // Create a new file with the selected style type
      const componentName = await vscode.window.showInputBox({
        placeHolder: 'Enter the Component name',
      });

      if (!componentName) {
        vscode.window.showInformationMessage('No file name entered');
        return;
      }

      createComponent(uri, componentName, selectedSubOption);


//       const fileExtension = selectedSubOption === 'Styled Components' ? 'tsx' : 'jsx';
//       const filePath = `${uri.fsPath}/${fileName}/${fileName}.${fileExtension}`;
//       const fileContent =
// `import React from 'react';

// // OK!!!!!
// `;
//         const fileUri = vscode.Uri.file(filePath);
//         const writeOperation = new vscode.WorkspaceEdit();
//         writeOperation.createFile(fileUri, { ignoreIfExists: true });
//         writeOperation.insert(fileUri, new vscode.Position(0, 0), fileContent);
//         vscode.workspace.applyEdit(writeOperation);
      }
      

    vscode.window.showInformationMessage(`You selected: ${selectedOption} -> ${selectedSubOption}`);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
