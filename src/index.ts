/**
 * @namespace
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
