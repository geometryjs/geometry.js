import { POINT_FROM_LINE_DISTANCE } from "../../../src/procedures/foundational";

describe("Line Point Distance", () => {
    const linePointPairs = [
        {
            line: {
                a: 1,
                b: 0,
                c: 0,
            },
            point: {
                x: 0,
                y: 0,
            },
            distance: 0,
        },
        {
            line: {
                a: 1,
                b: 0,
                c: 0,
            },
            point: {
                x: 1,
                y: 0,
            },
            distance: 1,
        },
        {
            line: {
                a: 1,
                b: 0,
                c: 0,
            },
            point: {
                x: -1,
                y: 0,
            },
            distance: 1,
        },
        {
            line: {
                a: 1,
                b: 0,
                c: 0,
            },
            point: {
                x: 1,
                y: 1,
            },
            distance: 1,
        },
        {
            line: {
                a: 1,
                b: 3,
                c: 0,
            },
            point: {
                x: 0,
                y: 0,
            },
            distance: 0,
        },
        {
            line: {
                a: 2,
                b: 5,
                c: 0,
            },
            point: {
                x: 0,
                y: 0,
            },
            distance: 0,
        },
        
        
    ] satisfies {line: {a: number, b: number, c: number}, point: {x: number, y: number}, distance: number}[];

    test.each(linePointPairs)("Distance from line %p to point %p should be %p", ({line, point, distance}) => {
        expect(POINT_FROM_LINE_DISTANCE.perform({line, point}).distance).toBeCloseTo(distance);
    });
});