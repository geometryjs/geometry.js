import { DependencyNode } from "./dependencyNode";
import { GeometryObject } from "./geometryObject";
import { DependencyNodeObject } from "./synthetic";

/**
 * An Enum represents a set of objects out of which only one can exist at a time.
 */
export interface EnumObject<States extends Record<string, DependencyNodeObject>> extends DependencyNode, GeometryObject {
    /**
     * The states of the enum.
     */
    readonly states: States;

    /**
     * The current state of the enum.
     */ 
    readonly currentState: States[keyof States];

    /**
     * The name of the current state.
     */
    readonly currentStateName: keyof States;
}