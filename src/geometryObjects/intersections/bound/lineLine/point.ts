import type { LineLineIntersection } from ".";
import { ExistanceViolationError } from "../../../../errors";
import type { Plane } from "../../../../interfaces";
import { AbstractPoint } from "../../../point";

/**
 * Case of the Line Line intersection.
 * Exists if the lines are not parallel.
 */
export class LineLineIntersectionPoint extends AbstractPoint {
    protected readonly intersectionObject: LineLineIntersection;
    constructor(parameters: { intersectionObject: LineLineIntersection, plane: Plane }) {
        super({
            dependencies: [parameters.intersectionObject],
            ...parameters,
        });
        this.intersectionObject = parameters.intersectionObject;
    }

    protected getX(): number {
        if (!this.exists()) throw new ExistanceViolationError({
            message: "Accessing parameter `x` of a non-existant point.",
            id: "LLI_P_x",
            description: "Reading properties of non-existant objects is not allowed. Check for existance using the `exists()` method first."
        });
        const { x } = this.intersectionObject.getIntersection() as { x: number, y: number };
        return x;
    }
    protected getY(): number {
        if (!this.exists()) throw new ExistanceViolationError({
            message: "Accessing parameter `y` of a non-existant point.",
            id: "LLI_P_y",
            description: "Reading properties of non-existant objects is not allowed. Check for existance using the `exists()` method first."
        });
        const { y } = this.intersectionObject.getIntersection() as { x: number, y: number };
        return y;
    }
    public exists(): boolean {
        return this.intersectionObject.getObjectType() === "point" && this.intersectionObject.exists();
    }
}