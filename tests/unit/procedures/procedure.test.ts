import { Procedure } from "../../../src/procedures/procedure";
describe("Procedure", () => {
    test("Should be namable", () => {
        const procedureName = "procedureName";

        const procedure = new Procedure({
            name: procedureName,
            procedure: () => ({}),
        });

        expect(procedure.name).toBe(procedureName);
    });
    test("Should be performable", () => {
        const mockFn = jest.fn();

        const procedure = new Procedure({
            name: "procedureName",
            procedure: mockFn,
        });

        procedure.perform({});
        expect(mockFn).toBeCalledTimes(1);
    });

    test("evaluate should be the same as perform", () => {
        const mockFn = jest.fn();

        const procedure = new Procedure({
            name: "procedureName",
            procedure: mockFn,
        });

        procedure.evaluate({});
        expect(mockFn).toBeCalledTimes(1);
    });
});
