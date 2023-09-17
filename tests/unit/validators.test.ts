import { isDependencyNode, isDependencyNodeObject, isGeometryObject, isPoint, isPointObject, isSettableValue, isSettableValueObject, isValue, isValueObject } from "../../src/validators";
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

describe("isValue", () => {
    test("positive", () => {
        expect(isValue(x)).toBe(true);
        expect(isValue(y)).toBe(true);
    });
    test("negative", () => {
        expect(isValue(point)).toBe(false);
        expect(isValue(string)).toBe(false);
        expect(isValue(number)).toBe(false);
        expect(isValue(object)).toBe(false);
        expect(isValue(array)).toBe(false);
        expect(isValue(bigint)).toBe(false);
        expect(isValue(point)).toBe(false);
    });
});

describe("isValueObject", () => {
    test("positive", () => {
        expect(isValueObject(x)).toBe(true);
        expect(isValueObject(y)).toBe(true);
    });
    test("negative", () => {
        expect(isValueObject(point)).toBe(false);
        expect(isValueObject(string)).toBe(false);
        expect(isValueObject(number)).toBe(false);
        expect(isValueObject(object)).toBe(false);
        expect(isValueObject(array)).toBe(false);
        expect(isValueObject(bigint)).toBe(false);
        expect(isValueObject(point)).toBe(false);
    });
});

describe("isSettableValue", () => {
    test("positive", () => {
        expect(isSettableValue(x)).toBe(true);
    });
    test("negative", () => {
        expect(isSettableValue(y)).toBe(false);
        expect(isSettableValue(point)).toBe(false);
        expect(isSettableValue(string)).toBe(false);
        expect(isSettableValue(number)).toBe(false);
        expect(isSettableValue(object)).toBe(false);
        expect(isSettableValue(array)).toBe(false);
        expect(isSettableValue(bigint)).toBe(false);
        expect(isSettableValue(point)).toBe(false);
    });
});

describe("isSettableValueObject", () => {
    test("positive", () => {
        expect(isSettableValueObject(x)).toBe(true);
    });
    test("negative", () => {
        expect(isSettableValueObject(y)).toBe(false);
        expect(isSettableValueObject(point)).toBe(false);
        expect(isSettableValueObject(string)).toBe(false);
        expect(isSettableValueObject(number)).toBe(false);
        expect(isSettableValueObject(object)).toBe(false);
        expect(isSettableValueObject(array)).toBe(false);
        expect(isSettableValueObject(bigint)).toBe(false);
        expect(isSettableValueObject(point)).toBe(false);
    });
});

describe("isPoint", () => {
    test("positive", () => {
        expect(isPoint(point)).toBe(true);
    });
    test("negative", () => {
        expect(isPoint(x)).toBe(false);
        expect(isPoint(y)).toBe(false);
        expect(isPoint(string)).toBe(false);
        expect(isPoint(number)).toBe(false);
        expect(isPoint(object)).toBe(false);
        expect(isPoint(array)).toBe(false);
        expect(isPoint(bigint)).toBe(false);
    });
});

describe("isPointObject", () => {
    test("positive", () => {
        expect(isPointObject(point)).toBe(true);
    });
    test("negative", () => {
        expect(isPointObject(x)).toBe(false);
        expect(isPointObject(y)).toBe(false);
        expect(isPointObject(string)).toBe(false);
        expect(isPointObject(number)).toBe(false);
        expect(isPointObject(object)).toBe(false);
        expect(isPointObject(array)).toBe(false);
        expect(isPointObject(bigint)).toBe(false);
    });
});

describe("isDependencyNode", () => {
    test("positive", () => {
        expect(isDependencyNode(x)).toBe(true);
        expect(isDependencyNode(y)).toBe(true);
        expect(isDependencyNode(point)).toBe(true);
        expect(isDependencyNode(plane)).toBe(true);
    });
    test("negative", () => {
        expect(isDependencyNode(string)).toBe(false);
        expect(isDependencyNode(number)).toBe(false);
        expect(isDependencyNode(object)).toBe(false);
        expect(isDependencyNode(array)).toBe(false);
        expect(isDependencyNode(bigint)).toBe(false);
    });
});

describe("isDependencyNodeObject", () => {
    test("positive", () => {
        expect(isDependencyNodeObject(x)).toBe(true);
        expect(isDependencyNodeObject(y)).toBe(true);
        expect(isDependencyNodeObject(point)).toBe(true);
    });
    test("negative", () => {
        expect(isDependencyNodeObject(string)).toBe(false);
        expect(isDependencyNodeObject(number)).toBe(false);
        expect(isDependencyNodeObject(object)).toBe(false);
        expect(isDependencyNodeObject(array)).toBe(false);
        expect(isDependencyNodeObject(bigint)).toBe(false);
    });
});