# Documentation for the internal API

- [Documentation for the internal API](#documentation-for-the-internal-api)
  - [Library source code](#library-source-code)
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
- When exporting anything, it should be exported by the index.ts file of the directory it is in. This index.ts file can then be imported by the index.ts file of the parent directory.
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
