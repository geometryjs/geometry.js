import { LineCCoefficient } from "./lineEquation";
import { PerpendicularVector } from "./perpendicularVector";

/**
 * Creates a vector perpendicular to the given vector.
 * @see {@link PerpendicularVector}
 */
export const PERPENDICULAR_VECTOR = new PerpendicularVector();

/**
 * Calculates the c coefficient of the line equation in the form of ax + by + c = 0, given the line's normal vector and a point on the line.
 * @see {@link LineCCoefficient}
 */
export const LINE_C_COEFFICIENT = new LineCCoefficient();