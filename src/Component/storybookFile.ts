import * as vscode from 'vscode';
import { writeContentToFile } from '../utils';
import { OptionsSelected } from '../extension';

export const createStorybookFile = (uri: vscode.Uri, componentName: string, optionsSelected: OptionsSelected) => {
  if (optionsSelected.storybook === 'No') {
    return;
  }

  const semicolon = optionsSelected.semicolon === 'No' ? '' : ';';
  const fileExtension = optionsSelected.language === 'TypeScript' ? 'tsx' : 'jsx';

  const filePath = `${uri.fsPath}/${componentName}/${componentName}.stories.${fileExtension}`;
  const fileContent = `
    /* istanbul ignore file */
    import { StoryObj } from '@storybook/react'${semicolon}
    import ${componentName}, { ${componentName}Props } from './${componentName}'${semicolon}

    const ${componentName}Story = (props: ${componentName}Props) => {
      return (
        <${componentName}
          {...props}
        />
      )${semicolon}
    }

    export default {
      title: 'Components/${componentName}',
      component: ${componentName},
      argTypes: {
        prop_1_name: {
          control: {
            type: 'number',
            min: 0,
            max: 8,
          }
        },
        prop_2_name: {
          options: [...some options...],
          control: { type: 'select' },
        },
        prop_3_name: {
          name: 'some name',
          control: {
            type: 'boolean',
          },
        },
      }
    }${semicolon}

    export const Default: StoryObj<typeof ${componentName}Story> = {
      name: 'v1.0.0',
      args: {
        prop_1_name: 3,
        prop_2_name: 'option_1',
        prop_3_name: true,
      },
      render: ${componentName}Story,
    }
    Default.parameters = {
      design: {
        type: 'figma',
        url: 'https://www.figma.com/file/<...file_id...>',
      }
    }${semicolon}
  `;

  writeContentToFile(filePath, fileContent);
};
