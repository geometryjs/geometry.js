import type { LineLineIntersection } from ".";
import { ExistanceViolationError } from "../../../../errors";
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
        if (!this.exists()) throw new ExistanceViolationError({
            message: "Accessing parameter `a` of a non-existant line.",
            id: "LLI_L_a",
            description: "Reading properties of non-existant objects is not allowed. Check for existance using the `exists()` method first."
        });
        const { a } = this.intersectionObject.getIntersection() as { a: number, b: number, c: number };
        return a;
    }

    protected getB(): number {
        if (!this.exists()) throw new ExistanceViolationError({
            message: "Accessing parameter `b` of a non-existant line.",
            id: "LLI_L_b",
            description: "Reading properties of non-existant objects is not allowed. Check for existance using the `exists()` method first."
        });
        const { b } = this.intersectionObject.getIntersection() as { a: number, b: number, c: number };
        return b;
    }

    protected getC(): number {
        if (!this.exists()) throw new ExistanceViolationError({
            message: "Accessing parameter `c` of a non-existant line.",
            id: "LLI_L_c",
            description: "Reading properties of non-existant objects is not allowed. Check for existance using the `exists()` method first."
        });
        const { c } = this.intersectionObject.getIntersection() as { a: number, b: number, c: number };
        return c;
    }

    public exists(): boolean {
        return this.intersectionObject.getObjectType() === "line" && this.intersectionObject.exists();
    }
} 