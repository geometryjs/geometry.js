import { GeometryObject } from "./interfaces";

/**
 * Checks whether an unknown object is a {@link GeometryObject}.
 * @param object An unknown object.
 * @returns Whether the object is a {@link GeometryObject}.
 * 
 * @group Validators
 */
export function isGeometryObject(object: unknown): object is GeometryObject {
    if (typeof object !== "object" || object === null) return false; // Not an object

    if (!("getImplementedInterfaces" in object)) return false; // Not a GeometryObject
    if (typeof object.getImplementedInterfaces !== "function") return false; // Not a GeometryObject

    if (!("plane" in object)) return false; // Not a GeometryObject
    if (typeof object.plane !== "object" || object.plane === null) return false; // Not a GeometryObject

    if (!("info" in object)) return false; // Not a GeometryObject
    if (typeof object.info !== "object" || object.info === null) return false; // Not a GeometryObject

    return true;
}

