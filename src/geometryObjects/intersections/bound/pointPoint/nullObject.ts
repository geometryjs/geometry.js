import type { PointPointIntersection } from ".";
import { MemoryMapCacheWithAutomaticCalculation } from "../../../../helpers";
import { Plane, Runtime } from "../../../../interfaces";
import { AbstractNullObject } from "../../../nullObject";

/**
 * Case of the Point Point intersection.
 * Exists if the points are not equal and thus have no intersection.
 */
export class PointPointIntersectionNull extends AbstractNullObject {
    protected readonly intersectionObject: PointPointIntersection;
    constructor(parameters: { plane: Plane, intersectionObject: PointPointIntersection }) {
        super({
            ...parameters,
            dependencies: [parameters.intersectionObject]
        });
        this.intersectionObject = parameters.intersectionObject;
    }

    protected isVirtual(): boolean {
        return false;
    }
    protected doesExist(): boolean {
        return !this.intersectionObject.pointsAreEqual();
    }
}