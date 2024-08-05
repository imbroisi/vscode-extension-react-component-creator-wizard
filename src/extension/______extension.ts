import * as vscode from 'vscode';
import { activateExtensions } from './activateExtensions';

export function activate(context: vscode.ExtensionContext) {
  const create = vscode.commands.registerCommand('extension.createReactComponentWizard', (uri: vscode.Uri) => {
    activateExtensions(context, uri, 'create');
  });

  const setup = vscode.commands.registerCommand('extension.createReactComponentWizardCustomize', (uri: vscode.Uri) => {
    activateExtensions(context, uri, 'setup');
  });

  context.subscriptions.push(create);
  context.subscriptions.push(setup);
}

export function deactivate() { }
