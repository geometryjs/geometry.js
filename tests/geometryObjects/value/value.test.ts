import { Plane } from "../../../src/geometryObjects/plane/plane";

import { ReadonlyValue } from "../../../src/geometryObjects/value/readonlyValue";
describe("ReadonlyValue", () => {
    const plane = new Plane();
    test("retains value", () => {
        const value = new ReadonlyValue({ value: 1, plane });
        
        expect(value.value).toBe(1);
    });
});

import { SettableValue } from "../../../src/geometryObjects/value/settableValue";
describe("SettableValue", () => {
    const plane = new Plane();
    test("retains value", () => {
        const value = new SettableValue({ value: 1, plane });
        
        expect(value.value).toBe(1);
    });

    test("sets value", () => {
        const value = new SettableValue({ value: 1, plane });
        value.value = 2;
        
        expect(value.value).toBe(2);
    });

    test("updates on set", () => {
        const mockUpdate = jest.fn();

        const value = new SettableValue({ value: 1, plane });
        value.update = mockUpdate;

        value.value = 2;

        expect(mockUpdate).toHaveBeenCalled();
    });
});