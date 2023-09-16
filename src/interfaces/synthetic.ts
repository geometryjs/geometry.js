/**
 * Synthetic interfaces combine multiple interfaces into one. Their use should be equivalent to using all of the interfaces at once.
 * @module
 */

import { DependencyNode } from "./dependencyNode";
import { GeometryObject } from "./geometryObject";
import { Point } from "./point";
import { SettableValue, Value } from "./value";

/**
 * Interface, that combines the {@link Value}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 *
 * @group Synthetic
 */
export interface ValueObject extends Value, DependencyNode, GeometryObject {}

/**
 * Interface, that combines the {@link SettableValue}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 *
 * @group Synthetic
 */
export interface SettableValueObject extends SettableValue, DependencyNode, GeometryObject {}

/**
 * Interface, that combines the {@link Point}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 *
 * @group Synthetic
 */
export interface PointObject extends Point, DependencyNode, GeometryObject {}
