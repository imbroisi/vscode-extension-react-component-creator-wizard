import * as vscode from 'vscode';
import { writeContentToFile } from '../utils';
import { createStylesFile } from './stylesFile';
import { createComponentFile } from './componentFile';
import { createTestsFile } from './testsFile';
import { OptionsSelected } from '../extension';
import { createStorybookFile } from './storybookFile';

const createIndexFile = async (uri: vscode.Uri, componentName: string, optionsSelected: OptionsSelected) => {
  const semicolon = optionsSelected.semicolon === 'No' ? '' : ';';
  const fileExtension = optionsSelected.language === 'TypeScript' ? 'tsx' : 'jsx';
  const filePath = `${uri.fsPath}/${componentName}/index.${fileExtension}`;
  const fileContent = `
    /* istanbul ignore file */
    export { default } from \'./${componentName}\'${semicolon}
  `;

  await writeContentToFile(filePath, fileContent);
};

export const createComponent = async (uri: vscode.Uri, componentName: string, optionsSelected: OptionsSelected) => {
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
