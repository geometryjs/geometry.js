import { GeometryJsError } from '../../../src/errors';
describe("Geomtery JS Error", () => {
    const error = new GeometryJsError("Test Error");

    test("should be an instance of Error", () => {
        expect(error).toBeInstanceOf(Error);
    });

    test("should have the correct name", () => {
        expect(error.name).toEqual("GeometryJsError");
    });

    test("should have the correct message", () => {
        expect(error.message).toEqual("Test Error");
    });

    test("should have the correct stack", () => {
        expect(error.stack).toBeDefined();
    });

    test("shoud be instance of GeometryJsError", () => {
        expect(error).toBeInstanceOf(GeometryJsError);
    });
})