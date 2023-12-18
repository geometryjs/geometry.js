import { isDependencyNode, isDependencyNodeObject, isGeometryObject, isInterval, isIntervalObject, isLine, isLineObject, isNonVirtualObject, isNull, isObjectWithType, isPoint, isPointObject, isSettableValue, isSettableValueObject, isUnion, isValue, isValueObject, isVector, isVectorObject, isVirtualObject } from "../../src/validators";
import { Plane } from "../../src/geometryObjects/plane/plane";
import { UnboundInterval, UnboundLine, UnboundPoint, UnboundUnion, UnboundVector } from "../../src/geometryObjects";
import { NullObject } from "../../src/interfaces/objectWithType";

const plane = new Plane();
const x = plane.createValue(1);
const y = plane.createReadonlyValue(2);
const point = plane.createPointFromTwoValues(x, y);
const vector = plane.createVectorFromTwoValues(x, y);
const line = plane.createLineFromPointAndDirectionalVector(point, vector);
const unboundPoint = UnboundPoint.fromPoint(point);
const unboundVector = UnboundVector.fromVector(vector);
const unboundLine = UnboundLine.fromLine(line);
const interval = plane.createClosedIntervalFromEndpointsAsNumbers(1, 2);
const unboundInterval = new UnboundInterval(interval);
const union = new UnboundUnion([unboundPoint, unboundLine]);
const virtualNullObject: NullObject = {
    objectType: "null",
    virtual: true
}
const nonVirtualNullObject: NullObject = {
    objectType: "null",
    virtual: false
}


const onlyXPoint = {
    x: 1
}
const onlyYPoint = {
    y: 2
}

const string = "testing_string";
const number = 1;
const object = { a: 1 };
const array = [1, 2, 3];
const bigint = BigInt(1);

const objectWithWeirdProperties = {
    getImplementedInterfaces: "not a function",
}
const onlySettableValue = Object.defineProperty({}, "value", {
    set(v) {

    },
});
const stringValue = {
    value: "testing_string",
    plane,
}

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
        expect(isGeometryObject(objectWithWeirdProperties)).toBe(false);
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
        expect(isValue(stringValue)).toBe(false);
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
        expect(isValueObject(stringValue)).toBe(false);
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
        expect(isSettableValue(onlySettableValue)).toBe(false);
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
        expect(isPoint(onlyXPoint)).toBe(false);
        expect(isPoint(onlyYPoint)).toBe(false);
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
        expect(isDependencyNode({
            dependencies: []
        })).toBe(false);
        expect(isDependencyNode({
            dependencies: [],
            dependants: []
        })).toBe(false);
        expect(isDependencyNode({
            dependencies: [],
            dependants: [],
            deepDependencies: []
        })).toBe(false);
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

describe("isObjectWithType", () => {
    test("positive", () => {
        expect(isObjectWithType(x)).toBe(true);
        expect(isObjectWithType(y)).toBe(true);
        expect(isObjectWithType(plane)).toBe(true);
        expect(isObjectWithType(point)).toBe(true);
        expect(isObjectWithType(vector)).toBe(true);
        expect(isObjectWithType(line)).toBe(true);
        expect(isObjectWithType(unboundPoint)).toBe(true);
        expect(isObjectWithType(unboundVector)).toBe(true);
        expect(isObjectWithType(unboundLine)).toBe(true);
    });
    test("negative", () => {
        expect(isObjectWithType(string)).toBe(false);
        expect(isObjectWithType(number)).toBe(false);
        expect(isObjectWithType(object)).toBe(false);
        expect(isObjectWithType(array)).toBe(false);
        expect(isObjectWithType(bigint)).toBe(false);
        expect(isObjectWithType({ objectType: 1 })).toBe(false);
    });
});

describe("isVirtualObject", () => {
    test("positive", () => {
        expect(isVirtualObject(vector)).toBe(true);
        expect(isVirtualObject(x)).toBe(true);
        expect(isVirtualObject(y)).toBe(true);
        expect(isVirtualObject(unboundVector)).toBe(true);
    });

    test("negative", () => {
        expect(isVirtualObject(point)).toBe(false);
        expect(isVirtualObject(line)).toBe(false);
        expect(isVirtualObject(plane)).toBe(false);
        expect(isVirtualObject(unboundPoint)).toBe(false);
        expect(isVirtualObject(unboundLine)).toBe(false);
    });
});

describe("isNonVirutalObject", () => {
    test("positive", () => {
        expect(isNonVirtualObject(point)).toBe(true);
        expect(isNonVirtualObject(line)).toBe(true);
        expect(isNonVirtualObject(plane)).toBe(true);
        expect(isNonVirtualObject(unboundPoint)).toBe(true);
        expect(isNonVirtualObject(unboundLine)).toBe(true);
    });

    test("negative", () => {
        expect(isNonVirtualObject(vector)).toBe(false);
        expect(isNonVirtualObject(x)).toBe(false);
        expect(isNonVirtualObject(y)).toBe(false);
        expect(isNonVirtualObject(unboundVector)).toBe(false);

    });
});

describe("isLineObject", () => {
    test("positive", () => {
        expect(isLineObject(line)).toBe(true);
    });

    test("negative", () => {
        expect(isLineObject(point)).toBe(false);
        expect(isLineObject(vector)).toBe(false);
        expect(isLineObject(x)).toBe(false);
        expect(isLineObject(y)).toBe(false);
        expect(isLineObject(unboundPoint)).toBe(false);
        expect(isLineObject(unboundVector)).toBe(false);
        expect(isLineObject(unboundLine)).toBe(false);
    });
});

describe("isVectorObject", () => {
    test("positive", () => {
        expect(isVectorObject(vector)).toBe(true);
    });

    test("negative", () => {
        expect(isVectorObject(point)).toBe(false);
        expect(isVectorObject(line)).toBe(false);
        expect(isVectorObject(x)).toBe(false);
        expect(isVectorObject(y)).toBe(false);
        expect(isVectorObject(unboundPoint)).toBe(false);
        expect(isVectorObject(unboundLine)).toBe(false);
        expect(isVectorObject(unboundVector)).toBe(false);
    });
});

describe("isIntervalObject", () => {
    test("positive", () => {
        expect(isIntervalObject(interval)).toBe(true);
    });

    test("negative", () => {
        expect(isIntervalObject(point)).toBe(false);
        expect(isIntervalObject(line)).toBe(false);
        expect(isIntervalObject(x)).toBe(false);
        expect(isIntervalObject(y)).toBe(false);
        expect(isIntervalObject(unboundPoint)).toBe(false);
        expect(isIntervalObject(unboundLine)).toBe(false);
        expect(isIntervalObject(unboundInterval)).toBe(false);
    });
});

describe("isPoint", () => {
    test("positive", () => {
        expect(isPoint(point)).toBe(true);
        expect(isPoint(unboundPoint)).toBe(true);
    });

    test("negative", () => {
        expect(isPoint(line)).toBe(false);
        expect(isPoint(x)).toBe(false);
        expect(isPoint(y)).toBe(false);
        expect(isPoint(unboundLine)).toBe(false);
        expect(isPoint(unboundInterval)).toBe(false);
    });
});

describe("isVector", () => {
    test("positive", () => {
        expect(isVector(vector)).toBe(true);
        expect(isVector(unboundVector)).toBe(true);
    });

    test("negative", () => {
        expect(isVector(line)).toBe(false);
        expect(isVector(x)).toBe(false);
        expect(isVector(y)).toBe(false);
        expect(isVector(unboundLine)).toBe(false);
        expect(isVector(unboundInterval)).toBe(false);
        expect(isVector(point)).toBe(false);
        expect(isVector(unboundPoint)).toBe(false);
        expect(isVector(interval)).toBe(false);
        expect(isVector(unboundInterval)).toBe(false);
        expect(isVector(number)).toBe(false);
    });
});

describe("isLine", () => {
    test("positive", () => {
        expect(isLine(line)).toBe(true);
        expect(isLine(unboundLine)).toBe(true);
    });

    test("negative", () => {
        expect(isLine(vector)).toBe(false);
        expect(isLine(x)).toBe(false);
        expect(isLine(y)).toBe(false);
        expect(isLine(unboundVector)).toBe(false);
        expect(isLine(unboundInterval)).toBe(false);
        expect(isLine(point)).toBe(false);
        expect(isLine(unboundPoint)).toBe(false);
        expect(isLine(interval)).toBe(false);
        expect(isLine(unboundInterval)).toBe(false);
        expect(isLine(number)).toBe(false);
    });
});

describe("isInterval", () => {
    test("positive", () => {
        expect(isInterval(interval)).toBe(true);
        expect(isInterval(unboundInterval)).toBe(true);
    });

    test("negative", () => {
        expect(isInterval(vector)).toBe(false);
        expect(isInterval(x)).toBe(false);
        expect(isInterval(y)).toBe(false);
        expect(isInterval(unboundVector)).toBe(false);
        expect(isInterval(unboundLine)).toBe(false);
        expect(isInterval(point)).toBe(false);
        expect(isInterval(unboundPoint)).toBe(false);
        expect(isInterval(line)).toBe(false);
        expect(isInterval(unboundLine)).toBe(false);
        expect(isInterval(number)).toBe(false);
    });
});

describe("isNullObject", () => {
    test("positive", () => {
        expect(isNull(virtualNullObject)).toBe(true);
        expect(isNull(nonVirtualNullObject)).toBe(true);
    });

    test("negative", () => {
        expect(isNull(vector)).toBe(false);
        expect(isNull(x)).toBe(false);
        expect(isNull(y)).toBe(false);
        expect(isNull(unboundVector)).toBe(false);
        expect(isNull(unboundLine)).toBe(false);
        expect(isNull(point)).toBe(false);
        expect(isNull(unboundPoint)).toBe(false);
        expect(isNull(line)).toBe(false);
        expect(isNull(unboundLine)).toBe(false);
        expect(isNull(number)).toBe(false);
    });
});

describe("isUnion", () => {
    test("positive", () => {
        expect(isUnion(union)).toBe(true);
    });

    test("negative", () => {
        expect(isUnion(vector)).toBe(false);
        expect(isUnion(x)).toBe(false);
        expect(isUnion(y)).toBe(false);
        expect(isUnion(unboundVector)).toBe(false);
        expect(isUnion(unboundLine)).toBe(false);
        expect(isUnion(point)).toBe(false);
        expect(isUnion(unboundPoint)).toBe(false);
        expect(isUnion(line)).toBe(false);
        expect(isUnion(unboundLine)).toBe(false);
        expect(isUnion(number)).toBe(false);
    });
})