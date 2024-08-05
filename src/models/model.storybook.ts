export default
'{{TS}}import { StoryObj } from \'@storybook/react\'{{SEMICOLON}}\n' +
'{{/TS}}import {{NAME}}{{TS}}, { {{NAME}}Props }{{/TS}} from \'./{{NAME}}\'{{SEMICOLON}}\n' +
'\n' +
'const {{NAME}}Story = ({{PROPS}}) => {\n' +
'  return (\n' +
'    <{{NAME}}\n' +
'      {...props}\n' +
'    />\n' +
'  ){{SEMICOLON}}\n' +
'}\n' +
'\n' +
'export default {\n' +
'  title: \'Components/{{NAME}}\',\n' +
'  component: {{NAME}},\n' +
'  argTypes: {\n' +
'    prop_1_name: {\n' +
'      control: {\n' +
'        type: \'number\',\n' +
'        min: 0,\n' +
'        max: 8,\n' +
'      }\n' +
'    },\n' +
'    prop_2_name: {\n' +
'      options: [...some options...],\n' +
'      control: { type: \'select\' },\n' +
'    },\n' +
'    prop_3_name: {\n' +
'      name: \'some name\',\n' +
'      control: {\n' +
'        type: \'boolean\',\n' +
'      },\n' +
'    },\n' +
'  },\n' +
'}{{SEMICOLON}}\n' +
'\n' +
'export const Default{{TS}}: StoryObj<typeof {{NAME}}Story>{{/TS}} = {\n' +
'  name: \'v1.0.0\',\n' +
'  args: {\n' +
'    prop_1_name: 3,\n' +
'    prop_2_name: \'option_1\',\n' +
'    prop_3_name: true,\n' +
'  },\n' +
'  render: {{NAME}}Story,\n' +
'}{{SEMICOLON}}\n' +
'\n' +
'Default.parameters = {\n' +
'  design: {\n' +
'    type: \'figma\',\n' +
'    url: \'https://www.figma.com/file/<...file_id...>\',\n' +
'  }\n' +
'}{{SEMICOLON}}\n' +
'\n';