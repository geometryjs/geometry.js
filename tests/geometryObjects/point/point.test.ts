import { ReadonlyValue } from "../../../src/geometryObjects/value/readonlyValue";
import { SettableValue } from "../../../src/geometryObjects/value/settableValue";

import { PointFromTwoValues } from "../../../src/geometryObjects/point/pointFromTwoValues";
describe("PointFromTwoValues", () => {
    test("retains values", () => {
        const x = new ReadonlyValue({ value: 1 });
        const y = new ReadonlyValue({ value: 2 });

        const point = new PointFromTwoValues({ x, y });

        expect(point.x).toBe(1);
        expect(point.y).toBe(2);
    });
    test("updates on set", () => {
        const x = new SettableValue({ value: 1 });
        const y = new SettableValue({ value: 2 });

        const point = new PointFromTwoValues({ x, y });

        x.value = 3;
        y.value = 4;

        expect(point.x).toBe(3);
        expect(point.y).toBe(4);
    });

    test("can calculate distance from origin", () => {
        const x = new SettableValue({ value: 3 });
        const y = new SettableValue({ value: 4 });

        const point = new PointFromTwoValues({ x, y });

        expect(point.distanceFromOrigin).toBe(5);
    });
});
