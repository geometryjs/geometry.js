import { Interface } from ".";
import { Plane } from "./plane";

/**
 * A part of the GeometryJS scene. 
 */
export interface GeometryObject {
    /**
     * Returns the interfaces implemented by this object.
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

export type GeometryObjectInfo = {
    /**
     * Interfaces implemented by this object.
     */
    implementedInterfaces: Iterable<Interface>;
}