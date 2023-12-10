import type { DependencyNodeObject, EnumObject, Interval, Line, Plane, Point, Union, Value, Vector } from "../../interfaces";

/**
 * A virtual object is a something that can be a geometry object, but doesn't have a position in space.
 */
export type VirtualObject = Value | Interval | Vector;

/**
 * A virtual object identifier is a string, that identifies a virtual object.
 */
export type VirtualObjectIdentifier = "value" | "interval" | "vector";

/**
 * A non-virtual object is a something that can be a geometry object, and has a position in space.
 */
export type NonVirtualObject = Point | Line | Plane | EnumObject<Record<string, NonVirtualObject & DependencyNodeObject>> | Union<NonVirtualObject, NonVirtualObject[]>;

/**
 * A non-virtual object identifier is a string, that identifies a non-virtual object.
 */
export type NonVirtualObjectIdentifier = "point" | "line" | "plane" | "enum" | "union";