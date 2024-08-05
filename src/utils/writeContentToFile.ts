import * as vscode from 'vscode';

export const writeContentToFile = async (filePath: string, fileContent: string) => {
  const fileUri = vscode.Uri.file(filePath);

  // crete the file 
  const workspaceEdit = new vscode.WorkspaceEdit();
  workspaceEdit.createFile(fileUri, { overwrite: false });
  await vscode.workspace.applyEdit(workspaceEdit);

  // write the content to the file and save it
  const document = await vscode.workspace.openTextDocument(fileUri);
  const edit = new vscode.WorkspaceEdit();
  edit.insert(fileUri, new vscode.Position(0, 0), fileContent);
  await vscode.workspace.applyEdit(edit);
  await document.save();
};
