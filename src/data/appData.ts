export const ASK_ON_COMPONENT_CREATION = 'Ask on component creation';

export const appData = [
    {
        id: 'language',
        question: 'Choose a language',
        options: [
            'TypeScript',            
            'JavaScript',
        ],
    },
    {
        id: 'style',
        question: 'Choose a component style',
        options: [
            'Styled Components',
            'Tailwind',
            'CSS'
        ],
        include_option_ask_on_component_creation: 'yes',
    },
    {
        id: 'testing',
        question: 'Create unit test file?',
        options: [
            'Yes, inside a __tests__ folder',
            'Yes, without a __tests__ folder',
            'No'
        ],
        include_option_ask_on_component_creation: 'yes',
    },
    {
        id: 'storybook',
        question: 'Create storybook file?',
        options: [
            'No',
            'Yes',
        ],
        include_option_ask_on_component_creation: 'yes',
    },
    {
        id: 'function',
        question: 'Choose the component declaration',
        options: [
            'Arrow function',
            'Function',
        ],
    },
    {
        id: 'semicolon',
        question: 'Use semicolon at the end of the statements?',
        options: [
            'Yes',
            'No'
        ],
    },
];
