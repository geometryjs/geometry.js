import type { Plane, Point, PointObject, Vector, VectorObject } from "../../interfaces";

import { AbstractLineFromPointAndDirectionalVector } from "./abstractLine";

/**
 * A line defined by a point and a directional vector.
 */
export class LineFromPointAndDirectionalVector extends AbstractLineFromPointAndDirectionalVector {
    private pointValue: Point;
    private directionalVectorValue: Vector;

    constructor(parameters: { point: PointObject, directionalVector: VectorObject, plane: Plane }) {
        super({ dependencies: [parameters.point, parameters.directionalVector], ...parameters });

        this.pointValue = parameters.point;
        this.directionalVectorValue = parameters.directionalVector;
    }

    protected getPoint(): Point {
        return this.pointValue;
    }

    protected getDirectionalVector(): Vector {
        return this.directionalVectorValue;
    }
}