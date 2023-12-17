import type { Interface } from "./runtimeInterfaces";
import type { DependencyNode } from "./dependencyNode";
import type { Plane } from "./plane";
import type { ObjectWithType, Runtime } from ".";

/**
 * Represents a GeometryJS object, usually paired with a {@link DependencyNode} interface.
 */
export interface GeometryObject extends ObjectWithType {
    /**
     * Returns the {@link Runtime | runtime representation}interfaces implemented by this object.
     */
    getImplementedInterfaces(): Iterable<Interface>;

    /**
     * Returns the plane this object is on.
     */
    readonly plane: Plane;

    /**
     * Returns information about this object.
     */
    readonly info: GeometryObjectInfo;
}

/**
 * Information about a {@link GeometryObject}. Can be used to quickly get info about an object on runtime.
 */
export type GeometryObjectInfo = {
    /**
     * Runtime values representing interfaces implemented by this object.
     */
    implementedInterfaces: Iterable<Interface>;

    /**
     * Whether this object can directly trigger an update of the dependency tree (not by a dependecy update). An object can usually trigger an update if it has settable values or non-pure methods.
     */
    canCauseUpdate: boolean;
};
