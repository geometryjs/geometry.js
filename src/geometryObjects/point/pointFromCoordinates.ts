import type { Plane } from "../../interfaces";
import { AbstractPoint } from "./abstractPoint";

/**
 * A point defined by its coordinates
 */
export class PointFromCoordinates extends AbstractPoint {
    private _xValue: number;
    private _yValue: number;

    constructor(parameters: { x: number, y: number, plane: Plane }) {
        super({ dependencies: [], ...parameters });
        this._xValue = parameters.x;
        this._yValue = parameters.y;
    }
    getX() {
        return this._xValue;
    }
    getY() {
        return this._yValue;
    }

    public get x() { // Do not remove this, when overriding a setter, the getter must be overridden too
        return super.x;
    }
    public set x(value: number) {
        this._xValue = value;
        this.update();
    }

    public get y() { // Do not remove this, when overriding a setter, the getter must be overridden too
        return super.y;
    }
    public set y(value: number) {
        this._yValue = value;
        this.update();
    }
}