import { GeometryObject } from "../geometryObjects/geometryObject";
import { DependencyNode } from "./dependencyNode";


/**
 * Main GeometryJS object. Represents a 2D plane. 
 */
export interface Plane extends GeometryObject, DependencyNode {
    
    /**
     * Links an object to this plane.
     * @param object Object to link to this plane.
     */
    linkObject(object: GeometryObject): void;
}