import { Foundational } from "../../../src/procedures/index";

describe("Pythagorean theorem", () => {
    test.each([[[3, 4], 5]])(`%p should be %p`, (sides, expected) => {
        expect(Foundational.PYTHAGOREAN_THEOREM.perform({
            values: sides,
        }).distance).toBe(expected);
    });
});
