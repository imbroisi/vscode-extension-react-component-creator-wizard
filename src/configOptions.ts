export const ASK_ON_COMPONENT_CREATION = 'Ask on component creation';

export const configOptions = [
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
        ask_on_component_creation_default: 'yes',
    },
    {
        id: 'testing',
        question: 'Create unit test file?',
        options: [
            'Yes, inside a __tests__ folder',
            'Yes, without a __tests__ folder',
            'No'
        ],
    },
    {
        id: 'storybook',
        question: 'Create storybook file?',
        options: [
            'No',
            'Yes',
        ],
        ask_on_component_creation_default: 'yes',
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
