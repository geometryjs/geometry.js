import type { Plane, Value, ValueObject } from "../../interfaces";

import { AbstractLineFromEquation } from "./abstractLine";

/**
 * A line defined by its equation in the form of ax + by + c = 0 with a, b, c being values.
 */
export class LineFromEquationAsValues extends AbstractLineFromEquation {
    private aValue: Value;
    private bValue: Value;
    private cValue: Value;

    constructor(parameters: { a: ValueObject, b: ValueObject, c: ValueObject, plane: Plane }) {
        super({ dependencies: [parameters.a, parameters.b, parameters.c], ...parameters });

        this.aValue = parameters.a;
        this.bValue = parameters.b;
        this.cValue = parameters.c;
    }

    protected getA(): number {
        return this.aValue.value;
    }

    protected getB(): number {
        return this.bValue.value;
    }

    protected getC(): number {
        return this.cValue.value;
    }
}