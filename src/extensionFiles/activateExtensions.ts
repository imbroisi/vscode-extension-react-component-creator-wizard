import * as vscode from 'vscode';
import { getComponentName } from './getComponentName';
import { OptionsSelected } from './getUserInputSelections';
import createAllFiles from '../components/main';
import { appData, ASK_ON_COMPONENT_CREATION } from '../data/appData';
import { getUserInputSelections } from './getUserInputSelections';

export async function activateExtensions(
  context: vscode.ExtensionContext,
  type: string,
) {
  // get the component name if the type is 'create'
  // let componentName: string | undefined = '';
  // if (type === 'create') {
  //   const { name, error } = await getComponentName(uri);
  //   if (error) {
  //     vscode.window.showInformationMessage(error);
  //     return;
  //   }
  //   componentName = name;
  // }

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
  // if (type === 'create') {
  //   createAllFiles(uri, componentName || '', optionsSelected);
  // }

  return optionsSelected;
}
// function getUserInputs(operation: string, previousSelections: any) {
//   throw new Error('Function not implemented.');
// }
