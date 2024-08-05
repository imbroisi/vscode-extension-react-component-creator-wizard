import * as vscode from 'vscode';
import createAllFiles from './components/main';
import { appData, ASK_ON_COMPONENT_CREATION } from './data/appData';
// import { validateComponentName } from './utils/validateComponentName';
import { getComponentName } from './extensionFiles/getComponentName';
import { activateExtensions } from './extensionFiles/activateExtensions';

export interface OptionsSelected {
  [key: string]: string
}

// async function XXXactivateExtensions(
//   context: vscode.ExtensionContext,
//   type: string,
// ) {

//   // get the options previous selected, if exists
//   let previousSelections: any = context.globalState.get<Record<string, OptionsSelected>>('optionsSelected');
//   if (!previousSelections) {
//     previousSelections = {};
//     appData.forEach((data) => {
//       previousSelections[data.id] = data.options[0];
//     });
//   }

//   // prompt the user to select the options
//   const optionsSelected: any = { ...previousSelections };
//   for (let data of appData) {
//     const { id, question, options, include_option_ask_on_component_creation } = data;
//     const previousSelection: any = previousSelections?.[id];

//     const displayOption = [...options];
//     if (type === 'setup') {
//       if (include_option_ask_on_component_creation) {
//         displayOption.push(ASK_ON_COMPONENT_CREATION);
//       }
//     }

//     if (typeof previousSelection === 'string') {
//       const index = displayOption.indexOf(previousSelection);
//       if (index > -1) {
//         displayOption.splice(index, 1);
//         if (type === 'setup' || include_option_ask_on_component_creation) {
//           displayOption.unshift(previousSelection);
//         }
//       }
//       if (type === 'create') {
//         if (previousSelection !== ASK_ON_COMPONENT_CREATION) {
//           continue;
//         }
//       }
//     }

//     const selectedOption = await vscode.window.showQuickPick(displayOption, {
//       placeHolder: question,
//     });

//     if (!selectedOption) {
//       vscode.window.showInformationMessage('No option selected');
//       return;
//     }

//     optionsSelected[id] = selectedOption;
//   }

//   // save the selected options
//   if (type === 'setup') {
//     try {
//       context.globalState.update('optionsSelected', optionsSelected);
//     } catch (error) {
//       vscode.window.showErrorMessage(`Error saving the selected options: ${error}`);
//       return;
//     }
//   }

//   return optionsSelected;
// }

export function activate(context: vscode.ExtensionContext) {
  //const create = 
  vscode.commands.registerCommand('extension.createReactComponentWizard', async (uri: vscode.Uri) => {

    const { name, error } = await getComponentName(uri);
    if (error) {
      vscode.window.showInformationMessage(error);
      return;
    }
    
    const optionsSelected = await activateExtensions(context, 'create');

    createAllFiles(uri, name || '', optionsSelected);

  });

  // const setup = 
  vscode.commands.registerCommand('extension.createReactComponentWizardCustomize', (uri: vscode.Uri) => {
    activateExtensions(context, 'setup');
  });

  // context.subscriptions.push(create);
  // context.subscriptions.push(setup);
  
}

export function deactivate() { }
