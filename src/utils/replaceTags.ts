import modelInterface from '../models/model.interface';
import modelArrowFuctionDefinition from '../models/model.function_type_arrow_definition';
import modelArrowFuctionExport from '../models/model.function_type_arrow_export';
import modelFunction from '../models/model.function_type_function';

interface ReplaceTags {
  optionsSelected: {[key: string]: string},
  component?: string,
  name: string
}

const replaceTS = (componentOriginal: string, isTypescript: boolean) => {
  if (componentOriginal.indexOf('{{TS}}') === -1) {
    return componentOriginal;
  }

  let component = componentOriginal;

  if (isTypescript) {
    component = component.replace(/\{\{TS}}/g, '');
    component = component.replace(/\{\{\/TS}}/g, '');
    return component;
  }

  // JavaScript
  while (component.indexOf('{{TS}}') !== -1) {
    const start = component.indexOf('{{TS}}');
    const end = component.indexOf('{{/TS}}');
    if (end === -1) {
      break;
    }

    const ts = component.substring(start + 6, end);
    const tsArray = ts.split('\n');
    const tsArrayFormatted = !isTypescript ? '' : tsArray.map((line: string) => `  ${line}`).join('\n');
    component = component.replace(`{{TS}}${ts}{{/TS}}`, tsArrayFormatted);
  };

  return component;
};

export const replaceTags = (funcProps: ReplaceTags) => {
  const {
    optionsSelected,
    component: componentOriginal,
    name,
  } = funcProps;

  if (!componentOriginal) {
    return '// component not found';
  }

  const isTypescript = optionsSelected.language === 'TypeScript';
  const component = replaceTS(componentOriginal, isTypescript);

  const testParentPath = optionsSelected.testing.indexOf('inside') === -1 ? '.' : '..';
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
