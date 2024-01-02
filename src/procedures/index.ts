export { Procedure } from "./procedure";
export { PythagoreanTheorem } from "./foundational/pythagoreanTheorem";
export { VectorAddition, VectorByScalarMultiplication, VectorDotProduct, VectorMagnitude, VectorNormalization, VectorSubtraction } from "./foundational/vectorOperations";
export { LineAngle, VectorAngle } from "./foundational/angle";
export { LineCCoefficient, LinesParallel } from "./derived/lineEquation";
export { TwoPointsOnEquationLine } from "./derived/pointsOnLine";
export { PerpendicularVector } from "./derived/perpendicularVector";
export { LineFromLineDistance, PointFromLineDistance } from "./foundational/distance";

export { LineLineIntersection } from "./derived/intersections/lineLine";
/**
 * A collection of procedures that are considered foundational. These procedures are well known and have extensive infromation about them online. Usually a wikipedia page is linked by the procedure.
 */
export * as Foundational from "./foundational";

/**
 * A collection of procedures that are derived for this library. Their documentation is linked in the procedure.
 */
export * as Derived from "./derived";
