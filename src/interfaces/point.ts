import { NonVirtualObject } from "./objectWithType";
import { Vector } from "./vector";

/**
 * Represents a point in 2D space.
 */
export interface Point extends NonVirtualObject {
    /**
     * X coordinate of the point.
     */
    readonly x: number;
    /**
     * Y coordinate of the point.
     */
    readonly y: number;

    /**
     * Returns the distance from the origin.
     */
    readonly distanceFromOrigin: number;

    /**
     * Returns the point as a {@link Vector | Vector}.
     */
    toVector(): Vector;

    /**
     * This object is of type point.
     */
    readonly objectType: "point";
}

export interface SettablePoint extends Point {
    /**
     * X coordinate of the point.
     */
    x: number;
    /**
     * Y coordinate of the point.
     */
    y: number;
}