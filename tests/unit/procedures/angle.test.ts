import { BareReadonlyVector } from "../../../src/interfaces";
import { Foundational } from "../../../src/procedures";

const cases: { input: { vector1: BareReadonlyVector, vector2: BareReadonlyVector }, output: { angle: number } }[] = [
    {
        input: {
            vector1: [1, 0],
            vector2: [0, 1],
        },
        output: {
            angle: Math.PI / 2,
        }
    },
    {
        input: {
            vector1: [1, 0],
            vector2: [1, 0],
        },
        output: {
            angle: 0,
        }
    },
    {
        input: {
            vector1: [1, 0],
            vector2: [-1, 0],
        },
        output: {
            angle: Math.PI,
        }
    },
    {
        input: {
            vector1: [1, 1],
            vector2: [-1, -1],
        },
        output: {
            angle: Math.PI,
        }
    },
    {
        input: {
            vector1: [1, 1],
            vector2: [1, 1],
        },
        output: {
            angle: 0,
        }
    },
    {
        input: {
            vector1: [1, 1],
            vector2: [0, 1],
        },
        output: {
            angle: Math.PI / 4,
        }
    },
    {
        input: {
            vector1: [1, 1],
            vector2: [1, 0],
        },
        output: {
            angle: Math.PI / 4,
        }

    },
    {
        input: {
            vector1: [1, 1],
            vector2: [-1, 1],
        },
        output: {
            angle: Math.PI / 2,
        }
    },
    {
        input: {
            vector1: [1, 1],
            vector2: [-1, 0],
        },
        output: {
            angle: 3 * Math.PI / 4,
        }
    },
];

describe("VectorAngle", () => {
    test.each(cases)
        ("should calculate the angle between two vectors", ({ input, output }) => {
            const result = Foundational.VECTOR_ANGLE.perform(input);
            expect(result.angle).toBeCloseTo(output.angle);
        });
});
describe("LineAngle", () => {
    test.each(cases.map(({ input, output }) => {
        return {
            input: {
                line1Vector: input.vector1,
                line2Vector: input.vector2,
            },
            output: {
                angle: output.angle > Math.PI / 2 ? Math.PI - output.angle : output.angle,
            }
        }
    }))
        ("should calculate the angle between two lines", ({ input, output }) => {
            const result = Foundational.LINE_ANGLE.perform(input);
            expect(result.angle).toBeCloseTo(output.angle);
        });
});

