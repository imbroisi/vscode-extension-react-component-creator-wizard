import * as vscode from 'vscode';
import createAllFiles from './components/main';
import getComponentName from './extensionFiles/getComponentName';
import { appData } from './data/appData';
import getUserInputSelections from './extensionFiles/getUserInputSelections';

export interface OptionsSelected {
  [key: string]: string
}

function getPreviousSelections(context: vscode.ExtensionContext) {
  let previousSelections: any = context.globalState.get<Record<string, OptionsSelected>>('optionsSelected');
  if (!previousSelections) {
    previousSelections = {};
    appData.forEach((data) => {
      previousSelections[data.id] = data.options[0];
    });
  }
  return previousSelections;
}

export async function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand('extension.createReactComponentWizardCustomize', async (uri: vscode.Uri) => {
    const optionsSelected = await getUserInputSelections('setup', getPreviousSelections(context));
    try {
      context.globalState.update('optionsSelected', optionsSelected);
    } catch (error) {
      vscode.window.showErrorMessage(`Error saving the selected options: ${error}`);
      return;
    }
  });

  vscode.commands.registerCommand('extension.createReactComponentWizard', async (uri: vscode.Uri) => {
    const { name, error } = await getComponentName(uri);
    if (error) {
      vscode.window.showErrorMessage(error);
      return;
    }
    const optionsSelected = await getUserInputSelections('create', getPreviousSelections(context));
    createAllFiles(uri, name || '', optionsSelected);
  });
}

export function deactivate() { }
