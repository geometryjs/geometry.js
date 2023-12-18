import type { LineLineIntersection } from ".";
import { Plane } from "../../../../interfaces";
import { AbstractNullObject } from "../../../nullObject";

/**
 * Case of the Line Line intersection.
 * Exists if the lines are parallel but not equal.
 */
export class LineLineIntersectionNull extends AbstractNullObject<false> {
    protected readonly intersectionObject: LineLineIntersection;
    constructor(parameters: { plane: Plane, intersectionObject: LineLineIntersection }) {
        super({
            ...parameters,
            dependencies: [parameters.intersectionObject]
        });
        this.intersectionObject = parameters.intersectionObject;
    }

    protected isVirtual(): false {
        return false;
    }
    protected doesExist(): boolean {
        return this.intersectionObject.getObjectType() === "null";
    }
}