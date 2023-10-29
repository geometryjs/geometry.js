import { UnboundVector } from "../../../../src/geometryObjects/vector";

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

    test("can be converted to bare vector", () => {
        const vector = new UnboundVector({ x: 1, y: 2 });

        expect(vector.toBare()).toStrictEqual([1, 2]);
    });

    test("can be normalized", () => {
        const vector = new UnboundVector({ x: 1, y: 2 });
        const normalized = vector.normalize();

        expect(normalized.x).toBeCloseTo(1 / Math.sqrt(5));
        expect(normalized.y).toBeCloseTo(2 / Math.sqrt(5));
    });

    test("can be normalized to length", () => {
        const vector = new UnboundVector({ x: 1, y: 2 });
        const normalized = vector.normalize(10);

        expect(normalized.x).toBeCloseTo(1 / Math.sqrt(5) * 10);
        expect(normalized.y).toBeCloseTo(2 / Math.sqrt(5) * 10);
    });

    test("can be added to another vector", () => {
        const vector = new UnboundVector({ x: 1, y: 2 });
        const added = vector.add(new UnboundVector({ x: 3, y: 4 }));

        expect(added.x).toBe(4);
        expect(added.y).toBe(6);
    });

    test("can be subtracted from another vector", () => {
        const vector = new UnboundVector({ x: 1, y: 2 });
        const subtracted = vector.subtract(new UnboundVector({ x: 3, y: 4 }));

        expect(subtracted.x).toBe(-2);
        expect(subtracted.y).toBe(-2);
    });

    test("can be multiplied by a scalar", () => {
        const vector = new UnboundVector({ x: 1, y: 2 });
        const multiplied = vector.multiplyByScalar(3);

        expect(multiplied.x).toBe(3);
        expect(multiplied.y).toBe(6);
    });

    test("can ve iterated over", () => {
        const vector = new UnboundVector({ x: 1, y: 2 });
        const iterator = vector[Symbol.iterator]();

        expect(iterator.next().value).toBe(1);
        expect(iterator.next().value).toBe(2);
        expect(iterator.next().done).toBe(true);
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
})