import * as vscode from 'vscode';
import { appData, ASK_ON_COMPONENT_CREATION } from "../data/appData";

export interface OptionsSelected {
  [key: string]: string
}

export const getUserInputSelections = async (operation: string, optionsSelected: OptionsSelected) => {
  for (let data of appData) {
    const { id, question, options, include_option_ask_on_component_creation } = data;
    const previousSelection: any = optionsSelected?.[id];

    const displayOption = [...options];
    if (operation === 'setup') {
      if (include_option_ask_on_component_creation) {
        displayOption.push(ASK_ON_COMPONENT_CREATION);
      }
    }

    if (typeof previousSelection === 'string') {
      const index = displayOption.indexOf(previousSelection);
      if (index > -1) {
        displayOption.splice(index, 1);
        if (operation === 'setup' || include_option_ask_on_component_creation) {
          displayOption.unshift(previousSelection);
        }
      }
      if (operation === 'create') {
        if (previousSelection !== ASK_ON_COMPONENT_CREATION) {
          continue;
        }
      }
    }

    const selectedOption = await vscode.window.showQuickPick(displayOption, {
      placeHolder: question,
    });

    if (!selectedOption) {
      vscode.window.showInformationMessage('No option selected');
      return;
    }

    optionsSelected[id] = selectedOption;
  }
};
