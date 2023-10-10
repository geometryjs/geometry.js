import type { BareReadonlyVector, BareVector } from "../../interfaces";

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
 * A procedure for vector subtraction.
 * Subtracts `negative` vectors from `positive` vectors per component.
 */
export class VectorSubtraction extends Procedure<{ positive: BareReadonlyVector[]; negative: BareReadonlyVector[] }, { differenceVector: BareVector }> {
    constructor() {
        super({
            name: "Vector Subtraction",
            procedure: ({ positive, negative }) => {
                const differenceVector: BareVector = [0, 0];
                for (const vector of positive) {
                    differenceVector[0] += vector[0];
                    differenceVector[1] += vector[1];
                }
                for (const vector of negative) {
                    differenceVector[0] -= vector[0];
                    differenceVector[1] -= vector[1];
                }
                return { differenceVector };
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

/**
 * A procedure for vector normalization.
 */
export class VectorNormalization extends Procedure<{ vector: BareReadonlyVector; length: number }, { resultVector: BareVector }> {
    constructor() {
        super({
            name: "Vector Normalize",
            procedure: ({ vector, length }) => {
                const magnitude = Math.sqrt(vector[0] ** 2 + vector[1] ** 2);
                return {
                    resultVector: [vector[0] * length / magnitude, vector[1] * length / magnitude],
                };
            },
        });
    }
}

/**
 * A procedure for vector dot product.
 */
export class VectorDotProduct extends Procedure<{ vector1: BareReadonlyVector, vector2: BareReadonlyVector }, { product: number }> {
    constructor() {
        super({
            name: "Vector Dot Product",
            procedure: ({ vector1, vector2 }) => {
                return {
                    product: vector1[0] * vector2[0] + vector1[1] * vector2[1],
                }
            }
        });
    }
}

/**
 * A procedure for vector magnitude.
 */
export class VectorMagnitude extends Procedure<{ vector: BareReadonlyVector }, { magnitude: number }> {
    constructor() {
        super({
            name: "Vector Magnitude",
            procedure: ({ vector }) => {
                return {
                    magnitude: Math.sqrt(vector[0] ** 2 + vector[1] ** 2),
                }
            }
        })
    }
}