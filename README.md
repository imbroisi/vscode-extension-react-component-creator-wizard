# VSCode Extension: React Create Component Wizard
<center>
  <img src="https://raw.githubusercontent.com/imbroisi/vscode-extension-react-component-creator-wizard/main/images/logo.png">
</center>

## Description
This Visual Studio Code Extension helps you create a folder and file structure for React components quickly and efficiently. It provides context menu commands to generate the files and folders needed for a new React component, ensuring consistency and saving development time.

## Features
- Create a new React component structure with a quick operation - right-click on the folder where you want the component, choose a name and you're done. 
- Customize the files and styles used in the component structure.
- Support for Storybook and Unit Tests (React Test Library).

## Example of Structure Result
Assuming you name your component `MyComponent`:
```bash
someFolder [e.g. components]
│
│── MyComponent [Folder]
      │
      │── index.{jsx | tsx}
      │
      │── MyComponent.{jsx | tsx}
      │
      │── MyComponent.styles.{js | ts | css | scss | sass}
      │
      │── MyComponent.stories.{jsx | tsx} [optional]
      │
      └── MyComponent.test.{jsx | tsx} [or inside a __tests__ folder] [optional]
```

## Example of Content of a Component Created
Suppose you name your component `LetsRock`, using `TypeScript` and `Tailwind`.

This will be the content of `LetsRock.tsx`:

```tsx
export interface LetsRockProps {

}

export default function LetsRock(props: LetsRockProps) {
  return (
    <div className="flex items-center justify-center">
      <h1>Hello</h1>
    </div>
  );
}
```

## How to Use
1. Right-click on a folder in the Explorer view (`someFolder` in the previous example).
2. Select `New React Component Wizard` to generate a new component structure.
3. This will open the VS Code `Command Palette` at the top of the VS Code editor.
4. There, give your component a name and press `Enter`.
5. Your component has been created with the default options.

Note that you won't be able to create a component if there is already another one with the same name in that position. In other words, a component that already exists will not be overwritten by a new component.

## Configuration
The Extension comes with predefined values, but you can change them if necessary.
These are the configurable values.

|  Item                     | Default                            | Other Options         
| ------------------------- | ---------------------------------  | ----------------------------- |
| `Language`                | Typescript                         | JavaScript                    |
| `Stylization`             | Styled Components                  | Tailwind, SCSS, Sass, CSS     |
| `Unit Tests File`         | Yes, inside *`__test__`* folder    | Yes but without folder, No    |                  
| `Storybook File`          | No                                 | Yes                           |                  
| `Component Declaration`   | Function                           | Arrow Function                |                  
| `Semicolon`*              | Yes                                | No                            |                  

*`Semicolon` refer to whether or not a semicolon is used at the end of statements.

You can customize the patterns used in the component's structure by modifying the Extension's default settings.

1. Right-click on any folder in the Explorer view.
2. Click on `Customize Default Settings...`.
3. This will open the VS Code `Command Palette` at the top of the VS Code editor.
4. Choose `TypeScript` or `JavaScript` as the component language.
5. Next, choose the type of style you will use in the component.
6. Note that there is an `Ask on component creation` option. By selecting it, you will not set any styling strategy as the default. Instead, you will only select the style type when creating a new component.
7. After choosing one of the styling options, you will be asked about Unit Tests. Choose an option.
8. And so on.
9. At the end of the process, the new default values are set and will be used when creating new components.

## Installation
1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
3. Search for `React Create Component Wizard`.
4. Click `Install` to install the Extension.
5. Reload Visual Studio Code to activate the Extension.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing
Contributions are welcome! Please read the [CONTRIBUTING](CONTRIBUTING.md) file for details on how to contribute to this project.

## Author
Luiz Imbroisi - Ender
- Email: ender.imbroisi@gmail.com

## Acknowledgments
- Thanks to the open-source community for their valuable contributions.
