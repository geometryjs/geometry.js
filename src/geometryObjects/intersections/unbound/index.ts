import { NonVirtualObject, NullObject } from "../../../interfaces";
import { isNull } from "../../../validators";
import { UnboundNullObject } from "../../nullObject";

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


export function intersection(a: NonVirtualObject | NullObject, b: NonVirtualObject | NullObject): NonVirtualObject | NullObject {
    if (isNull(a) || isNull(b)) return UnboundNullObject.createNonVirtual();
    throw new Error("Not implemented"); // TODO: Use custom error
}
