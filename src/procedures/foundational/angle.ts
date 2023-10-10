import type { BareReadonlyVector } from "../../interfaces";

import { Procedure } from "../procedure";
import { VectorDotProduct, VectorMagnitude } from "./vectorOperations";

const VECTOR_MAGNITUDE = new VectorMagnitude();
const VECTOR_DOT_PRODUCT = new VectorDotProduct();

/**
 * A procedure for vector angle.
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