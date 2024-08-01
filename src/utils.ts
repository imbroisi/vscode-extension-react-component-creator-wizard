import * as vscode from 'vscode';
import interfaceModel from './models/interface';

export const trimString = (multiLineString: string) => {
  const lines = multiLineString.split('\n');
  if (lines[0] === '') {
    lines.shift();
  }

  const extraSpaces = lines[0].length - lines[0].trimStart().length;
  return lines.map(line => line.slice(extraSpaces)).join('\n');
};

export const writeContentToFile = async (filePath: string, fileContent: string) => {
  const fileUri = vscode.Uri.file(filePath);
  const writeOperation = new vscode.WorkspaceEdit();
  writeOperation.createFile(fileUri, { ignoreIfExists: true });
  writeOperation.insert(fileUri, new vscode.Position(0, 0), trimString(fileContent));
  await vscode.workspace.applyEdit(writeOperation);
};

export const validateComponentName = (componentName: string) => {
  const componentNameRegex = /^[A-Z][A-Za-z0-9]{1,}$/;
  return componentNameRegex.test(componentName);
};

export const replaceTags = (
  component: string, 
  name: string, 
  withSemicolon: boolean, 
  isTypescript: boolean,
  testParentPath?: string,
) => {
  const interfaceTs = isTypescript 
    ? interfaceModel
      .replace(/{{NAME}}/g, name)
      .replace(/{{SEMICOLON}}/g, withSemicolon ? ';' : '')
    : '';
  const props = isTypescript ? `props: ${name}Props` : '';

  return component
    .replace(/{{NAME}}/g, name)
    .replace(/{{SEMICOLON}}/g, withSemicolon ? ';' : '')
    .replace(/{{INTERFACE}}/g, interfaceTs)
    .replace(/{{PROPS}}/g, props)
    .replace(/{{IMPORT_PATH}}/g, testParentPath || '');
};
