import type { Interval, Line, Plane, Point, Value, Vector } from "../../interfaces";

/**
 * A virtual object is a something that can be a geometry object, but doesn't have a position in space.
 */
export type VirtualObject = Value | Interval | Vector;

/**
 * A non-virtual object is a something that can be a geometry object, and has a position in space.
 */
export type NonVirtualObject = Point | Line | Plane;