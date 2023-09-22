import { Point } from "./point";
import { Vector } from "./vector";

/**
 * Interface for a line
 */
export interface Line {
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
     * An arbitrary point on the line.
     */
    readonly arbitraryPoint: Point;

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
