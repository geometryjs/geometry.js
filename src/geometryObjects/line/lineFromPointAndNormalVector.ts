import type { Plane, Point, PointObject, Vector, VectorObject } from "../../interfaces";

import { AbstractLineFromPointAndNormalVector } from "./abstractLine";

/**
 * A line defined by a point and a normal vector.
 */
export class LineFromPointAndNormalVector extends AbstractLineFromPointAndNormalVector {
    private pointValue: Point;
    private normalVectorValue: Vector;

    constructor(parameters: { point: PointObject, normalVector: VectorObject, plane: Plane }) {
        super({ dependencies: [parameters.point, parameters.normalVector], ...parameters });

        this.pointValue = parameters.point;
        this.normalVectorValue = parameters.normalVector;
    }

    protected getPoint(): Point {
        return this.pointValue;
    }

    protected getNormalVector(): Vector {
        return this.normalVectorValue;
    }
}