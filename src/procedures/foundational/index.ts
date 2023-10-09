import { PythagoreanTheorem } from "./pythagoreanTheorem";
import { VectorAddition, VectorByScalarMultiplication, VectorNormalization, VectorSubtraction } from "./vectorOperations";

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