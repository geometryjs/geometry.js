import { GeometryObject, SettableValue, Value } from "./interfaces";
import { getPropertyDescriptor } from "./helpers/getPropertyDescriptor";
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

/**
 * Checks whether an unknown object is a {@link Value}.
 * @param object An unknown object.
 * @returns Whether the object is a {@link Value}.
 *
 * @group Validators
 */
export function isValue(object: unknown): object is Value {
    if (typeof object !== "object" || object === null) return false; // Not an object

    if (!("value" in object)) return false; // Not a Value
    if (typeof object.value !== "number") return false; // Not a Value

    return true;
}
/**
 * Checks whether an unknown object is a {@link SettableValue}.
 * @param object An unknown object.
 * @returns Whether the object is a {@link SettableValue}.
 *
 * @group Validators
 */
export function isSettableValue(object: unknown): object is SettableValue {
    if (typeof object !== "object" || object === null) return false; // Not an object

    const descriptor = getPropertyDescriptor(object, "value");
    if (descriptor === undefined) return false; // Not a SettableValue

    if (typeof descriptor.get !== "function" && typeof descriptor.value !== "number") return false; // Not a SettableValue
    if (typeof descriptor.set !== "function" && typeof descriptor.value !== "number") return false; // Not a SettableValue

    return true;
}
