# Documentation for the internal API

- [Documentation for the internal API](#documentation-for-the-internal-api)
  - [Library source code](#library-source-code)
    - [Files and directories](#files-and-directories)
      - [Root directory](#root-directory)
      - [Interfaces directory](#interfaces-directory)
        - [Runtime representation of interfaces](#runtime-representation-of-interfaces)
        - [Synthetic interfaces](#synthetic-interfaces)
      - [Helpers directory](#helpers-directory)
      - [Procedures directory](#procedures-directory)
      - [GeometryObjects directory](#geometryobjects-directory)
    - [Exporting](#exporting)
    - [Conventions](#conventions)
  - [Testing](#testing)
    - [Unit testing](#unit-testing)
    - [E2E testing](#e2e-testing)
  - [Documentation](#documentation)
    - [Internal documentation](#internal-documentation)
    - [Basic documentation](#basic-documentation)
    - [API Reference](#api-reference)
  - [Depedencies](#depedencies)
  - [Publishing](#publishing)

## Library source code

All the source code for the library can be found in the [src](./src/) directory. The library is written in TypeScript, so the source code is in TypeScript as well. The library is object oriented, so the source code is organized into classes and interfaces, that are in directories based on the type of behaviour they have. One file usually contains one class or interface or a set of closely-related classes and interfaces.

### Files and directories

The library source is organized into directories based on the type of behaviour they have. Top level directories group code, that has itself a very specific type of behaviour, that no other code has. Files usually contain a single class, function, interface, or a set of closely-related classes, functions, and interfaces. It can also contain multiple connected types.

#### Root directory

The root directory contains the [factories.ts](./src/factories.ts) file and the [validators.ts](./src/validators.ts). All top-level non-namespace exports should be placed directly inside a file in the root directory. The [factories.ts](./src/factories.ts) file contains factories for creating objects. The [validators.ts](./src/validators.ts) file contains functions for validating objects at runtime. The library doesn't provide much other non-namespace top-level exports to keep the API intuitive and descriptive.

#### Interfaces directory

The library follows an interface based design. All behaviour of any object in the library should be described by an interface or combination of interfaces. Each file in the [interfaces directory](./src/interfaces/) contains a single interface or a set of closely-related interfaces. The [runtimeInterfaces.ts](./src/interfaces/runtimeInterfaces.ts) file includes all constants and types, that are used in the runtime representation of interfaces desribed in the [section bellow](#runtime-representation-of-interfaces).  
The [synthetic.ts](./src/interfaces/synthetic.ts) file includes synthetic interfaces described in the [section bellow](#synthetic-interfaces).

##### Runtime representation of interfaces

Every GeometryObject keeps track of which interfaces it implements at runtime. This enables faster type validators and safe type casting. The runtime representation of interfaces is defined in the [runtimeInterfaces.ts](./src/interfaces/runtimeInterfaces.ts) file.

##### Synthetic interfaces

Some interfaces are usually used together to describe some behaviour. These interfaces can be merged into a single synthetic interface. Synthetic interfaces do not include any new properties or methods, they only merge existing interfaces. Using a synthetic interface should be equivalent to using all the interfaces it merges both typewise and runtime-wise. Synthetic interfaces are defined in the [synthetic.ts](./src/interfaces/synthetic.ts) file.

#### Helpers directory

The [helpers directory](./src/helpers/) contains utility functions and classes. These functions and classes are not directly related to the behaviour of the library, but are used to simplify the implementation of the library. It usually includes types, pure functions and utility classes.

#### Procedures directory

The [procedures directory](./src/procedures/) contains everything to do with procedures. Procedures are pure functions usually of a mathematical character. They are split into two categories:

- Foundational
- Derived

The foundational procedures are the most basic procedures without library specific documentation (they usually just have a link to a wiki page).  
Derived procedures are procedures, that are specificaly designed for this library. They usually have a more complex implementation and are documented in the [procedures documentation directory](./docs/procedures/).

#### GeometryObjects directory

The [GeometryObjects directory](./src/GeometryObjects/) contains all the implemented geometry objects in their own directories. 

### Exporting

As the main purpouse of a library is to export its code, exporting has a rigid structure. This sturcture only applies to exporting outside of the library. Exporting and importing within the library is not restricted by this structure and is in fact discouraged to prevent circular dependencies.  

When exporting outside of the library, the following rules apply:

- All exports are defined in the [index.ts](./src/index.ts) file.
- If you want to export something from a directory, you must export through the index.ts file in that directory. This is done to isolate behaviour of coupled code.
- Exported namespeces do not need to follow the folder structure. Whether a namespace is needed is decided in the index.ts file in the directory.
- The index.ts files shouldn't contain any code, that is not related to exporting.

### Conventions

Almost all conventions are enforced by TypeScript and Prettier. Other convetions include:

- A class should ALWAYS implement and interface, that is placed in the [interface directory](./src/interfaces/).
- When referencing a type of an object, ALWAYS use its interface, not its class.
- When importing types, iterfaces, or other objects only for documentation purpouses IF POSSIBLE use the `import type` syntax. This will prevent the imported object from being included in the compiled code and prevet circular dependencies.
- All imports in the [interfaces directory](./src/interfaces/) must be [helpers](./src/helpers/) or other interfaces from the directory itself and must be imported using the `import type` syntax.
- All code should be documented using [TypeDoc](https://typedoc.org/) comments.
- All code should be easily testable.
- Any code including more complex mathematical procedures should be isolated as a *Procedure* in the [procedures directory](./src/procedures/). If the procedure is not standard, its implementation should be documented in the [procedure documentation directory](./docs/procedures).
- Circular dependencies using standard imports are not allowed. If a circular dependency is needed, it must be done using the `import type` syntax. If the code requires a logical circular dependency, the code should be refactored.
- Functions or classes with cleanly isolated behaviour should be placed in the [helpers directory](./src/helpers/).
- All exports are defined in the [index.ts](./src/index.ts) file.
- When importing within the library, importing directly from the file, that contains the desired code, not it's reexports is preferred to prevent circular dependencies.
- Comments are written in English.
- While commenting is encouraged, the variable names should be descriptive enough to not need comments when possible.
- Properties and methods of classes should be private if possible.
- Properties of interfaces should be readonly if possible.
- Properties and methods of interfaces should have unique names. If a property or method is shared between multiple interfaces, it should expect the same type of behaviour.
- Interfaces should contain the minimal set of properties and methods needed to describe the behaviour of the object. If two behaviours should be on a single interface, create two interfaces and merge the into a sythetic interface.
- If two or more interfaces are being used together to describe a single object, they should be merged into a single sythetic interface in the [synthetic interfaces file](./src/interfaces/synthetic.ts).
- All interfaces should have their runtime equivalent in the [runtime interfaces file](./src/interfaces/runtimeInterfaces.ts).
  
## Testing

The library has automated *unit* testing and *e2e* testing. The only difference is in the scope of the test.

### Unit testing

The philosophy of a unit test is, that it test one component of the library. This test should be written together with the component. It mainly serves as a sanity check and to quickly catch and pinpoint any unintended side-effects by future changes. The unit tests are written using [Jest](https://jestjs.io/). The unit tests are located in the [unit tests](./tests/unit/) directory..

### E2E testing

The *e2e* testing of this library is just a set of tests, that test the library as a whole. These tests are written using [Jest](https://jestjs.io/). The e2e tests are located in the [e2e tests](./tests/e2e/) directory. The philosophy of the e2e tests is, that they should test some expected behaviour of the library. They're essentially a set of examples of how to use the library. They can also serve as internal documentation of the library.

## Documentation

The library has [internal](#internal-documentation) documentation, [basic](#basic-documentation) documentation and [API Reference](#api-reference).

### Internal documentation

This file together with the [procedures documentation](./docs/procedures/) and source code comments serves as the internal documentation of the library. It should contain all the information needed to understand the library and its source code needed to extend the library.

### Basic documentation

Basic documentation is in the form of the Readme and examples. It should contain all the information needed install the library and understand its basic usage. It should also contain a set of examples of how to use the most essential parts of the library.

### API Reference

The API reference is created automatically using [TypeDoc](https://typedoc.org/) on the website [geometryjs.jiricekcz.dev](https://geometryjs.jiricekcz.dev/) or [geometry-js.pages.dev](https://geometry-js.pages.dev/) for the main branch. It is also generated for the develop branch on the website [develop.geometry-js.pages.dev](https://develop.geometry-js.pages.dev/). These pages are autogenerated using [Cloudflare](https://www.cloudflare.com/) pages. To generate the API reference, run the following command:

```bash
npm run docs
```

It will create the HTML files in the [docs/api](./docs/api) directory. These files can then opened in a browser.

## Depedencies

Currently the library has no dependencies. If possible, it should stay that way.

## Publishing

The library is published via npm using the following command:

```bash
npm publish
```
