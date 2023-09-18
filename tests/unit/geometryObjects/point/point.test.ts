import { ReadonlyValue } from "../../../../src/geometryObjects/value/readonlyValue";
import { SettableValue } from "../../../../src/geometryObjects/value/settableValue";

import { PointFromTwoValues } from "../../../../src/geometryObjects/point/pointFromTwoValues";
import { Plane } from "../../../../src/geometryObjects/plane/plane";
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

    test("info", () => {
        const x = new SettableValue({ value: 3, plane });
        const y = new SettableValue({ value: 4, plane});

        const point = new PointFromTwoValues({ x, y, plane });

        expect(point.info.canCauseUpdate).toBe(false);
    });
});
