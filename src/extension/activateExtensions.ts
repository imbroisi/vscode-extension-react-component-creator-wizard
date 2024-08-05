import * as vscode from 'vscode';
import { getComponentName } from './getComponentName';
import { OptionsSelected } from './getUserInputSelections';
import createAllFiles from '../components/main';
import { appData } from '../data/appData';

export async function activateExtensions(
  context: vscode.ExtensionContext,
  uri: vscode.Uri,
  operation: string,
) {
  // get the component name if the operation is 'create'
  let componentName: string | undefined = '';
  if (operation === 'create') {
    const { name, error } = await getComponentName(uri);
    if (error) {
      vscode.window.showErrorMessage(error);
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

  const optionsSelected: any = { ...previousSelections };

  // prompt the user to select the options
  await getUserInputs(operation, previousSelections);

  // save the selected options
  if (operation === 'setup') {
    try {
      context.globalState.update('optionsSelected', optionsSelected);
    } catch (error) {
      vscode.window.showErrorMessage(`Error saving the selected options: ${error}`);
      return;
    }
  }

  // create the files if the operation is 'create'
  if (operation === 'create') {
    createAllFiles(uri, componentName || '', optionsSelected);
  }
}

function getUserInputs(operation: string, previousSelections: any) {
  throw new Error('Function not implemented.');
}
