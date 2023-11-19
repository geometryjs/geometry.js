import type { Line, LineObject, Plane, Point, PointObject, Vector } from "../../interfaces";

import { AbstractLineFromPointAndNormalVector } from "./abstractLine";

/**
 * A line parallel to a given line, passing through a given point.
 */
export class ParalellLineFromPoint extends AbstractLineFromPointAndNormalVector {
    protected line: Line;
    protected point: Point;

    constructor(parameters: { line: LineObject, point: PointObject, plane: Plane }) {
        super({
            dependencies: [parameters.line, parameters.point],
            plane: parameters.plane
        });

        this.line = parameters.line;
        this.point = parameters.point;
    }

    getPoint(): Point {
        return this.point;
    }

    getNormalVector(): Vector {
        return this.line.normalVector;
    }
}