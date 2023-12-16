import { LINE_LINE_INTERSECTION } from "../../../src/procedures/derived";

describe("Line Line Intersection", () => {
    const lineLinePairs = [
        {
            line1: {
                a: 1,
                b: 0,
                c: 0,
            },
            line2: {
                a: 0,
                b: 1,
                c: 0,
            },
            intersection: { x: 0, y: 0 },
            objectType: "point",
        },
        {
            line1: {
                a: 1,
                b: 0,
                c: 0,
            },
            line2: {
                a: 1,
                b: 0,
                c: 1,
            },
            intersection: null,
            objectType: "null",
        },
        {
            line1: {
                a: 1,
                b: 0,
                c: 0,
            },
            line2: {
                a: 1,
                b: 1,
                c: 0,
            },
            intersection: { x: 0, y: 0 },
            objectType: "point",
        },
        {
            line1: {
                a: 1,
                b: 1,
                c: 0,
            },
            line2: {
                a: 1,
                b: -1,
                c: 0,
            },
            intersection: { x: 0, y: 0 },
            objectType: "point",
        },
        {
            line1: {
                a: 1,
                b: 1,
                c: 0,
            },
            line2: {
                a: 1,
                b: 1,
                c: 0,
            },
            intersection: { a: 1, b: 1, c: 0 },
            objectType: "line",
        },
    ];

    test.each(lineLinePairs)("Line Line Intersection", ({ line1, line2, intersection, objectType }) => {
        const result = LINE_LINE_INTERSECTION.perform({ line1, line2 });
        expect(result.objectType).toEqual(objectType);
        if (result.objectType === "point") {
            expect(result.intersection.x).toBeCloseTo((intersection as { x: number, y: number }).x);
            expect(result.intersection.y).toBeCloseTo((intersection as { x: number, y: number }).y);
        } else if (result.objectType === "line") {
            expect(result.intersection.a).toBeCloseTo((intersection as { a: number, b: number, c: number }).a);
            expect(result.intersection.b).toBeCloseTo((intersection as { a: number, b: number, c: number }).b);
            expect(result.intersection.c).toBeCloseTo((intersection as { a: number, b: number, c: number }).c);
        }
    });
});