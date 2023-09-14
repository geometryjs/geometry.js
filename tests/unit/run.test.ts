import * as GeometryJS from "../../src";

describe("Library", () => {
    test("exports", () => {
        expect(GeometryJS).toBeDefined();
        expect(GeometryJS.createPlane).toBeDefined();
        expect(GeometryJS.Helpers).toBeDefined();
        expect(GeometryJS.Interfaces).toBeDefined();
        expect(GeometryJS.Objects).toBeDefined();
        expect(GeometryJS.Procedures).toBeDefined();
    });
});
