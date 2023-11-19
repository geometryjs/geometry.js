import { Evaluatable } from "./evaluatable";
import { SingleParametricCurve } from "./parametricCurve";
import { Point } from "./point";
import { Vector } from "./vector";

/**
 * Interface for a line
 */
export interface Line extends Evaluatable<number, Point>, SingleParametricCurve {
    /**
     * The a coefficient of the line equation in the form of ax + by + c = 0.
     */
    readonly a: number;

    /**
     * The b coefficient of the line equation in the form of ax + by + c = 0.
     */
    readonly b: number;

    /**
     * The c coefficient of the line equation in the form of ax + by + c = 0.
     */
    readonly c: number;

    /**
     * Arbitrary point on the line, that is not equal to {@link Line.arbitraryPoint2}.
     */
    readonly arbitraryPoint1: Point;

    /**
     * Arbitrary point on the line, that is not equal to {@link Line.arbitraryPoint1}.
     */
    readonly arbitraryPoint2: Point;

    /**
     * The directional vector of the line.
     */
    readonly directionalVector: Vector;

    /**
     * The normal vector of the line.
     * If the line intersects the origin, the normal vector is of size 1, otherwise it is of size of distance of the line to the origin.
     */
    readonly normalVector: Vector;

    /**
     * The postitve angle of the line with the x-axis.
     */
    readonly xAxisAngle: number;
}

/**
 * Interface for a line, that can be set by its equation.
 */
export interface LineWithSettableEquation extends Line {
    /**
     * The a coefficient of the line equation in the form of ax + by + c = 0.
     */
    a: number;

    /**
     * The b coefficient of the line equation in the form of ax + by + c = 0.
     */
    b: number;

    /**
     * The c coefficient of the line equation in the form of ax + by + c = 0.
     */
    c: number;
}


/**
 * Interface for a line, that can be set by its angle with the x-axis and arbitrary point.
 */
export interface LineWithSettableXAxisAngle extends Line {
    /**
     * The postitve angle of the line with the x-axis.
     */
    xAxisAngle: number;
}