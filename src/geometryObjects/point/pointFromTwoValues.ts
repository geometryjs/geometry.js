import type { ValueObject, Value} from "../../interfaces";

import { Plane } from "../plane/plane";
import { AbstractPoint } from "./abstractPoint";

/**
 * Represents a point that is defined by two values - x and y.
 *
 * @group Point
 */
export class PointFromTwoValues extends AbstractPoint {
    private readonly xValue: Value;
    private readonly yValue: Value;

    constructor(parameters: { readonly x: ValueObject; readonly y: ValueObject; readonly plane: Plane }) {
        super({ dependencies: [parameters.x, parameters.y], ...parameters });
        const { x, y } = parameters;
        this.xValue = x;
        this.yValue = y;
    }

    protected getX(): number {
        return this.xValue.value;
    }

    protected getY(): number {
        return this.yValue.value;
    }
}
