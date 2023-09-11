/**
 * Point interface
 */
export interface Point {
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
}