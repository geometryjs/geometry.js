import type { PointPointIntersection } from ".";
import { MemoryMapCacheWithAutomaticCalculation } from "../../../../helpers";
import type { Plane } from "../../../../interfaces";
import { AbstractPoint } from "../../../point";

export class PointPointIntersectionPoint extends AbstractPoint {
    protected readonly intersectionObject: PointPointIntersection;
    constructor(parameters: { intersectionObject: PointPointIntersection, plane: Plane }) {
        super({
            dependencies: [parameters.intersectionObject],
            ...parameters,
        });
        this.intersectionObject = parameters.intersectionObject;
    }

    public exists(): boolean {
        return this.intersectionObject.pointsAreEqual() && super.exists();    
    }

    protected getX(): number {
        return this.intersectionObject.getX();
    }
    protected getY(): number {
        return this.intersectionObject.getY();
    }
}