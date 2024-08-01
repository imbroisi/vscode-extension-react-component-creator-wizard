export default 
`import { Container } from './{{NAME}}.styles'{{SEMICOLON}}
{{INTERFACE}}
export default function {{NAME}}({{PROPS}}) {
  return (
    <Container>
      <h1>Hello</h1>
    </Container>
  ){{SEMICOLON}}
}
`;
