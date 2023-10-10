import { LineAngle, VectorAngle } from "./angle";
import { PythagoreanTheorem } from "./pythagoreanTheorem";
import { VectorAddition, VectorByScalarMultiplication, VectorDotProduct, VectorMagnitude, VectorNormalization, VectorSubtraction } from "./vectorOperations";

/**
 * A procedure for the Pythagorean Theorem.
 * @see {@link PythagoreanTheorem}
 */
export const PYTHAGOREAN_THEOREM = new PythagoreanTheorem();

/**
 * A procedure for vector addition.
 * @see {@link VectorAddition}
 */
export const VECTOR_ADDITION = new VectorAddition();

/**
 * A procedure for vector by scalar multiplication.
 * @see {@link VectorByScalarMultiplication}
 */
export const VECTOR_BY_SCALAR_MULTIPLICATION = new VectorByScalarMultiplication();

/**
 * A procedure for vector subtraction.
 * @see {@link VectorSubtraction}
 */
export const VECTOR_SUBTRACTION = new VectorSubtraction();

/**
 * A procedure for vector normalization.
 * @see {@link VectorNormalization}
 */
export const VECTOR_NORMALIZATION = new VectorNormalization();

/**
 * A procedure for vector dot product.
 * @see {@link VectorDotProduct}
 */
export const VECTOR_DOT_PRODUCT = new VectorDotProduct();

/**
 * A procedure for vector magnitude.
 * @see {@link VectorMagnitude}
 */
export const VECTOR_MAGNITUDE = new VectorMagnitude();

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