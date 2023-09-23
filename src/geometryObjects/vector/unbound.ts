import type { BareReadonlyVector, Vector } from "../../interfaces";

/**
 * Class, that represents an unbound vector. This means, that the vector is not bound to a plane, nor is it a part of the dependency graph.
 */
export class UnboundVector implements Vector {
    public readonly x: number;
    public readonly y: number;

    constructor(parameters: { x: number; y: number }) {
        this.x = parameters.x;
        this.y = parameters.y;
    }

    toBare(): BareReadonlyVector {
        return [this.x, this.y];
    }

    *[Symbol.iterator](): IterableIterator<number> {
        yield this.x;
        yield this.y;
    }
}