import { Plane } from "../../../../src/geometryObjects/plane/plane";
import { ReadonlyValue } from "../../../../src/geometryObjects/value/readonlyValue";
describe("Plane", () => {
    test.concurrent("constructor", () => {
        const plane = new Plane();
        expect(plane).toBeDefined();
    });

    test.concurrent("linkObject", () => {
        const plane = new Plane();

        const object = new ReadonlyValue({ value: 1, plane });
        plane.linkObject(object);
        expect(plane.dependencies).toContain(object);
        expect(object.dependants).toContain(plane);
    });

    test.concurrent("iterator", () => {
        const plane = new Plane();

        const object = new ReadonlyValue({ value: 1, plane });
        plane.linkObject(object);
        expect([...plane]).toContain(object);
    });

    test.concurrent("ulinkObject", () => {
        const plane = new Plane();

        const object = new ReadonlyValue({ value: 1, plane });;
        plane.linkObject(object);
        plane.ulinkObject(object);
        expect([...plane]).not.toContain(object);
    });
});

describe("Plane create methods", () => {
    const plane = new Plane();
    test("createReadonlyValue", () => {
        const value = plane.createReadonlyValue(1);
        expect(value.plane).toBe(plane);
        expect(plane).toContain(value); 
    });
    
    test("createValue", () => {
        const value = plane.createValue(1);
        expect(value.plane).toBe(plane);
        expect(plane).toContain(value); 
    });

    test("createPointFromTwoValues", () => {
        const x = plane.createValue(1);
        const y = plane.createValue(1);
        const point = plane.createPointFromTwoValues(x, y);
        expect(point.plane).toBe(plane);
        expect(plane).toContain(point);
    });

    test("createLineFromTwoPoints", () => {
        const point1 = plane.createPointFromTwoValues(plane.createValue(1), plane.createValue(1));
        const point2 = plane.createPointFromTwoValues(plane.createValue(1), plane.createValue(1));
        const line = plane.createLineFromTwoPoints(point1, point2);
        expect(line.plane).toBe(plane);
        expect(plane).toContain(line);
    });
});

describe("plane construct methods", () => {
    test("constructParallelLineFromPoint", () => {
        const plane = new Plane();
        const line = plane.createLineFromTwoPoints(plane.createPointFromTwoValues(plane.createValue(1), plane.createValue(1)), plane.createPointFromTwoValues(plane.createValue(1), plane.createValue(1)));
        const parallelLine = plane.constructParallelLineFromPoint(line, plane.createPointFromTwoValues(plane.createValue(1), plane.createValue(1)));
        expect(parallelLine).toBeDefined();
        expect(parallelLine.plane).toBe(plane);
        expect(plane).toContain(parallelLine);
    });
    test("constructPerpendicularLineFromPoint", () => {
        const plane = new Plane();
        const line = plane.createLineFromTwoPoints(plane.createPointFromTwoValues(plane.createValue(1), plane.createValue(1)), plane.createPointFromTwoValues(plane.createValue(1), plane.createValue(1)));
        const perpendicularLine = plane.constructPerpendicularLineFromPoint(line, plane.createPointFromTwoValues(plane.createValue(1), plane.createValue(1)));
        expect(perpendicularLine).toBeDefined();
        expect(perpendicularLine.plane).toBe(plane);
        expect(plane).toContain(perpendicularLine);
    });
});
