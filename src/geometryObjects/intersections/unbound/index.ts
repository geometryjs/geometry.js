import { Line, NonVirtualObject, NullObject, Point } from "../../../interfaces";
import { isLine, isNull, isPoint } from "../../../validators";
import { UnboundNullObject } from "../../nullObject";
import { intersectionLineLine } from "./lineLine";
import { intersectionPointPoint } from "./pointPoint";

// Intersections with null objects
/**
 * Intersection between two null objects.
 * @param nullObject1 A Null object   
 * @param nullObject2 A Null object
 * @returns A Null object
 */
export function intersection(nullObject1: NullObject, nullObject2: NullObject): NullObject;
/**
 * Intersection between a null object and a non-virtual object.
 * @param nullObject A Null object
 * @param object Any object 
 * @returns A Null object
 */
export function intersection(nullObject: NullObject, object: NonVirtualObject): NullObject;
/**
 * Intersection between a non-virtual object and a null object.
 * @param object Any object 
 * @param nullObject A Null object
 * @returns A Null object
 */
export function intersection(object: NonVirtualObject, nullObject: NullObject): NullObject;

/**
 * If the points are equal, returns a point, otherwise returns a null object.
 * @param point1 First point
 * @param point2 Second point
 */
export function intersection(point1: Point, point2: Point): Point | NullObject;

/**
 * Returns the intersection of the lines
 * @param line1 First line
 * @param line2 Second line
 */
export function intersection(line1: Line, line2: Line): Line | Point | NullObject;

export function intersection(a: NonVirtualObject | NullObject, b: NonVirtualObject | NullObject): NonVirtualObject | NullObject {
    if (isNull(a) || isNull(b)) return UnboundNullObject.createNonVirtual();
    if (isPoint(a) && isPoint(b)) return intersectionPointPoint(a, b);
    if (isLine(a) && isLine(b)) return intersectionLineLine(a, b);
    throw new Error("Not implemented"); // TODO: Use custom error
}
