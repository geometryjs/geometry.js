import * as GeometryJS from "../../src";

describe("Creating objects", () => {
    test("createPlane with points", () => {
        const plane = GeometryJS.createPlane();

        expect(plane).toBeDefined();

        const x = plane.createValue(1);
        const y = plane.createValue(1);

        const point = plane.createPointFromTwoValues(x, y);

        expect(point.x).toBe(1);
        expect(point.y).toBe(1);
        expect(point.distanceFromOrigin).toBeCloseTo(Math.sqrt(2));

        x.value = 2;

        expect(point.x).toBe(2);
        expect(point.y).toBe(1);
        expect(point.distanceFromOrigin).toBeCloseTo(Math.sqrt(5));

        for (const object of plane) {
            expect(object).toBeDefined();
        }

        plane.ulinkObject(point);
        plane.ulinkObject(x);
        plane.ulinkObject(y);

        expect([...plane]).toHaveLength(0);
    });
});
