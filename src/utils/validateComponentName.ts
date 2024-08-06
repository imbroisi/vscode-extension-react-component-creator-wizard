/**
 * Rules:
 * - The first character must be an uppercase letter.
 * - The subsequent characters can be:
 *      uppercase letters
 *      lowercase letters 
 *      numbers
 *      underscores
 *      dollar signs
 */

export const isValidComponentName = (componentName: string) => {
  const componentNameRegex = /^[A-Z][A-Za-z0-9_$]/;
  return componentNameRegex.test(componentName);
};
