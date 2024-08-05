import * as vscode from 'vscode';
import createAllFiles from './components/main';
import { appData, ASK_ON_COMPONENT_CREATION } from './data/appData';
import { validateComponentName } from './utils/validateComponentName';
import { getComponentName } from './extensionHelpers/getComponentName';

export interface OptionsSelected {
  [key: string]: string
}

// const getComponentName = async (uri: vscode.Uri) => {
//   const name = await vscode.window.showInputBox({
//     placeHolder: 'Enter the Component name',
//   });

//   if (!name) {
//     return { error: 'No file name entered' };
//   }

//   const FolderPath = `${uri.fsPath}/${name}`;
//   const isPathExist = await vscode.workspace.fs.stat(vscode.Uri.file(FolderPath)).then(() => true, () => false);
//   if (isPathExist) {
//     return { error: 'Directory already exist'};
//   }
//   if (!validateComponentName(name)) {
//     return { error: 'Invalid Component name'};
//   }

//   return { name };
// };

async function commun(
  context: vscode.ExtensionContext,
  uri: vscode.Uri,
  type: string,
) {
  // get the component name if the type is 'create'
  let componentName: string | undefined = '';
  if (type === 'create') {
    const { name, error } = await getComponentName(uri);
    if (error) {
      vscode.window.showInformationMessage(error);
      return;
    }
    componentName = name;
  }

  // get the options previous selected, if exists
  let previousSelections: any = context.globalState.get<Record<string, OptionsSelected>>('optionsSelected');
  if (!previousSelections) {
    previousSelections = {};
    appData.forEach((data) => {
      previousSelections[data.id] = data.options[0];
    });
  }

  // prompt the user to select the options
  const optionsSelected: any = { ...previousSelections };
  for (let data of appData) {
    const { id, question, options, include_option_ask_on_component_creation } = data;
    const previousSelection: any = previousSelections?.[id];

    const displayOption = [...options];
    if (type === 'setup') {
      if (include_option_ask_on_component_creation) {
        displayOption.push(ASK_ON_COMPONENT_CREATION);
      }
    }

    if (typeof previousSelection === 'string') {
      const index = displayOption.indexOf(previousSelection);
      if (index > -1) {
        displayOption.splice(index, 1);
        if (type === 'setup' || include_option_ask_on_component_creation) {
          displayOption.unshift(previousSelection);
        }
      }
      if (type === 'create') {
        if (previousSelection !== ASK_ON_COMPONENT_CREATION) {
          continue;
        }
      }
    }

    const selectedOption = await vscode.window.showQuickPick(displayOption, {
      placeHolder: question,
    });

    if (!selectedOption) {
      vscode.window.showInformationMessage('No option selected');
      return;
    }

    optionsSelected[id] = selectedOption;
  }

  // save the selected options
  if (type === 'setup') {
    try {
      context.globalState.update('optionsSelected', optionsSelected);
    } catch (error) {
      vscode.window.showErrorMessage(`Error saving the selected options: ${error}`);
      return;
    }
  }

  // create the files if the type is 'create'
  if (type === 'create') {
    createAllFiles(uri, componentName || '', optionsSelected);
  }
}

export function activate(context: vscode.ExtensionContext) {
  const create = vscode.commands.registerCommand('extension.createReactComponentWizard', (uri: vscode.Uri) => {
    commun(context, uri, 'create');
  });

  const setup = vscode.commands.registerCommand('extension.createReactComponentWizardCustomize', (uri: vscode.Uri) => {
    commun(context, uri, 'setup');
  });

  // context.subscriptions.push(create);
  // context.subscriptions.push(setup);
  
}

export function deactivate() { }
