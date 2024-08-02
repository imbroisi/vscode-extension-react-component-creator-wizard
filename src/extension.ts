import * as vscode from 'vscode';
import createAllFiles from './Components';
import { appData, ASK_ON_COMPONENT_CREATION } from './data/appData';
import { validateComponentName } from './utils/validateComponentName';

export interface OptionsSelected {
  [key: string]: string
}

async function commun(
  context: vscode.ExtensionContext,
  uri: vscode.Uri,
  type: string,
) {
  let previousSelections: any = context.globalState.get<Record<string, OptionsSelected>>('optionsSelected');

  if (!previousSelections) {
    previousSelections = {};
    appData.forEach((data) => {
      previousSelections[data.id] = data.options[0];
    });
  }

  const optionsSelected: any = { ...previousSelections };
  
  let componentName: string | undefined = '';
  if (type === 'create') {
    componentName = await vscode.window.showInputBox({
      placeHolder: 'Enter the Component name',
    });

    if (!componentName) {
      vscode.window.showInformationMessage('No file name entered');
      return;
    }

    const FolderPath = `${uri.fsPath}/${componentName}`;
    const isPathExist = await vscode.workspace.fs.stat(vscode.Uri.file(FolderPath)).then(() => true, () => false);
    if (isPathExist) {
      vscode.window.showErrorMessage('Directory already exist');
      return;
    }

    if (!validateComponentName(componentName)) {
      vscode.window.showErrorMessage('Invalid Component name');
      return;
    }
  }

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

  if (type === 'setup') {
    try {
      context.globalState.update('optionsSelected', optionsSelected);
    } catch (error) {
      console.error('Error saving the selected options', error);
    }
  }

  if (type === 'create') {
    createAllFiles(uri, componentName, optionsSelected);
  }
}

export function activate(context: vscode.ExtensionContext) {  
  const create = vscode.commands.registerCommand('extension.createReactComponent', (uri: vscode.Uri) => {
    commun(context, uri, 'create');
  });

  const setup = vscode.commands.registerCommand('extension.createReactComponentSetup', (uri: vscode.Uri) => {
    commun(context, uri, 'setup');
  });

  context.subscriptions.push(create);
  context.subscriptions.push(setup);
}

export function deactivate() { }
