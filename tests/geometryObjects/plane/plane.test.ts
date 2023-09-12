import { Plane } from "../../../src/geometryObjects/plane/plane";
import { ReadonlyValue } from "../../../src/geometryObjects/value/readonlyValue";
import * as Interfaces from "../../../src/interfaces";
describe("Plane", () => {
    test.concurrent("constructor", () => {
        const plane = new Plane();
        expect(plane).toBeDefined();
    });

    test.concurrent("linkObject", () => {
        const plane = new Plane();

        const object = new ReadonlyValue({value: 1, plane});
        plane.linkObject(object);
        expect(plane.dependencies).toContain(object);
        expect(object.dependants).toContain(plane);
    });

    test.concurrent("iterator", () => {
        const plane = new Plane();

        const object = new ReadonlyValue({value: 1, plane});
        plane.linkObject(object);
        expect([...plane]).toContain(object);
    });

    test.concurrent("ulinkObject", () => {
        const plane = new Plane();

        const object = new ReadonlyValue({value: 1, plane});;
        plane.linkObject(object);
        plane.ulinkObject(object);
        expect([...plane]).not.toContain(object);
    });

});
