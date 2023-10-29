import type { Line, LineObject, Plane, Point, PointObject, Vector } from "../../interfaces";

import { AbstractLineFromPointAndDirectionalVector } from "./abstractLine";

export class PerpendicularLineFromPoint extends AbstractLineFromPointAndDirectionalVector {
    protected point: Point;
    protected line: Line;

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

    getDirectionalVector(): Vector {
        return this.line.normalVector;
    }
}