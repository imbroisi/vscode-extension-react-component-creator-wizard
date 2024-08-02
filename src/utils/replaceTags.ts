import modelInterface from '../models/model.interface';
import modelArrowFuctionDefinition from '../models/model.function_type_arrow_definition';
import modelArrowFuctionExport from '../models/model.function_type_arrow_export';
import modelFunction from '../models/model.function_type_function';

interface ReplaceTags {
  optionsSelected: {[key: string]: string},
  component: string,
  name: string
}

export const replaceTags = (funcProps: ReplaceTags) => {
  const {
    optionsSelected,
    component,
    name,
  } = funcProps;

  const testParentPath = optionsSelected.testing.indexOf('inside') === -1 ? '.' : '..';
  const isTypescript = optionsSelected.language === 'TypeScript';
  const withSemicolon = optionsSelected.withSemicolon !== 'No';
  const isArrowFunction = optionsSelected.function === 'Arrow function';

  const functionType = isArrowFunction ? modelArrowFuctionDefinition : modelFunction;
  const functionTypeExport = isArrowFunction ? modelArrowFuctionExport : '';
  const interfaceTs = isTypescript ? modelInterface : '';  
  const props = isTypescript ? `props: ${name}Props` : '';

  return component
    .replace(/{{FUNCTION_TYPE}}/g, functionType) // must be the first
    .replace(/{{FUNCTION_TYPE_EXPORT}}/g, functionTypeExport) // must be the second
    .replace(/{{INTERFACE}}/g, interfaceTs) // must be the third

    .replace(/{{PROPS}}/g, props)
    .replace(/{{NAME}}/g, name)
    .replace(/{{SEMICOLON}}/g, withSemicolon ? ';' : '')
    .replace(/{{IMPORT_PATH}}/g, testParentPath);
};
