import type { Point, Vector } from "../../interfaces";

import { Procedures } from "../..";
import { UnboundVector } from "../vector";

/**
 * A class representing an unbound point. This point is not bound to any plane, nor is it a part of the dependency graph.
 */
export class UnboundPoint implements Point {
    public readonly x: number;
    public readonly y: number;

    constructor(parameters: { x: number; y: number }) {
        this.x = parameters.x;
        this.y = parameters.y;
    }

    get distanceFromOrigin(): number {
        return Procedures.Foundational.PYTHAGOREAN_THEOREM.evaluate({
            values: [this.x, this.y],
        }).distance;
    }

    toVector(): Vector {
        return UnboundVector.fromBare([this.x, this.y]);
    }
    
    /**
     * Creates an unbound point from a vector.
     * @param vector The vector to create the point from.
     * @returns An unbound point with the same coordinates as the vector.
     */
    static fromVector(vector: Vector): Point {
        return new UnboundPoint(vector);
    }

    /**
     * Creates a new unbound point from a point.
     * @param point A point to create an unbound point from.
     * @returns A new unbound point with the same coordinates as the given point.
     */
    static fromPoint(point: Point): Point {
        return new UnboundPoint(point);
    }
}
