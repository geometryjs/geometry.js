import { Plane } from "../../../src/geometryObjects/plane/plane";
import * as Interfaces from "../../../src/interfaces";
describe("Plane", () => {
    test.concurrent("constructor", () => {
        const plane = new Plane();
        expect(plane).toBeDefined();
    });

    test.concurrent("linkObject", () => {
        const plane = new Plane();

        const object = new Plane();
        plane.linkObject(object);
        expect(plane.dependencies).toContain(object);
        expect(object.dependants).toContain(plane);
    });

    test.concurrent("iterator", () => {
        const plane = new Plane();

        const object = new Plane();
        plane.linkObject(object);
        expect([...plane]).toContain(object);
    });

    test.concurrent("ulinkObject", () => {
        const plane = new Plane();

        const object = new Plane();
        plane.linkObject(object);
        plane.ulinkObject(object);
        expect([...plane]).not.toContain(object);
    });

    test.concurrent("implements", () => {
        const plane = new Plane();
        const interfaces = [...plane.getImplementedInterfaces()];
        const expectedInterfaces = Interfaces.Plane;

        for (const expectedInterface of expectedInterfaces) {
            expect(interfaces).toContain(expectedInterface);
        }
    });
});
