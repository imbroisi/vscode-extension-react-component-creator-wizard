import * as vscode from 'vscode';

// const trimString = (multiLineString: string) => {
//   const lines = multiLineString.split('\n');
//   if (lines[0] === '') {
//     lines.shift();
//   }

//   const extraSpaces = lines[0].length - lines[0].trimStart().length;
//   return lines.map(line => line.slice(extraSpaces)).join('\n');
// };

export const writeContentToFile = async (filePath: string, fileContent: string) => {
  const fileUri = vscode.Uri.file(filePath);

  // crete the file 
  const workspaceEdit = new vscode.WorkspaceEdit();
  workspaceEdit.createFile(fileUri, { overwrite: false });
  // workspaceEdit.insert(fileUri, new vscode.Position(0, 0), trimString(fileContent));
  await vscode.workspace.applyEdit(workspaceEdit);

  const document = await vscode.workspace.openTextDocument(fileUri);
  const edit = new vscode.WorkspaceEdit();
  edit.insert(fileUri, new vscode.Position(0, 0), fileContent);
  await vscode.workspace.applyEdit(edit);
  await document.save();
};
