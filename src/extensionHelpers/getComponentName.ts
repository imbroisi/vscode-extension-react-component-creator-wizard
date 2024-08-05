import * as vscode from 'vscode';
import { validateComponentName } from '../utils/validateComponentName';

export const getComponentName = async (uri: vscode.Uri) => {
  const name = await vscode.window.showInputBox({
    placeHolder: 'Enter the Component name',
  });

  if (!name) {
    return { error: 'No file name entered' };
  }

  const FolderPath = `${uri.fsPath}/${name}`;
  const isPathExist = await vscode.workspace.fs.stat(vscode.Uri.file(FolderPath)).then(() => true, () => false);
  if (isPathExist) {
    return { error: 'Directory already exist' };
  }
  if (!validateComponentName(name)) {
    return { error: 'Invalid Component name' };
  }

  return { name };
};
