import { MemoryMapCacheWithAutomaticCalculation } from "../../../../helpers";
import { isEqual } from "../../../../helpers/equality/float";
import type { Plane, PointObject } from "../../../../interfaces";
import { AbstractEnum } from "../../../enum";
import { PointPointIntersectionNull } from "./nullObject";
import { PointPointIntersectionPoint } from "./point";

export { PointPointIntersectionNull, PointPointIntersectionPoint };
export class PointPointIntersection extends AbstractEnum<{
    "none": PointPointIntersectionNull,
    "point": PointObject,
}, {
    equal: boolean
}> {
    protected readonly point1: PointObject;
    protected readonly point2: PointObject;

    protected readonly nullObject: PointPointIntersectionNull;
    protected readonly point: PointPointIntersectionPoint;
    constructor(parameters: { point1: PointObject, point2: PointObject, plane: Plane }) {
        super({
            dependencies: [parameters.point1, parameters.point2],
            cache: new MemoryMapCacheWithAutomaticCalculation<{ equal: boolean }>({
                equal: () => {
                    return isEqual(this.point1.x, this.point2.x) && isEqual(this.point1.y, this.point2.y);
                }
            }),
            implementedInterfaces: [],
            ...parameters
        });
        this.point1 = parameters.point1;
        this.point2 = parameters.point2;

        this.nullObject = new PointPointIntersectionNull({ plane: parameters.plane, intersectionObject: this });
        this.point = new PointPointIntersectionPoint({ plane: parameters.plane, intersectionObject: this });
    }
    /**
     * Returns true if the points are equal.
     * @internal
     */
    public pointsAreEqual(): boolean {
        return this.cache.readValue("equal");
    }
    /**
     * Returns the average of the two points in the X direction.
     * @internal
     */
    public getX(): number {
        return (this.point1.x + this.point2.x) / 2;
    }
    /**
     * Returns the average of the two points in the Y direction.
     * @internal
     */
    public getY(): number {
        return (this.point1.y + this.point2.y) / 2;
    }

    protected getStates() {
        return {
            "none": this.nullObject,
            "point": this.point1,
        };
    }
    protected getCurrentStateName() {
        return this.pointsAreEqual() ? "point" : "none";
    }



}