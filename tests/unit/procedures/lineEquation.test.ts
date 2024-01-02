import type { BareReadonlyVector, Point } from "../../../src/interfaces";

import { LINE_C_COEFFICIENT } from "../../../src/procedures/derived";
import { UnboundPoint } from "../../../src/geometryObjects/point";
import { LINES_PARALLEL } from "../../../src/procedures/derived/lineEquation";

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

describe("LinesParallel", () => {
    const parallelLineSeqences: { lines: { a: number, b: number, c: number }[] }[] = [
        { lines: [{ a: 1, b: 0, c: 0 }, { a: 1, b: 0, c: 1 }] },
        { lines: [{ a: 1, b: 0, c: 0 }, { a: 1, b: 0, c: -1 }] },
        { lines: [{ a: 3, b: 0, c: 5 }, { a: 5, b: 0, c: 2 }] },
        { lines: [{ a: 6, b: 0, c: 461 }, { a: 1, b: 0, c: -2 }] },
        { lines: [{ a: 1, b: 0, c: -12 }, { a: 0.1, b: 0, c: 3 }] },
        { lines: [{ a: 1, b: 2, c: 0 }, { a: 2, b: 4, c: 0 }] },
    ];

    const nonParallelLineSeqences: { lines: { a: number, b: number, c: number }[] }[] = [
        { lines: [{ a: 1, b: 0, c: 0 }, { a: 0, b: 1, c: 0 }] },
        { lines: [{ a: 15, b: 0, c: 0 }, { a: 551511, b: 1e9, c: 1 }] },
        { lines: [{ a: 1, b: 216, c: 0 }, { a: 4110, b: .231, c: -1 }] },
        { lines: [{ a: 140, b: 63510, c: 0 }, { a: 56560, b: 1.51, c: 2 }] },
        { lines: [{ a: 1, b: 6465840, c: 0 }, { a: 798, b: 0.000001, c: -2 }] },
        { lines: [{ a: 46565, b: 159, c: 0 }, { a: 0.12, b: 16541, c: 3 }] },
    ];

    test.each(parallelLineSeqences)("should return true for parallel lines", ({ lines }) => {
        const result = LINES_PARALLEL.perform({ lines });
        expect(result.parallel).toBe(true);
    });

    test.each(nonParallelLineSeqences)("should return false for non-parallel lines", ({ lines }) => {
        const result = LINES_PARALLEL.perform({ lines });
        expect(result.parallel).toBe(false);
    });
});