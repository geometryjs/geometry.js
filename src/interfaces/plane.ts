import { GeometryObject } from "./geometryObject";
import { DependencyNode } from "./dependencyNode";
import { PointObject, SettableValueObject, ValueObject } from "./synthetic";


/**
 * Main GeometryJS object. Represents a 2D plane. 
 */
export interface Plane extends DependencyNode, Iterable<GeometryObject> {
    
    /**
     * Links an object to this plane.
     * @param object Object to link to this plane.
     * @group Object linking
     */
    linkObject(object: GeometryObject): void;

    /**
     * Unlinks an object from this plane.  
     * This does not remove the object from the dependency tree, it just removes the object from the plane list of objects.
     * @param object Unlinks an object from this plane.
     * @group Object linking
     */
    ulinkObject(object: GeometryObject): void;

    /**
     * Creates a readonly value attached to this plane.
     * @group Object creation
     */
    createReadonlyValue(value: number): ValueObject;

    /**
     * Creates a settable value attached to this plane
     * @param value 
     * @group Object creation
     */
    createValue(value: number): SettableValueObject;

    /**
     * Creates a point attached to this plane.
     * @param x Value for the X coordinate of the point.
     * @param y Value for the Y coordinate of the point.
     * @group Object creation
     */
    createPointFromTwoValues(x: ValueObject, y: ValueObject): PointObject;
}