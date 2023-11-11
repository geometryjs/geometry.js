import { Plane } from "../../../../src/geometryObjects";
import { UnboundVector } from "../../../../src/geometryObjects/vector";
import { Vector } from "../../../../src/interfaces";

describe("UnboundVector", () => {
    test("can be created", () => {
        const vector = new UnboundVector({ x: 1, y: 2 });
        expect(vector).toBeDefined();
    });
    test("keeps values", () => {
        const vector = new UnboundVector({ x: 1, y: 2 });
        expect(vector.x).toBe(1);
        expect(vector.y).toBe(2);
    });
    test("can be created from bare vector", () => {
        const vector = UnboundVector.fromBare([1, 2]);

        expect(vector.x).toBe(1);
        expect(vector.y).toBe(2);
    });

    test("can be created from other vector", () => {
        const vector = UnboundVector.fromVector(new UnboundVector({ x: 1, y: 2 }));

        expect(vector.x).toBe(1);
        expect(vector.y).toBe(2);
    });
});

describe("Vector from coordinates", () => {
    const plane = new Plane();
    test("can be created", () => {
        const vector = plane.createVectorFromCoordinates(1, 2);
        expect(vector).toBeDefined();
    });

    test("keeps values", () => {
        const vector = plane.createVectorFromCoordinates(1, 2);
        expect(vector.x).toBe(1);
        expect(vector.y).toBe(2);
    });
});

describe("Vector from two values", () => {
    const plane = new Plane();
    test("can be created", () => {
        const x = plane.createValue(1);
        const y = plane.createValue(2);
        const vector = plane.createVectorFromTwoValues(x, y);
        expect(vector).toBeDefined();
    });

    test("keeps values", () => {
        const x = plane.createValue(1);
        const y = plane.createValue(2);
        const vector = plane.createVectorFromTwoValues(x, y);
        expect(vector.x).toBe(1);
        expect(vector.y).toBe(2);
    });

    test("updates when values change", () => {
        const x = plane.createValue(1);
        const y = plane.createValue(2);
        const vector = plane.createVectorFromTwoValues(x, y);

        x.value = 3;
        y.value = 4;

        expect(vector.x).toBe(3);
        expect(vector.y).toBe(4);
    });
});

describe("Vector", () => {
    const plane = new Plane();

    const vectors: Vector[] = [
        new UnboundVector({ x: 1, y: 2 }),
        plane.createVectorFromCoordinates(2, 9),
        plane.createVectorFromTwoValues(plane.createValue(2), plane.createValue(0)),
        plane.createVectorFromTwoValues(plane.createReadonlyValue(0), plane.createReadonlyValue(10)),
    ]
    

    test.each(vectors)("can be converted to bare vector", (vector) => {
        expect(vector.toBare()).toStrictEqual([vector.x, vector.y]);
    });

    test.each(vectors)("can be normalized", (vector) => {
        const normalized = vector.normalize();

        expect(normalized.x).toBeCloseTo(vector.x / Math.sqrt(vector.x ** 2 + vector.y ** 2));
        expect(normalized.y).toBeCloseTo(vector.y / Math.sqrt(vector.x ** 2 + vector.y ** 2));
    });

    test.each(vectors)("can be normalized to length", (vector) => {
        const normalizedTo = [1, 3, 5, 0.1, 12, 8].map(v => vector.normalize(v));
        const normalized = vector.normalize();
        for (const normalizedVector of normalizedTo) {
            expect(normalizedVector.x).toBeCloseTo(normalized.x * 10);
            expect(normalizedVector.y).toBeCloseTo(normalized.y * 10);
        }
    });

    test.each(vectors)("can be added to another vector", (vector) => {
        for (const otherVector of vectors) {
            const added = vector.add(otherVector);
            expect(added.x).toBe(vector.x + otherVector.x);
            expect(added.y).toBe(vector.y + otherVector.y);
        }
    });

    test.each(vectors)("can be subtracted from another vector", (vector) => {
        for (const otherVector of vectors) {
            const subtracted = vector.subtract(otherVector);
            expect(subtracted.x).toBe(vector.x - otherVector.x);
            expect(subtracted.y).toBe(vector.y - otherVector.y);
        }
    });

    test.each(vectors)("can be multiplied by a scalar", (vector) => {
        const multiplied = vector.multiplyByScalar(3);

        expect(multiplied.x).toBe(3 * vector.x);
        expect(multiplied.y).toBe(3 * vector.y);
    });

    test.each(vectors)("can be iterated over", (vector) => {
        const iterator = vector[Symbol.iterator]();

        expect(iterator.next().value).toBe(vector.x);
        expect(iterator.next().value).toBe(vector.y);
        expect(iterator.next().done).toBe(true);
    });

    
});