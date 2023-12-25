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
        if (!this.exists()) return NaN;
        const { x } = this.intersectionObject.getIntersection() as { x: number, y: number };
        return x;
    }
    protected getY(): number {
        if (!this.exists()) return NaN;
        const { y } = this.intersectionObject.getIntersection() as { x: number, y: number };
        return y;
    }
    public exists(): boolean {
        return this.intersectionObject.getObjectType() === "point" && this.intersectionObject.exists();
    }
}