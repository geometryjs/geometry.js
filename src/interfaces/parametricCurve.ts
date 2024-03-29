import type { Interval } from "./interval";
import type { Point } from "./point";

/**
 * Represents a parametric curve based of a single parameter.
 */
export interface SingleParametricCurve {
    /**
     * Returns the point at the given parameter value.
     * @param t The value of the parameter.
     * @returns The point at the given parameter value.
     */
    atParameterValue(t: number): Point;

    /**
     * The interval of the parameter.
     */
    readonly interval: Interval;

}
