import { Interface } from ".";
import { DependencyNode } from "./dependencyNode";

/**
 * A part of the GeometryJS scene. 
 */
export interface GeometryObject {
    /**
     * Returns the interfaces implemented by this object.
     */
    getImplementedInterfaces(): Iterable<Interface>;
}