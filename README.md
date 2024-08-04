# VSCode Extension: React Component Creator Wizard

<center>
  <img src="https://raw.githubusercontent.com/imbroisi/vscode-extension-react-component-creator-wizard/main/images/logo.png">
</center>

## Description
This Visual Studio Code extension helps you create a folder and file structure for React components quickly and efficiently. It provides context menu commands to generate the necessary files and folders for a new React component, ensuring consistency and saving development time.

## Features
- Create a new React component structure with a quick operation - right clicking in the folder you want your component, choose a name, and that's it. 
- Customize the file extensions and styles used in the component structure.
- Support for Storybook and Unit Tests (React Testing Library).

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

## Example of File Created
Assuming you name your component `MyComponent`, using TypeScript and Tailwind.

This will be the content of `MyComponent.tsx`:

```bash
export interface MyComponentProps {

}

export default function MyComponent(props: MyComponentProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Hello</h1>
    </div>
  );
}

```

## How to Use
1. Right click on a folder in the Explorer view (`SomeFolder` in the exemple above).
2. Select `✍️ Component Creator Wizard` to generate a new component structure.
3. This will open the VS Code's `Command Palette`, at the top of VS Code editor.
4. There, give your component a name and press `Enter`.
5. Your component is created! 🥳 🎉

Your component has been created with the default options. But you can have options other than the initial default, as we'll see next.

## Configuration
The extension comes with predefined values, but you can change them if necessary.
These are the configurable values.

|  Configurable           | Default                        | Other Options         
| ----------------------- | ------------------------------ | ------------------------- |
| `Language`              | Typescript                     | JavaScript                |
| `Stylling`              | Styled Components              | Tailwind, SCSS, Sass, CSS |
| `Unit Tests File`       | Yes, inside *`__test__`* folder  | Yes but without folder, No    |                  
| `Storybook File`        | No                             | Yes                       |                  
| `Component Declaration` | Function                       | Arrow Function            |                  
| `Semicolon`*            | Yes                            | No                        |                  

*`Semicolon` refer to whether or not a semicolon is used at the end of statements.

To change one or more values:
1. Right click on any folder in the Explorer view.
2. Select `Customize Default Settings...`.
3. This will open the VS Code's `Command Palette`, at the top of VS Code editor.
4. You will be asked to choose the new default values.

## Installation
1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
3. Search for `React Component Creator Wizard`.
4. Click `Install` to install the extension.
5. Reload Visual Studio Code to activate the extension.

## Configuration
You can customize the default file extensions and styles used in the component structure by modifying the default extension settings.
1. Right click on any folder in the Explorer view.
2. Click on `Customize Default Settings...`.
3. This will open the VS Code's `Command Palette`, at the top of VS Code editor.
4. Choose `TypeScript` or `JavaScript` as the component language.
5. Then choose what kind of styling you will use in the component.
6. Note that there is an `Ask on component creation` option. By selecting it, you will not set any styling strategy as default. Instead, you will select the style type only when you are creating a component.
7. After choosing one of the style options, you will ask about unit tests. Choose one option.
8. And so one.
9. At the end of the process, the new default values are set and will be used when creating the next components.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing
Contributions are welcome! Please read the [CONTRIBUTING](CONTRIBUTING.md) file for details on how to contribute to this project.

## Author
Luiz Imbroisi - Ender
- Email: ender.imbroisi@gmail.com

## Acknowledgments
- Thanks to the open-source community for their valuable contributions.
