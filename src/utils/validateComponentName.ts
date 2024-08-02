export const validateComponentName = (componentName: string) => {
  const componentNameRegex = /^[A-Z][A-Za-z0-9]{1,}$/;
  return componentNameRegex.test(componentName);
};
