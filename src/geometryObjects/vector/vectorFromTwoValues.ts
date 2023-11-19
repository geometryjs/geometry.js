import type { Plane, Value, ValueObject } from "../../interfaces";

import { AbstractVector } from "./abstractVector";

/**
 * A vector defined by its coordinates as two values
 */
export class VectorFromTwoValues extends AbstractVector {
    private readonly xValue: Value;
    private readonly yValue: Value;

    constructor(parameters: { x: ValueObject, y: ValueObject, plane: Plane }) {
        super({ dependencies: [parameters.x, parameters.y], ...parameters });

        this.xValue = parameters.x;
        this.yValue = parameters.y;
    }

    getX() {
        return this.xValue.value;
    }

    getY() {
        return this.yValue.value;
    }
}