import { isEqual } from "../../../../src/helpers/equality/float";
describe("Float equality", () => {
    const equalities = [
        [0, 0, true],
        [1, 1, true],
        [1, 0, false],
        [0, 1, false],
        [1, 2, false],
        [2, 1, false],
        [0, 0.0001, false],
        [0.0001, 0, false],
        [1e50, 1e50 + 1, true],
        [2/3, 2/3, true],
        [Math.sqrt(2), Math.sqrt(2) / 2 * 3 / 6 * 4 , true],
    ] as const;

    test.each(equalities)("Equality of %p and %p should be %p", (a, b, expected) => {
        expect(isEqual(a, b)).toBe(expected);
    });
});