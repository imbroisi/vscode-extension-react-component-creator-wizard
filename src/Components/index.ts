import * as vscode from 'vscode';
import { createIndexFile } from './createIndexFile';
import { createComponentFile } from './createComponentFile';
import { createStylesFile } from './createStylesFile';
import { createTestsFile } from './createTestsFile';
import { createStorybookFile } from './createStorybookFile';
import { OptionsSelected } from '../extension';

const createAllFiles = async (uri: vscode.Uri, componentName: string, optionsSelected: OptionsSelected) => {
  await createIndexFile(uri, componentName, optionsSelected);
  const componentFilePath = await createComponentFile(uri, componentName, optionsSelected);
  await createStylesFile(uri, componentName, optionsSelected);
  await createTestsFile(uri, componentName, optionsSelected);
  await createStorybookFile(uri, componentName, optionsSelected);

  // Set the active file to the componentFile file to reveal the folder in the Explorer
  const componentFileUri = vscode.Uri.file(componentFilePath);
  try {
    const document = await vscode.workspace.openTextDocument(componentFileUri);
    await vscode.window.showTextDocument(document);

    // Reveal the active file in the Explorer
    await vscode.commands.executeCommand('revealInExplorer', componentFileUri);
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to open and reveal ${componentFileUri.fsPath}: ${(error as Error).message}`);
  }
};

export default createAllFiles;
