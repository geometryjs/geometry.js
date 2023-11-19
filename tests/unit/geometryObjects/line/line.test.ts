import type { Line, LineWithSettableEquation, SingleParametricCurve } from "../../../../src/interfaces";

import { UnboundLine } from "../../../../src/geometryObjects/line";
import { UnboundPoint } from "../../../../src/geometryObjects/point";
import { UnboundVector } from "../../../../src/geometryObjects/vector";

import { createPlane } from "../../../../src/";


describe("Line", () => {
    const plane = createPlane();

    const value1 = plane.createValue(1);
    const value2 = plane.createReadonlyValue(2);

    const point1 = plane.createPointFromCoordinates(3, 4);
    const point2 = plane.createPointFromTwoValues(value1, value2);

    const vector1 = plane.createVectorFromCoordinates(5, 6);
    const vector2 = plane.createVectorFromTwoValues(value1, value2);

    const settableEquationLines: LineWithSettableEquation[] = [
        UnboundLine.fromEquation(1, 2, 3),
        UnboundLine.fromEquation(4, 5, 6),
        plane.createLineFromEquationAsNumbers(1, 2, 3),
        UnboundLine.fromLine(plane.createLineFromEquationAsNumbers(1, 2, 3)),
    ]
    
    const lines: (Line)[] = [
        ...settableEquationLines,
        UnboundLine.fromPointAndDirectionalVector(UnboundPoint.fromCoordinates(1, 2), UnboundVector.fromCoordinates(3, 4)),
        UnboundLine.fromPointAndNormalVector(UnboundPoint.fromCoordinates(5, 6), UnboundVector.fromCoordinates(7, 8)),
        UnboundLine.fromPoints(UnboundPoint.fromCoordinates(9, 10), UnboundPoint.fromCoordinates(11, 12)),
        plane.createLineFromEquationAsValues(value1, value2, value1),
        plane.createLineFromPointAndDirectionalVector(point1, vector1),
        plane.createLineFromPointAndNormalVector(point2, vector2),
        plane.createLineFromTwoPoints(point1, point2),
        plane.constructParallelLineFromPoint(plane.createLineFromTwoPoints(point1, point2), point1),
        plane.constructPerpendicularLineFromPoint(plane.createLineFromTwoPoints(point1, point2), point1),
    ]


    test.each(lines)("should be defined", (line) => {
        expect(line).toBeDefined();
    });

    test.each(lines)("should have a normal vector", (line) => {
        expect(line.normalVector).toBeDefined();
    });

    test.each(lines)("should have a directional vector", (line) => {
        expect(line.directionalVector).toBeDefined();
    });

    test.each(lines)("should have an arbitrary point 1", (line) => {
        expect(line.arbitraryPoint1).toBeDefined();
    });

    test.each(lines)("should have an arbitrary point 2", (line) => {
        expect(line.arbitraryPoint2).toBeDefined();
    });

    test.each(lines)("should have an x-axis angle", (line) => {
        expect(line.xAxisAngle).toBeDefined();
    });

    test.each(lines)("should have a b coefficient", (line) => {
        expect(line.b).toBeDefined();
    });

    test.each(lines)("should have a c coefficient", (line) => {
        expect(line.c).toBeDefined();
    });

    test.each(lines)("should have an a coefficient", (line) => {
        expect(line.a).toBeDefined();
    });

    test.each(lines)("normal vector should be perpendicular to directional vector", (line) => {
        expect(line.normalVector.dotProduct(line.directionalVector)).toBeCloseTo(0);
    });

    test.each(lines)("interval should include any number", (line) => {
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 1e212, 1e-212, -1e21];
        numbers.forEach((number) => {
            expect(line.interval.isInside(number)).toBe(true);
        });
    });

    test.each(lines)("parametric curve should be callable at any number", (line) => {
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        numbers.forEach((number) => {
            const p = line.atParameterValue(number);
            const t = line.evaluate(number);

            expect(line.a * p.x + line.b * p.y).toBeCloseTo(-line.c);
            expect(line.a * t.x + line.b * t.y).toBeCloseTo(-line.c);
        });
    });

    test.each(settableEquationLines)("should be settable by equation", (line) => {
        const newA = 1;
        const newB = 2;
        const newC = 3;

        line.a = newA;
        line.b = newB;
        line.c = newC;

        expect(line.a).toBe(newA);
        expect(line.b).toBe(newB);
        expect(line.c).toBe(newC);
    });
})