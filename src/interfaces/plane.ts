import { GeometryObject } from "../geometryObjects/geometryObject";
import { DependencyNode } from "./dependencyNode";


/**
 * Main GeometryJS object. Represents a 2D plane. 
 */
export interface Plane extends GeometryObject, DependencyNode, Iterable<GeometryObject> {
    
    /**
     * Links an object to this plane.
     * @param object Object to link to this plane.
     */
    linkObject(object: GeometryObject): void;

    /**
     * Unlinks an object from this plane.
     * @param object Unlinks an object from this plane.
     */
    ulinkObject(object: GeometryObject): void;
}