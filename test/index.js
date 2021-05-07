const tests = require("./tests.js");
const GeometryJS = require("../build/index-module").default;

/**
 * @type {Array<{success: boolean, name: string, recieved: number, expected: number}>};
 */
const results = [];
for (const test of tests) {
    var r = true;
    test((num, num2, str) => {
        results.push({
            success: typeof num === "number" && typeof num2 === "number" ? GeometryJS.equals(num, num2) : num === num2,
            name: str,
            recieved: num,
            expected: num2
        });
        if (!(typeof num === "number" && typeof num2 === "number" ? GeometryJS.equals(num, num2) : num === num2)) r = false;
    });
    results.push({
        success: r,
        name: "Test function " + (tests.indexOf(test) + 1) + (test.name ? (" - " + test.name) : ""),
        expected: true,
        recieved: r
    });
}
const success = results.every(v => v.success);

loop: for (const result of results) {
    if (result.success) {
        console.log("\u001b[32mTest successful. \u001b[0mTest name: " + result.name,);
        continue loop;
    }
    console.log("\u001b[31mTest failed. \u001b[0mTest name: " + result.name);
    console.log(`   Value expected to be ${result.expected}, but instead was: ${result.recieved}`);
}
if (!success) throw new Error("At least one test failed.");