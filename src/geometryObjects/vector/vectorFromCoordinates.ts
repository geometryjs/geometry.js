import type { Plane } from "../../interfaces";

import { AbstractVector } from "./abstractVector";

export class VectorFromCoordinates extends AbstractVector {
    private xValue;
    private yValue;

    constructor(parameters: { x: number, y: number, plane: Plane}) {
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
    
    get x() { // Do not remove this, when overriding a setter, the getter must be overridden too
        return this.xValue;
    }
    set x(value) {
        this.xValue = value;
        this.update();
    }
    get y() { // Do not remove this, when overriding a setter, the getter must be overridden too
        return this.yValue;
    }
    set y(value) {
        this.yValue = value;
        this.update();
    }
}