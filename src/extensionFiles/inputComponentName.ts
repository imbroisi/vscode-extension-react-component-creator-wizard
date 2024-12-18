import * as vscode from 'vscode';
import { isValidComponentName } from '../utils/validateComponentName';

export default async function inputComponentName(uri: vscode.Uri) {
  const name = await vscode.window.showInputBox({
    placeHolder: 'Enter the Component name',
  });

  if (!name) {
    return { error: 'No file name entered' };
  }

  const FolderPath = `${uri.fsPath}/${name}`;
  const isPathExist = await vscode.workspace.fs.stat(vscode.Uri.file(FolderPath)).then(() => true, () => false);
  if (isPathExist) {
    return { error: 'Directory already exists' };
  }
  if (!isValidComponentName(name)) {
    return { error: 'Invalid Component name' };
  }

  return { name };
};
