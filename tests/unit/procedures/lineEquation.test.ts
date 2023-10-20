import type { BareReadonlyVector, Point } from "../../../src/interfaces";

import { LINE_C_COEFFICIENT } from "../../../src/procedures/derived";
import { UnboundPoint } from "../../../src/geometryObjects/point";

describe("LineCCoefficient", () => {
    test.each([
        {
            input: {
                normalVector: [1, 0],
                point: new UnboundPoint({ x: 0, y: 0 })
            },
            output: {
                cCoefficient: 0,
            }
        },
        {
            input: {
                normalVector: [1, 0],
                point: new UnboundPoint({ x: 1, y: 0 })
            },
            output: {
                cCoefficient: -1,
            }
        },
        {
            input: {
                normalVector: [1, 0],
                point: new UnboundPoint({ x: -1, y: 0 })
            },
            output: {
                cCoefficient: 1,
            }
        },
        {
            input: {
                normalVector: [1, 0],
                point: new UnboundPoint({ x: 1, y: 1 })
            },
            output: {
                cCoefficient: -1,
            }
        }, 
        {
            input: {
                normalVector: [1, 3],
                point: new UnboundPoint({ x: 1, y: 1 })
            },
            output: {
                cCoefficient: -4,
            }
        },
        {
            input: {
                normalVector: [1, 3],
                point: new UnboundPoint({ x: 0, y: 0 })
            },
            output: {
                cCoefficient: 0
            }
        },
        {
            input: {
                normalVector: [2, 5],
                point: new UnboundPoint({ x: 10, y: 3 })
            },
            output: {
                cCoefficient: -35
            }
        }
    ] as { input: { normalVector: BareReadonlyVector, point: Point }, output: { cCoefficient: number } }[])("should be able to calaculate the c coefficent", ({ input, output }) => {
        const result = LINE_C_COEFFICIENT.perform(input);
        expect(result.cCoefficient).toBeCloseTo(output.cCoefficient);
    });
});