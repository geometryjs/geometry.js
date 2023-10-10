import * as Procedures from "../../procedures";
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

    add(vector: Vector): Vector {
        return UnboundVector.fromBare(Procedures.Foundational.VECTOR_ADDITION.perform({
            vectors: [this.toBare(), vector.toBare()],
        }).sumVector);
    }

    subtract(vector: Vector): Vector {
        return UnboundVector.fromBare(Procedures.Foundational.VECTOR_SUBTRACTION.perform({
            positive: [this.toBare()],
            negative: [vector.toBare()],
        }).differenceVector);
    }

    multiplyByScalar(scalar: number): Vector {
        return UnboundVector.fromBare(Procedures.Foundational.VECTOR_BY_SCALAR_MULTIPLICATION.perform({
            vector: this.toBare(),
            scalar,
        }).resultVector);
    }

    normalize(length = 1): Vector {
        return UnboundVector.fromBare(Procedures.Foundational.VECTOR_NORMALIZATION.perform({
            vector: this.toBare(),
            length,
        }).resultVector);
    }

    static fromBare(bareVector: BareReadonlyVector): Vector {
        return new UnboundVector({
            x: bareVector[0],
            y: bareVector[1],
        });
    }
}