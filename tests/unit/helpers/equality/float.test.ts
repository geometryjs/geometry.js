import { EQUALITY_OPTIONS, getEqualityOptions, isEqual, isZero, setEqualityOptions } from "../../../../src/helpers/equality/float";
describe("Float equality", () => {
    const equalities = [
        [0, 0, true],
        [1, 1, true],
        [1, 0, false],
        [0, 1, false],
        [1, 2, false],
        [2, 1, false],
        [0, 0.0001, false],
        [0.0001, 0.02, false],
        [0.0001, 0, false],
        [1e50, 1e50 + 1, true],
        [1.00000000001, 1.00000000002, false],
        [1.00000000001, NaN, false],
        [1.000000000000001, 1.000000000000002, true],
        [2 / 3, 2 / 3, true],
        [Math.sqrt(2), Math.sqrt(2) / 2 * 3 / 6 * 4, true],
    ] as const;

    test.each(equalities)("Equality of %p and %p should be %p", (a, b, expected) => {
        expect(isEqual(a, b)).toBe(expected);
    });

    const zeros = [
        0.000000000001
        - 0.000000000001,
        0,
        -0,
    ]

    test.each(zeros)("should be zero", a => {
        expect(isZero(a)).toBe(true);
    });

    const nonZeros = [
        NaN,
        Infinity,
        -Infinity,
        1,
        1e60,
        0.000001
    ];

    test.each(nonZeros)("should not be zero", a => {
        expect(isZero(a)).toBe(false);
    });

    test("getEqualityOptions", () => {
        expect(getEqualityOptions()).toStrictEqual(EQUALITY_OPTIONS.DOUBLE);
    })

    test("setEqualityOptions", () => {
        setEqualityOptions(EQUALITY_OPTIONS.FULL_DOUBLE);

        expect(getEqualityOptions()).toStrictEqual(EQUALITY_OPTIONS.FULL_DOUBLE);

        setEqualityOptions(EQUALITY_OPTIONS.DOUBLE);
    });
});