import type { GeometryObject } from "./geometryObject";
import type { DependencyNode } from "./dependencyNode";
import type { IntervalWithSettableEndpointsInclusionObject, IntervalWithSettableEndpointsObject, IntervalWithSettableEndpointsValueObject, LineObject, PointObject, SettablePointObject, SettableValueObject, ValueObject, VectorObject } from "./synthetic";


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

    /**
     * Creates a point attached to this plane.
     * @param x Value for the X coordinate of the point.
     * @param y Value for the Y coordinate of the point.
     * @group Object creation
     */
    createPointFromCoordinates(x: number, y: number): SettablePointObject;

    /**
     * Creates a vector attached to this plane.
     * @param x Value for the X coordinate of the vector.
     * @param y Value for the Y coordinate of the vector.
     * @group Object creation
     */
    createVectorFromTwoValues(x: ValueObject, y: ValueObject): VectorObject;

    /**
     * Creates a vector attached to this plane.
     * @param x Value for the X coordinate of the vector.
     * @param y Value for the Y coordinate of the vector.
     * @group Object creation
     */
    createVectorFromCoordinates(x: number, y: number): VectorObject;

    /**
     * Creates an interval attached to this plane.
     * @param start Start value of the interval.
     * @param startIsIncluded Whether the start value is included in the interval.
     * @param end End value of the interval.
     * @param endIsIncluded Whether the end value is included in the interval.
     * @group Object creation
     */
    createIntervalFromEndpointsAsValues(start: ValueObject, startIsIncluded: boolean, end: ValueObject, endIsIncluded: boolean): IntervalWithSettableEndpointsInclusionObject;

    /**
     * Creates an interval attached to this plane.
     * @param start Start value of the interval.
     * @param startIsIncluded Whether the start value is included in the interval.
     * @param end End value of the interval.
     * @param endIsIncluded Whether the end value is included in the interval.
     * @group Object creation
     */
    createIntervalFromEndpointsAsNumbers(start: number, startIsIncluded: boolean, end: number, endIsIncluded: boolean): IntervalWithSettableEndpointsObject;

    /**
     * Creates a closed interval attached to this plane.
     * @param start Start value of the interval.
     * @param end End value of the interval.
     * @group Object creation
     */
    createClosedIntervalFromEndpointsAsValues(start: ValueObject, end: ValueObject): IntervalWithSettableEndpointsInclusionObject;

    /**
     * Creates a closed interval attached to this plane.
     * @param start Start value of the interval.
     * @param end End value of the interval.
     * @group Object creation
     */
    createClosedIntervalFromEndpointsAsNumbers(start: number, end: number): IntervalWithSettableEndpointsValueObject;

    /**
     * Creates an open interval attached to this plane.
     * @param start Start value of the interval.
     * @param end End value of the interval.
     * @group Object creation
     */
    createOpenIntervalFromEndpointsAsValues(start: ValueObject, end: ValueObject): IntervalWithSettableEndpointsInclusionObject;

    /**
     * Creates an open interval attached to this plane.
     * @param start Start value of the interval.
     * @param end End value of the interval.
     * @group Object creation
     */
    createOpenIntervalFromEndpointsAsNumbers(start: number, end: number): IntervalWithSettableEndpointsValueObject;
    
    /**
     * Creates a line attached to this plane.
     * @param point1 First point of the line.
     * @param point2 Second point of the line
     * @group Object creation
     */
    createLineFromTwoPoints(point1: PointObject, point2: PointObject): LineObject;

    /**
     * Constructs a perpendicular line to the given line, passing through the given point.
     * @param line Line to which the constructed line should be perpendicular.
     * @param point Point through which the constructed line should pass.
     * @group Object construction
     */
    constructPerpendicularLineFromPoint(line: LineObject, point: PointObject): LineObject;

    /**
     * Constructs a parallel line to the given line, passing through the given point.
     * @param line Line to which the constructed line should be parallel.
     * @param point Point through which the constructed line should pass.
     * @group Object construction
     */
    constructParallelLineFromPoint(line: LineObject, point: PointObject): LineObject;
}