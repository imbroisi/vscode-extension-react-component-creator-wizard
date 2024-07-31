import * as vscode from 'vscode';

export const  trimString = (multiLineString: string) => {
    const lines = multiLineString.split('\n');
    if (lines[0] === '') {
      lines.shift();
    }

    console.log('multiLineString ->', multiLineString);
    console.log('lines ->', JSON.stringify(lines, null, 2));

    const extraSpaces = lines[0].length - lines[0].trimStart().length;
    return lines.map(line => line.slice(extraSpaces)).join('\n');
}

export const writeContentToFile = (filePath: string, fileContent: string) => {
    const fileUri = vscode.Uri.file(filePath);
    const writeOperation = new vscode.WorkspaceEdit();
    writeOperation.createFile(fileUri, { ignoreIfExists: true });
    writeOperation.insert(fileUri, new vscode.Position(0, 0), trimString(fileContent));
    vscode.workspace.applyEdit(writeOperation);
  }
  