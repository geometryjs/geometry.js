import type { LineLineIntersection } from ".";
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
        if (!this.exists()) throw new Error("Getting the value of a non-existant point"); // TODO: Change to custom error
        const { x } = this.intersectionObject.getIntersection() as { x: number, y: number };
        return x;
    }
    protected getY(): number {
        if (!this.exists()) throw new Error("Getting the value of a non-existant point"); // TODO: Change to custom error
        const { y } = this.intersectionObject.getIntersection() as { x: number, y: number };
        return y;
    }
    public exists(): boolean {
        return this.intersectionObject.getObjectType() === "point" && super.exists();
    }
}