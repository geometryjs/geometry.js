import type { LineWithSettableEquation, Plane } from "../../interfaces";

import { AbstractLineFromEquation } from "./abstractLine";

/**
 * A line defined by its equation in the form of ax + by + c = 0 with a, b, c being numbers.
 */
export class LineFromEquation extends AbstractLineFromEquation implements LineWithSettableEquation {
    private aValue: number;
    private bValue: number;
    private cValue: number;

    constructor(parameters: { a: number, b: number, c: number, plane: Plane }) {
        super({ dependencies: [], ...parameters });

        this.aValue = parameters.a;
        this.bValue = parameters.b;
        this.cValue = parameters.c;
    }

    protected getA(): number {
        return this.aValue;
    }

    protected getB(): number {
        return this.bValue;
    }

    protected getC(): number {
        return this.cValue;
    }


    public get a() { // Do not remove this, when overriding a setter, the getter must be overridden too
        return super.a;
    }
    public set a(value: number) {
        this.aValue = value;
        this.update();
    }

    public get b() { // Do not remove this, when overriding a setter, the getter must be overridden too
        return super.b;
    }
    public set b(value: number) {
        this.bValue = value;
        this.update();
    }

    public get c() { // Do not remove this, when overriding a setter, the getter must be overridden too
        return super.c;
    }
    public set c(value: number) {
        this.cValue = value;
        this.update();
    }
}