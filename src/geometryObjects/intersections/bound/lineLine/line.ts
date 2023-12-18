import type { LineLineIntersection } from ".";
import type { Plane } from "../../../../interfaces";
import { AbstractLineFromEquation } from "../../../line";

/**
 * Case of the Line Line intersection.
 * Exists if the lines are parallel but not equal.
 */
export class LineLineIntersectionLine extends AbstractLineFromEquation {
    protected readonly intersectionObject: LineLineIntersection;
    constructor(parameters: { plane: Plane, intersectionObject: LineLineIntersection }) {
        super({
            ...parameters,
            dependencies: [parameters.intersectionObject]
        });
        this.intersectionObject = parameters.intersectionObject;
    }

    protected getA(): number {
        if (!this.exists()) throw new Error("Getting the value of a non-existant line"); // TODO: Change to custom error
        const { a } = this.intersectionObject.getIntersection() as { a: number, b: number, c: number };
        return a;
    }

    protected getB(): number {
        if (!this.exists()) throw new Error("Getting the value of a non-existant line"); // TODO: Change to custom error
        const { b } = this.intersectionObject.getIntersection() as { a: number, b: number, c: number };
        return b;
    }

    protected getC(): number {
        if (!this.exists()) throw new Error("Getting the value of a non-existant line"); // TODO: Change to custom error
        const { c } = this.intersectionObject.getIntersection() as { a: number, b: number, c: number };
        return c;
    }

    public exists(): boolean {
        return this.intersectionObject.getObjectType() === "line" && this.intersectionObject.exists();
    }
} 