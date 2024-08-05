import * as vscode from 'vscode';
import { appData, ASK_ON_COMPONENT_CREATION } from "../data/appData";

export interface OptionsSelected {
  [key: string]: string
}

export default async function getUserInputSelections(type: string, previousSelections: OptionsSelected) {
  const optionsSelected: any = { ...previousSelections };

  for (let data of appData) {
    const { id, question, options, include_option_ask_on_component_creation } = data;
    const selectionPrev: any = optionsSelected?.[id];

    const displayOption = [...options];
    if (type === 'setup') {
      if (include_option_ask_on_component_creation) {
        displayOption.push(ASK_ON_COMPONENT_CREATION);
      }
    }

    if (typeof selectionPrev === 'string') {
      const index = displayOption.indexOf(selectionPrev);
      if (index > -1) {
        displayOption.splice(index, 1);
        if (type === 'setup' || include_option_ask_on_component_creation) {
          displayOption.unshift(selectionPrev);
        }
      }
      if (type === 'create') {
        if (selectionPrev !== ASK_ON_COMPONENT_CREATION) {
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

  return optionsSelected;
};
