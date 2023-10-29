import type { BareReadonlyVector } from "../../interfaces";

import { Procedure } from "../procedure";
import { VECTOR_DOT_PRODUCT, VECTOR_MAGNITUDE } from "./vectorOperations";

/**
 * A procedure for vector angle.
 * Calculates the angle between two vectors.
 */
export class VectorAngle extends Procedure<{ vector1: BareReadonlyVector, vector2: BareReadonlyVector }, { angle: number }> {
    constructor() {
        super({
            name: "Vector Angle",
            procedure: ({ vector1, vector2 }) => {
                const magnitude1 = VECTOR_MAGNITUDE.perform({ vector: vector1 }).magnitude;
                const magnitude2 = VECTOR_MAGNITUDE.perform({ vector: vector2 }).magnitude;
                const dotProduct = VECTOR_DOT_PRODUCT.perform({ vector1, vector2 }).product;
                return {
                    angle: Math.acos(dotProduct / (magnitude1 * magnitude2)),
                }
            }
        })
    }
}

/**
 * A procedure for line angle.
 * Calculates the angle between two lines.
 */
export class LineAngle extends Procedure<{ line1Vector: BareReadonlyVector, line2Vector: BareReadonlyVector }, { angle: number }> {
    constructor() {
        super({
            name: "Line Angle",
            procedure: ({ line1Vector: vector1, line2Vector: vector2 }) => {
                const magnitude1 = VECTOR_MAGNITUDE.perform({ vector: vector1 }).magnitude;
                const magnitude2 = VECTOR_MAGNITUDE.perform({ vector: vector2 }).magnitude;
                const dotProduct = VECTOR_DOT_PRODUCT.perform({ vector1, vector2 }).product;
                return {
                    angle: Math.acos(Math.abs(dotProduct) / (magnitude1 * magnitude2)),
                }
            }
        })
    }
}

/**
 * A procedure for vector angle.
 * @see {@link VectorAngle}
 */
export const VECTOR_ANGLE = new VectorAngle();

/**
 * A procedure for line angle.
 * @see {@link LineAngle}
 */
export const LINE_ANGLE = new LineAngle();