import { BareReadonlyVector } from "../../../src/interfaces";
import { Foundational } from "../../../src/procedures/index";


describe("Vector Addition", () => {
    test.each([
        {
            input: {
                vectors: [[1, 2], [3, 4]],
            },
            output: {
                sumVector: [4, 6],
            },
        }
    ] as { input: { vectors: BareReadonlyVector[] }, output: { sumVector: BareReadonlyVector } }[])
        ("should add vectors", ({ input, output }) => {
            expect(Foundational.VECTOR_ADDITION.perform(input).sumVector).toStrictEqual(output.sumVector);
        });
});

describe("Vector Subtraction", () => {
    test.each([
        {
            input: {
                positive: [[1, 2], [3, 4]],
                negative: [[1, 1], [2, 2]],
            },
            output: {
                differenceVector: [1, 3],
            },
        }
    ] as { input: { positive: BareReadonlyVector[], negative: BareReadonlyVector[] }, output: { differenceVector: BareReadonlyVector } }[])
        ("should subtract vectors", ({ input, output }) => {
            expect(Foundational.VECTOR_SUBTRACTION.perform(input).differenceVector).toStrictEqual(output.differenceVector);
        });
});

describe("Vector By Scalar Multiplication", () => {
    test.each([
        {
            input: {
                vector: [1, 2],
                scalar: 2,
            },
            output: {
                resultVector: [2, 4],
            },
        },
        {
            input: {
                vector: [0, 0],
                scalar: 5,
            },
            output: {
                resultVector: [0, 0],
            },
        },
        {
            input: {
                vector: [1, 2],
                scalar: 0,
            },
            output: {
                resultVector: [0, 0],
            },
        },
        {
            input: {
                vector: [1, 2],
                scalar: -1,
            },
            output: {
                resultVector: [-1, -2],
            },
        },
    ] as { input: { vector: BareReadonlyVector, scalar: number }, output: { resultVector: BareReadonlyVector } }[])
        ("should multiply vector by scalar", ({ input, output }) => {
            expect(Foundational.VECTOR_BY_SCALAR_MULTIPLICATION.perform(input).resultVector).toStrictEqual(output.resultVector);
        });
});


describe("Vector dot product", () => {
    test.each([
        {
            input: {
                vector1: [1, 2],
                vector2: [3, 4],
            },
            output: {
                dotProduct: 11,
            },
        },
        {
            input: {
                vector1: [0, 0],
                vector2: [1, 1],
            },
            output: {
                dotProduct: 0,
            },
        },
        {
            input: {
                vector1: [1, 2],
                vector2: [-1, -2],
            },
            output: {
                dotProduct: -5,
            },
        },
    ] as { input: { vector1: BareReadonlyVector, vector2: BareReadonlyVector }, output: { dotProduct: number } }[])
        ("should calculate dot product of vectors", ({ input, output }) => {
            expect(Foundational.VECTOR_DOT_PRODUCT.perform(input).product).toStrictEqual(output.dotProduct);
        });
});

describe("Vector magnitude", () => {
    test.each([
        {
            input: {
                vector: [1, 2],
            },
            output: {
                magnitude: Math.sqrt(5),
            },
        },
        {
            input: {
                vector: [0, 0],
            },
            output: {
                magnitude: 0,
            },
        },
        {
            input: {
                vector: [3, 4],
            },
            output: {
                magnitude: 5,
            },
        },
    ] as { input: { vector: BareReadonlyVector }, output: { magnitude: number } }[])
        ("should calculate vector magnitude", ({ input, output }) => {
            expect(Foundational.VECTOR_MAGNITUDE.perform(input).magnitude).toStrictEqual(output.magnitude);
        })
})


describe("Vector Normalization", () => {
    test.each([
        {
            input: {
                vector: [3, 4],
                length: 5,
            },
            output: {
                resultVector: [3, 4],
            },
        },
        {
            input: {
                vector: [0, 0],
                length: 0,
            },
            output: {
                resultVector: [NaN, NaN],
            },
        },
        {
            input: {
                vector: [1, 0],
                length: 1,
            },
            output: {
                resultVector: [1, 0],
            },
        },
    ] as { input: { vector: BareReadonlyVector, length: number }, output: { resultVector: BareReadonlyVector } }[])
        ("should normalize vector", ({ input, output }) => {
            expect(Foundational.VECTOR_NORMALIZATION.perform(input).resultVector).toStrictEqual(output.resultVector);
        })
});
