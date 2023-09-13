import { GeometryObject } from "./geometryObject";
import { DependencyNode } from "./dependencyNode";
import { SettableValue, Value } from "./value";
import { Point } from "./point";


/**
 * Main GeometryJS object. Represents a 2D plane. 
 */
export interface Plane extends DependencyNode, Iterable<GeometryObject> {
    
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

    /**
     * Creates a readonly value attached to this plane
     */
    createReadonlyValue(value: number): Value & DependencyNode & GeometryObject;

    /**
     * Creates a settable value attached to this plane
     * @param value 
     */
    createValue(value: number): SettableValue & DependencyNode & GeometryObject;

    /**
     * Creates a point attached to this plane.
     * @param x Value for the X coordinate of the point.
     * @param y Value for the Y coordinate of the point.
     */
    createPointFromTwoValues(x: Value & DependencyNode, y: Value & DependencyNode): Point & GeometryObject & DependencyNode;
}