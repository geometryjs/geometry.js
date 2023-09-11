import { ReadonlyValue } from "../../../src/geometryObjects/value/readonlyValue";
describe("ReadonlyValue", () => {
    test("retains value", () => {
        const value = new ReadonlyValue({ value: 1 });
        
        expect(value.value).toBe(1);
    });
});

import { SettableValue } from "../../../src/geometryObjects/value/settableValue";
describe("SettableValue", () => {
    test("retains value", () => {
        const value = new SettableValue({ value: 1 });
        
        expect(value.value).toBe(1);
    });

    test("sets value", () => {
        const value = new SettableValue({ value: 1 });
        value.value = 2;
        
        expect(value.value).toBe(2);
    });

    test("updates on set", () => {
        const mockUpdate = jest.fn();

        const value = new SettableValue({ value: 1 });
        value.update = mockUpdate;

        value.value = 2;

        expect(mockUpdate).toHaveBeenCalled();
    });
});