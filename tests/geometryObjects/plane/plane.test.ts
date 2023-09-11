import { Plane } from "../../../src/geometryObjects/plane/plane";
describe("Plane", () => {
    test("constructor", () => {
        const plane = new Plane();
        expect(plane).toBeDefined();
    });

    const plane = new Plane();

    test("linkObject", () => {
        const object = new Plane();
        plane.linkObject(object);
        expect(plane.dependencies).toContain(object);
        expect(object.dependants).toContain(plane);
    });
})