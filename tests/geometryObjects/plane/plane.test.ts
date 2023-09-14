import { Plane } from "../../../src/geometryObjects/plane/plane";
import { ReadonlyValue } from "../../../src/geometryObjects/value/readonlyValue";
import * as Interfaces from "../../../src/interfaces/runtimeInterfaces";
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

describe("Plane facotry methods", () => {
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


});
