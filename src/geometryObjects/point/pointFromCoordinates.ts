import type { Plane } from "../../interfaces";
import { AbstractPoint } from "./abstractPoint";

/**
 * A point defined by its coordinates
 */
export class PointFromCoordinates extends AbstractPoint {
    private xValue: number;
    private yValue: number;

    constructor(parameters: { x: number, y: number, plane: Plane }) {
        super({ dependencies: [], ...parameters });
        this.xValue = parameters.x;
        this.yValue = parameters.y;
    }
    getX() {
        return this.xValue;
    }
    getY() {
        return this.yValue;
    }

    public get x() { // Do not remove this, when overriding a setter, the getter must be overridden too
        return super.x;
    }
    public set x(value: number) {
        this.xValue = value;
        this.update();
    }

    public get y() { // Do not remove this, when overriding a setter, the getter must be overridden too
        return super.y;
    }
    public set y(value: number) {
        this.yValue = value;
        this.update();
    }
}