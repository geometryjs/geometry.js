/**
 * The main module of the library.
 * The public API is exported from here as part of other namespaces or direct to use functions.
 *
 * @packageDocumentation
 */

/**
 * Includes interfaces used by the library.
 * Also includes constant, that are used to represent interfaces at runtime.
 *
 * @namespace
 */
export * as Interfaces from "./interfaces";

/**
 * Procedures are pure functions that take an input and return an output. They are designed to perform logic on data.
 * Most of the library's procedures are used to extract mathematical operations from the library's core into one place.
 *
 * @namespace
 */
export * as Procedures from "./procedures";

/**
 * Helper functions, classes and types, that are used internally by the library, but aren't dependant on other parts of the library.
 *
 * @namespace
 */
export * as Helpers from "./helpers";

/**
 * All classes that represent geometry objects of the library.
 */
export * as Objects from "./geometryObjects";

// Internal code

/**
 * @internal
 */
function main() {
    console.log("Hello, world!");
}

if (require.main === module) {
    main();
}
