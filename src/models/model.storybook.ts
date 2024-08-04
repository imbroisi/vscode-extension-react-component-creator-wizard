export default
`import { StoryObj } from '@storybook/react'{{SEMICOLON}}
import {{NAME}}, { {{NAME}}Props } from './{{NAME}}'{{SEMICOLON}}

const {{NAME}}Story = (props: {{NAME}}Props) => {
  return (
    <{{NAME}}
      {...props}
    />
  ){{SEMICOLON}}
}

export default {
  title: 'Components/{{NAME}}',
  component: {{NAME}},
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
  },
}{{SEMICOLON}}

export const Default: StoryObj<typeof {{NAME}}Story> = {
  name: 'v1.0.0',
  args: {
    prop_1_name: 3,
    prop_2_name: 'option_1',
    prop_3_name: true,
  },
  render: {{NAME}}Story,
}{{SEMICOLON}}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/<...file_id...>',
  }
}{{SEMICOLON}}
`;