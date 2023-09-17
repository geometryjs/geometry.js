import { isGeometryObject } from "../../src/validators";
import { Plane } from "../../src/geometryObjects/plane/plane";

const plane = new Plane();
const x = plane.createValue(1);
const y = plane.createReadonlyValue(2);
const point = plane.createPointFromTwoValues(x, y);

const string = "testing_string";
const number = 1;
const object = { a: 1 };
const array = [1, 2, 3];
const bigint = BigInt(1);

describe("isGeometryObject", () => {
    test("positive", () => {
        expect(isGeometryObject(x)).toBe(true);
        expect(isGeometryObject(y)).toBe(true);
        expect(isGeometryObject(point)).toBe(true);
    });
    test("negative", () => {
        expect(isGeometryObject(string)).toBe(false);
        expect(isGeometryObject(number)).toBe(false);
        expect(isGeometryObject(object)).toBe(false);
        expect(isGeometryObject(array)).toBe(false);
        expect(isGeometryObject(bigint)).toBe(false);
    });
});
