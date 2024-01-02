import { UnboundNullObject } from "../../../src/geometryObjects"

describe("Unbound null object", () => {
    const nullObjectNV = UnboundNullObject.createNonVirtual();
    const nullObjectV = UnboundNullObject.createVirtual();

    test("Null object is virtual", () => {
        expect(nullObjectV.virtual).toBe(true);
    });

    test("Null object is not virtual", () => {
        expect(nullObjectNV.virtual).toBe(false);
    });
})