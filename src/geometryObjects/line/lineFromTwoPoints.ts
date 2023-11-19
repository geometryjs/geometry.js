import type { PointObject, Plane, Point } from "../../interfaces";

import { AbstractLineFromTwoPoints } from "./abstractLine";

/**
 * A line defined by two points.
 */
export class LineFromTwoPoints extends AbstractLineFromTwoPoints {
    protected point1: Point;
    protected point2: Point;
    
    constructor(parameters: { point1: PointObject, point2: PointObject, plane: Plane }) {
        super({
            dependencies: [parameters.point1, parameters.point2],
            plane: parameters.plane
        });
        this.point1 = parameters.point1;
        this.point2 = parameters.point2;
    }

    protected getPoint1(): Point {
        return this.point1;
    }

    protected getPoint2(): Point {
        return this.point2;
    }

}