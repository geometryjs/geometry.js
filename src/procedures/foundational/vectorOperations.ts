import { BareReadonlyVector, BareVector } from "../../interfaces";
import { Procedure } from "../procedure";

/**
 * A procedure for vector addition.
 * Adds vectors per component.
 */
export class VectorAddition extends Procedure<{ vectors: BareReadonlyVector[] }, { sumVector: BareVector }> {
    constructor() {
        super({
            name: "Vector Addition",
            procedure: ({ vectors }) => {
                const sumVector: BareVector = [0, 0];
                for (const vector of vectors) {
                    sumVector[0] += vector[0];
                    sumVector[1] += vector[1];
                }
                return { sumVector };
            },
        });
    }
}

/**
 * A procedure for vector by scalar multiplication.
 * Multiplies a vector by a scalar.
 */
export class VectorByScalarMultiplication extends Procedure<{ vector: BareReadonlyVector; scalar: number }, { resultVector: BareVector }> {
    constructor() {
        super({
            name: "Vector by Scalar Multiplication",
            procedure: ({ vector, scalar }) => {
                return {
                    resultVector: [vector[0] * scalar, vector[1] * scalar],
                };
            },
        });
    }
}
