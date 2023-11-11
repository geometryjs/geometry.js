import { ReadonlyValue } from "../../../../src/geometryObjects/value/readonlyValue";
import { SettableValue } from "../../../../src/geometryObjects/value/settableValue";

import { PointFromTwoValues } from "../../../../src/geometryObjects/point/pointFromTwoValues";
import { Plane } from "../../../../src/geometryObjects/plane/plane";
import { UnboundPoint } from "../../../../src/geometryObjects/point";
import { UnboundVector } from "../../../../src/geometryObjects/vector";
describe("PointFromTwoValues", () => {
    const plane = new Plane();
    test("retains values", () => {
        const x = new ReadonlyValue({ value: 1, plane});
        const y = new ReadonlyValue({ value: 2, plane});

        const point = new PointFromTwoValues({ x, y, plane });

        expect(point.x).toBe(1);
        expect(point.y).toBe(2);
    });
    test("updates on set", () => {
        const x = new SettableValue({ value: 1, plane });
        const y = new SettableValue({ value: 2, plane });

        const point = new PointFromTwoValues({ x, y, plane });

        x.value = 3;
        y.value = 4;

        expect(point.x).toBe(3);
        expect(point.y).toBe(4);
    });

    test("can calculate distance from origin", () => {
        const x = new SettableValue({ value: 3, plane });
        const y = new SettableValue({ value: 4, plane});

        const point = new PointFromTwoValues({ x, y, plane });

        expect(point.distanceFromOrigin).toBe(5);
    });

    test("can be converted to vector", () => {
        const x = new SettableValue({ value: 1, plane });
        const y = new SettableValue({ value: 2, plane});

        const point = new PointFromTwoValues({ x, y, plane });

        expect(point.toVector().toBare()).toStrictEqual([1, 2]);
    });
    
    test("info", () => {
        const x = new SettableValue({ value: 3, plane });
        const y = new SettableValue({ value: 4, plane});

        const point = new PointFromTwoValues({ x, y, plane });

        expect(point.info.canCauseUpdate).toBe(false);
    });
});

describe("PointFromCoordinates", () => {
    const plane = new Plane();

    test("can be created", () => {
        const point = plane.createPointFromCoordinates(1, 2);
        expect(point).toBeDefined();
        expect(point.x).toBe(1);
        expect(point.y).toBe(2);
    });    

    test("can calculate distance from origin", () => {
        const point = plane.createPointFromCoordinates(3, 4);

        expect(point.distanceFromOrigin).toBe(5);
    });

    test("can be converted to vector", () => {
        const point = plane.createPointFromCoordinates(1, 2);

        expect(point.toVector().toBare()).toStrictEqual([1, 2]);
    });

    test("can be a point for a line", () => {
        const point1 = plane.createPointFromCoordinates(1, 2);
        const point2 = plane.createPointFromCoordinates(3, 4);

        const line = plane.createLineFromTwoPoints(point1, point2);

        expect(line).toBeDefined();

        const a = line.a;

        point1.x = 5;
        point2.y = 6;
        expect(a).not.toBe(line.a);
    });
});

describe("UnboundPoint", () => {
    test("can be created", () => {
        const point = new UnboundPoint({ x: 1, y: 2 });
        expect(point).toBeDefined();
    });

    test("keeps values", () => {
        const point = new UnboundPoint({ x: 1, y: 2 });
        expect(point.x).toBe(1);
        expect(point.y).toBe(2);
    });

    test("can calculate distance from origin", () => {
        const point = new UnboundPoint({ x: 3, y: 4 });

        expect(point.distanceFromOrigin).toBe(5);
    });

    test("can be converted to vector", () => {
        const point = new UnboundPoint({ x: 1, y: 2 });

        expect(point.toVector().toBare()).toStrictEqual([1, 2]);
    });
    
    test("can be created from vector", () => {
        const point = UnboundPoint.fromVector(UnboundVector.fromBare([1, 2]));

        expect(point.x).toBe(1);
        expect(point.y).toBe(2);
    });

    test("can be created from point", () => {
        const point = UnboundPoint.fromPoint(new UnboundPoint({ x: 1, y: 2 }));

        expect(point.x).toBe(1);
        expect(point.y).toBe(2);
    });

    test("can be created from bare vector", () => {
        const point = UnboundPoint.fromBareVector([1, 2]);

        expect(point.x).toBe(1);
        expect(point.y).toBe(2);
    });
});