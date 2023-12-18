import { MemoryMapCacheWithAutomaticCalculation } from "../../../../helpers";
import type { LineObject, NullObjectDependencyNode, Plane, PointObject } from "../../../../interfaces";
import { Derived } from "../../../../procedures";
import { AbstractEnum } from "../../../enum";
import { LineLineIntersectionNull } from "./nullObject";

/**
 * Intersection of two lines.
 */
export class LineLineIntersection extends AbstractEnum<{
    "none": NullObjectDependencyNode<false>,
    "point": PointObject,
    "line": LineObject
}, {
    objectType: "null" | "point" | "line",
    intersection: null | { x: number, y: number } | { a: number, b: number, c: number }
}> {
    protected readonly line1: LineObject;
    protected readonly line2: LineObject;

    protected readonly LineIntersection;
    protected readonly nullObjectIntersection: LineLineIntersectionNull;
    protected readonly pointIntersection;

    constructor(parameters: { line1: LineObject, line2: LineObject, plane: Plane }) {
        super({
            dependencies: [parameters.line1, parameters.line2],
            cache: new MemoryMapCacheWithAutomaticCalculation<{
                objectType: "null" | "point" | "line",
                intersection: null | { x: number, y: number } | { a: number, b: number, c: number }
            }>({
                objectType: () => {
                    const result = Derived.LINE_LINE_INTERSECTION.perform({ line1: this.line1, line2: this.line2 });
                    this.cache.saveValue("intersection", result.intersection); // Gets the data, so it is cached.
                    return result.objectType;
                },
                intersection: () => {
                    const result = Derived.LINE_LINE_INTERSECTION.perform({ line1: this.line1, line2: this.line2 });
                    this.cache.saveValue("objectType", result.objectType); // Gets the data, so it is cached.
                    return result.intersection;
                }
            }),
            implementedInterfaces: [],
            ...parameters
        });
        this.line1 = parameters.line1;
        this.line2 = parameters.line2;

        this.LineIntersection = new LineLineIntersectionNull({ plane: parameters.plane, intersectionObject: this });
    }

    protected getStates(): { none: NullObjectDependencyNode<false>; point: PointObject; line: LineObject; } {
        return {
            none: this.nullObjectIntersection,
            point: this.pointIntersection,
            line: this.LineIntersection
        };
    }

    protected getCurrentStateName(): "none" | "point" | "line" {
        return ({
            "null": "none",
            "point": "point",
            "line": "line"
        } as const)[this.cache.readValue("objectType")]; // This might seem redundant, but the name of the state is *none* as in *no intersect* and the type of the object is *null* as in *not an object*.
    }

    /**
     * Returns the type of the object.
     * @internal
     */
    public getObjectType(): "null" | "point" | "line" {
        return this.cache.readValue("objectType");
    }

    /**
     * Returns the intersection of the two lines.
     * @internal
     */
    public getIntersection(): null | { x: number, y: number } | { a: number, b: number, c: number } {
        return this.cache.readValue("intersection");
    }
}