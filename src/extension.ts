import * as vscode from 'vscode';
import { createComponent } from './Component';
import { configOptions, ASK_ON_COMPONENT_CREATION } from './configOptions';

export interface OptionsSelected {
  [key: string]: string
}

async function commun(
  context: vscode.ExtensionContext,
  uri: vscode.Uri,
  optionsSelected: OptionsSelected,
  type: string
) {
  // Retrieve the previously selected option
  const previousSelections = context.globalState.get<Record<string, OptionsSelected>>('optionsSelected');

  let componentName: string | undefined = '';
  if (type === 'create') {
    componentName = await vscode.window.showInputBox({
      placeHolder: 'Enter the Component name',
    });

    if (!componentName) {
      vscode.window.showInformationMessage('No file name entered');
      return;
    }
  }

  for (let configOption of configOptions) {
    const { id, question, options, ask_on_component_creation } = configOption;
    const previousSelection: any = previousSelections?.[id];

    const displayOption = [...options];
    if (type === 'setup') {
      if (ask_on_component_creation) {
        displayOption.push(ASK_ON_COMPONENT_CREATION);
      }
    }

    if (typeof previousSelection === 'string') {
      const index = displayOption.indexOf(previousSelection);
      if (index > -1) {
        displayOption.splice(index, 1);
        if (type === 'setup' || ask_on_component_creation) {
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
    console.log('-->>>> selectedOption', selectedOption)
    if (type === 'setup') {

    }

    vscode.window.showInformationMessage(`You selected: ${selectedOption}`);
  }

  console.log('POS 2 optionsSelected ->', optionsSelected)
  // Save the selected option for future sessions
  try {
    context.globalState.update('optionsSelected', optionsSelected);
  } catch (error) {
    console.error('Error saving the selected options', error);
  }
  context.globalState.update('optionsSelected', optionsSelected);

  if (type === 'create') {
    createComponent(uri, componentName, optionsSelected);
  }

}

export function activate(context: vscode.ExtensionContext) {

  const optionsSelected: OptionsSelected = {};

  // console.log('\npreviousSelection ->', previousSelection)

  let create = vscode.commands.registerCommand('extension.createReactComponent', async (uri: vscode.Uri) => {
    commun(context, uri, optionsSelected, 'create');
  });

  let setup = vscode.commands.registerCommand('extension.createReactComponentSetup', async (uri: vscode.Uri) => {
    commun(context, uri, optionsSelected, 'setup');
  });

  context.subscriptions.push(create);
  context.subscriptions.push(setup);

}

export function deactivate() { }
