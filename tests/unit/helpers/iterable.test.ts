import { inIterable } from "../../../src/helpers";

describe("inIterable", () => {
    const a = [1, 2, 3, 4, 5];

    test("positive", () => {
        expect(inIterable(a, 1)).toBe(true);
        expect(inIterable(a, 2)).toBe(true);
        expect(inIterable(a, 3)).toBe(true);
        expect(inIterable(a, 4)).toBe(true);
        expect(inIterable(a, 5)).toBe(true);
    });
    test("negative", () => {
        expect(inIterable(a, 0)).toBe(false);
        expect(inIterable(a, undefined)).toBe(false);
    });
});
