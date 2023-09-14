/**
 * @namespace
 * Includes interfaces used by the library.  
 * Also includes constant, that are used to represent interfaces at runtime.
 */
export * as Interfaces from "./interfaces";

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
