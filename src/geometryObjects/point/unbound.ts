import type { BareReadonlyVector, Point, Vector } from "../../interfaces";

import * as Procedures from "../../procedures";
import { UnboundVector } from "../vector";

/**
 * A class representing an unbound point. This point is not bound to any plane, nor is it a part of the dependency graph.
 * 
 * @group Point
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

    public readonly objectType = "point";
    public readonly virtual = false;

    /**
     * Creates an unbound point from a vector.
     * @param vector The vector to create the point from.
     * @returns An unbound point with the same coordinates as the vector.
     */
    static fromVector(vector: Vector): Point {
        return new UnboundPoint(vector);
    }

    /**
     * Creates an unbound point from a bare vector.
     * @param bareVector The bare vector to create the point from.
     * @returns An unbound point with the same coordinates as the bare vector.
     */
    static fromBareVector(bareVector: BareReadonlyVector): Point {
        return new UnboundPoint({
            x: bareVector[0],
            y: bareVector[1],
        });
    }

    /**
     * Creates a new unbound point from a point.
     * @param point A point to create an unbound point from.
     * @returns A new unbound point with the same coordinates as the given point.
     */
    static fromPoint(point: Point): Point {
        return new UnboundPoint(point);
    }

    /**
     *  Creates an unbound point from coordinates.
     * @param x The x coordinate of the point.
     * @param y The y coordinate of the point.
     * @returns An unbound point with the given coordinates.
     */
    static fromCoordinates(x: number, y: number): Point {
        return new UnboundPoint({ x, y });
    }
}
