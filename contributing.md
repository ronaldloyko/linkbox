# Contribution Guide

Thank you very much for your interest in **improving Linkbox**.

In this guide, you will learn how the project is **structured** and how you can **get involved**.

## In A Nutshell

Linkbox is a **hybrid application** for the Android operating system.
We use **TypeScript, React, Ionic, Capacitor, Redux and i18next**. We adhere to **Conventional Commits, Semantic Versioning, Keep A Changelog, Conventional Comments, GitHub Flow**. We use **Prettier** to format our code.
For translations, we use the hosted **Weblate** service.

## Technologies

- [**Ionic Framework**](https://ionicframework.com) provides the **UI components** to get the native look and feel. It also comes with a handy CLI tool to automate many tasks.
- [**Capacitor**](https://capacitorjs.com) is used to **bridge** our web application with the operating system. It provides **plug-ins** to talk to **native APIs** (such as storage, file system etc.). Capacitor also takes care of "converting" our web application into a native one by creating the necessary native project files to build the final application package.
- [**React**](https://reactjs.org) is the **view library** used to build and structure our user interface as reactive **components**.
- [**TypeScript**](https://www.typescriptlang.org) is the **programming language** that we use in the project and is a superset of JavaScript.
- [**Redux**](https://redux.js.org) is the **state management library** for our user interface. We use Redux in combination with React in order to centralize our application's state.
- [**i18next**](https://www.i18next.com) provides the **internationalization** (_i18n_) infrastructure for our application. We use it to **translate** our application to different languages.

## Standards

- [**Semantic Versioning**](https://semver.org) defines how we **version** our application.
- [**Conventional Commits**](https://www.conventionalcommits.org) is the ruleset to define our **commit messages**.
- [**Keep A Changelog**](https://keepachangelog.com) is the guideline used to define the structure of our **changelog** file.
- [**Conventional Comments**](https://conventionalcomments.org) facilitates communication by **standardizing comments** in our project.
- [**GitHub Flow**](https://githubflow.github.io) defines our source code **contribution workflow**.
- [**Prettier**](https://prettier.io) is used to **format** our code.

## Structure

### Folders

- `android` contains **native files** for our project and can be opened in Android Studio to create the application package. We usually don't have to touch this folder manually since Capacitor handles it
- `public` contains **static assets** like images and also the main HTML file for our application
- `resources` contains **general resources** like artwork images
- `src` contains the **source code** of our application and is the place where you will most likely work
  - `components` contains our **UI components**
  - `data` contains every **related with (persisted) data**. If you are using the same value (which is _not_ state) more than once across several components, you may want to declare it as a **constant**. Here we also find the storage adapter, which is responsible for interacting with the operating system's **storage** and **file system**
  - `hooks` contains all the **custom created hooks** for our UI components. If you are using the same logic across the several components, you should outsource it to a custom hook
  - `locales` contains the **translations** as JSON files
  - `store` contains all modules related to **state management**

### Files

- `src`
  - `index.tsx` is the application's **main entrypoint** of the application and
  - `Application.tsx` is the **root UI component** which binds the centralized state onto our application
  - `MainPage.tsx` is the **main view** and includes all the sub-components
  - `store.ts` represents the application's **state**
  - `i18n.ts` provides the **internationalization infrastructure** of our application

## Contributing

### Reporting Bugs

1. Open a [**new issue**](https://github.com/ronaldloyko/linkbox/issues)
1. **Describe the problem** using the rules of Conventional Comments and our **issue template** for bug reports

### Doing Changes

1. If not already existing, create a **new issue describing the problem** and follow the rules of Conventional Comments
1. Create a **fork** of this project
1. **Clone** that forked repository to your local machine
1. Create a new **branch** respecting GitHub Flow rules (e.g. use `increase-rate-limit` as branch name)
1. Run `npm install` to install the project's **dependencies**
1. Run `npm run develop` to start the **development server**
1. Do your **changes**
1. Make sure that the linter in the terminal **does not display any errors**
1. Run `npm run format` to **format** your code using Prettier
1. Run `npm run sync` to **synchronize** the application's **native project files** with the your changes in the web application
1. Run `npm run open` to **open Android Studio** where you can build the native package and run it on a physical or emulated device
1. **Test your changes** and make sure **nothing is broken**
1. **Commit your changes** with a message formatted according to Conventional Commits (e.g. `fix: increase rate limit`)
1. **Push** the changes
1. Open a **pull request** on this original repository and name it using the Conventional Commits convention (e.g. `fix: increase rate limit` ... `fixes #12345`) and **link it to the respective issue**

### Translating

You can either contribute translations using the **web-based interface** Weblate or by creating and modifying the **JSON file** of the specific language.

#### Via JSON File

1. Use the **workflow for doing changes** (see above _Doing Changes_)
1. **Create or modify** the language file in `src/locales` using the [BCP 47 format](https://www.w3.org/International/articles/language-tags) (e.g. `de.json` or `fr-CA.json`)
1. **Make the translations**
1. _When adding translations:_ Open the i18n file `src/i18n.ts` and **add your newly created JSON file** to the import statements (e.g. `import canadianFrench from "./locales/fr-CA"`) and add the imported value to the `usedLanguages` array (e.g. `[foo, bar, `**`canadianFrench]`**)

#### Via Weblate

TODO
