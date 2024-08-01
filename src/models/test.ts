export default
`import { render } from '@testing-library/react'{{SEMICOLON}}
import {{NAME}} from '{{IMPORT_PATH}}/{{NAME}}'{{SEMICOLON}}

describe('{{NAME}} component', () => {
  test('should render {{NAME}}', () => {
    render(
      <{{NAME}} />
    ){{SEMICOLON}}

    const headingElement = screen.getByRole('heading', { level: 1 }){{SEMICOLON}}
    expect(headingElement).toBeInTheDocument(){{SEMICOLON}}
    expect(headingElement).toHaveTextContent('Hello'){{SEMICOLON}}
  }){{SEMICOLON}}
}){{SEMICOLON}}
`;
