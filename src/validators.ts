import type { DependencyNode, DependencyNodeObject, GeometryObject, Line, Point, PointObject, SettableValue, SettableValueObject, Value, ValueObject } from "./interfaces";

import { getPropertyDescriptor } from "./helpers/getPropertyDescriptor";
import { inIterable } from "./helpers/iterable";
import { ObjectWithType, VirtualObject } from "./interfaces/objectWithType";
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
    // @ts-ignore
    if (typeof object.getImplementedInterfaces !== "function") return false; // Not a GeometryObject

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
    // @ts-ignore
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

/**
 * Checks whether an unknown object is a {@link Point}.
 * @param object An unknown object.
 * @returns Whether the object is a {@link Point}.
 *
 * @group Validators
 */
export function isPoint(object: unknown): object is Point {
    if (typeof object !== "object" || object === null) return false; // Not an object

    if (!("x" in object)) return false; // Not a Point

    if (!("y" in object)) return false; // Not a Point

    return true;
}

/**
 * Checks whether an unknown object is a {@link DependencyNode}.
 * @param object An unknown object.
 * @returns Whether the object is a {@link DependencyNode}.
 *
 * @group Validators
 */
export function isDependencyNode(object: unknown): object is DependencyNode {
    if (typeof object !== "object" || object === null) return false; // Not an object
    if (!getPropertyDescriptor(object, "dependencies")) return false; // Not a DependencyNode
    if (!getPropertyDescriptor(object, "dependants")) return false; // Not a DependencyNode
    if (!getPropertyDescriptor(object, "deepDependencies")) return false; // Not a DependencyNode
    if (!getPropertyDescriptor(object, "deepDependants")) return false; // Not a DependencyNode

    return true;
}

/**
 * Checks whether an unknown object is a {@link DependencyNodeObject}.
 * @param object An unknown object.
 * @returns Whether the object is a {@link DependencyNodeObject}.
 *
 * @group Validators
 */
export function isDependencyNodeObject(object: unknown): object is DependencyNodeObject {
    if (!isGeometryObject(object)) return false;
    if (!inIterable(object.getImplementedInterfaces(), "DependencyNode")) return false;

    return true;
}

/**
 * Checks whether an unknown object is a {@link ValueObject}.
 * @param object An unknown object.
 * @returns Whether the object is a {@link ValueObject}.
 *
 * @group Validators
 */
export function isValueObject(object: unknown): object is ValueObject {
    if (!isGeometryObject(object)) return false;
    if (!inIterable(object.getImplementedInterfaces(), "Value")) return false;

    return true;
}

/**
 * Checks whether an unknown object is a {@link SettableValueObject}.
 * @param object An unknown object.
 * @returns Whether the object is a {@link SettableValueObject}.
 *
 * @group Validators
 */
export function isSettableValueObject(object: unknown): object is SettableValueObject {
    if (!isGeometryObject(object)) return false;
    if (!inIterable(object.getImplementedInterfaces(), "SettableValue")) return false;

    return true;
}

/**
 * Checks whether an unknown object is a {@link PointObject}.
 * @param object An unknown object.
 * @returns Whether the object is a {@link PointObject}.
 *
 * @group Validators
 */
export function isPointObject(object: unknown): object is PointObject {
    if (!isGeometryObject(object)) return false;
    if (!inIterable(object.getImplementedInterfaces(), "Point")) return false;

    return true;
}

/**
 * Checks whether an unknown object is a {@link ObjectWithType}.
 * @param object An unknown object.  
 * @returns Whether the object is a {@link ObjectWithType}.
 * 
 * @group Validators
 */
export function isObjectWithType(object: unknown): object is ObjectWithType {
    if (typeof object !== "object" || object === null) return false; // Not an object
    if (!getPropertyDescriptor(object, "objectType")) return false; // Not an ObjectWithType
    if (typeof (object as { objectType: any }).objectType !== "string") return false; // Not an ObjectWithType

    return true;
}

/**
 * Checks whether an {@link ObjectWithType} is a {@link VirtualObject}.
 * @param object An object with type.
 * @returns If the object is a {@link VirtualObject}.
 * 
 * @group Validators
 */
export function isObjectWithTypeVirtual(object: ObjectWithType): object is VirtualObject {
    return object.virtual;
}

/**
 * Checks whether an {@link ObjectWithType} is a {@link VirtualObject}.
 * @param object An object with type.
 * @returns If the object is a {@link VirtualObject}.
 * 
 * @group Validators
 */
export function isObjectWithTypeNonVirtual(object: ObjectWithType): object is VirtualObject {
    return !object.virtual;
}