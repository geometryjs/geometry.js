import type { Interface } from "./runtimeInterfaces";
import type { DependencyNode } from "./dependencyNode";
import type { Plane } from "./plane";
import type { NonVirtualObject, NonVirtualObjectType, ObjectType, ObjectWithType, Runtime, VirtualObjectType } from ".";

/**
 * Represents a GeometryJS object, usually paired with a {@link DependencyNode} interface.
 */
export interface GeometryObject<Type extends ObjectType = ObjectType> extends ObjectWithType {
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

    /**
     * Type of this object
     */
    readonly objectType: Type;
}

/**
 * Represents a non-virtual GeometryJS object, usually paired with a {@link DependencyNode} interface.
 */
export interface NonVirtualGeometryObject<Type extends NonVirtualObjectType = NonVirtualObjectType> extends GeometryObject<Type>, NonVirtualObject {
    readonly virtual: false;
    readonly objectType: Type;
}

/**
 * Represents a virtual GeometryJS object, usually paired with a {@link DependencyNode} interface.
 */
export interface VirtualGeometryObject<Type extends VirtualObjectType = VirtualObjectType> extends GeometryObject<Type> {
    readonly virtual: true;
    readonly objectType: Type;
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
