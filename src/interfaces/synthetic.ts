/**
 * Synthetic interfaces combine multiple interfaces into one. Their use should be equivalent to using all of the interfaces at once.
 * @module
 */

import type { DependencyNode } from "./dependencyNode";
import type { GeometryObject, NonVirtualGeometryObject, VirtualGeometryObject } from "./geometryObject";
import type { Interval, IntervalWithSettableEndpoints, IntervalWithSettableEndpointsInclusion } from "./interval";
import type { SingleParametricCurve } from "./parametricCurve";
import type { Point, SettablePoint } from "./point";
import type { SettableValue, Value } from "./value";
import type { SettableVector, Vector } from "./vector";
import type { Line, LineWithSettableEquation, LineWithSettableXAxisAngle } from "./line";
import { Evaluatable } from "./evaluatable";
import { Union } from "./union";
import { NonVirtualObject, NullObject } from "./objectWithType";

/**
 * Interface, that combines the {@link Value}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 *
 * @group Synthetic
 */
export interface ValueObject extends Value, DependencyNode, VirtualGeometryObject<"value"> { }

/**
 * Interface, that combines the {@link SettableValue}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 *
 * @group Synthetic
 */
export interface SettableValueObject extends SettableValue, DependencyNode, VirtualGeometryObject<"value"> { }

/**
 * Interface, that combines the {@link Point}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 *
 * @group Synthetic
 */
export interface PointObject extends Point, DependencyNode, NonVirtualGeometryObject<"point"> { }

/**
 * Interface, that combines the {@link Vector}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 *
 * @group Synthetic
 */
export interface VectorObject extends Vector, DependencyNode, VirtualGeometryObject<"vector"> { }

/**
 * Interface, that combines the {@link SettableVector}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 *
 * @group Synthetic
 */
export interface SettableVectorObject extends SettableVector, DependencyNode, VirtualGeometryObject<"vector"> { }

/**
 * Interface, that combines the {@link Interval}, {@link Evaluatable}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 *
 * @group Synthetic
 */
export interface IntervalObject extends Interval, DependencyNode, VirtualGeometryObject<"interval">, Evaluatable<number, boolean> { }

/**
 * Interface, that combines the {@link SingleParametricCurve}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 *
 * @group Synthetic
 */
export interface SingleParametricCurveObject extends SingleParametricCurve, DependencyNode, GeometryObject { }

/**
 * Interface, that combines the {@link Line}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 *
 * @group Synthetic
 */
export interface LineObject extends Line, DependencyNode, NonVirtualGeometryObject<"line"> { }

/**
 * Interface, that combines the {@link DependencyNode} and {@link GeometryObject} interfaces.
 *
 * @group Synthetic
 */
export interface DependencyNodeObject extends DependencyNode, GeometryObject { }

/**
 * Interface, that combines the {@link IntervalWithSettableEndpoints}, {@link Evaluatable}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 * 
 * @group Synthetic
 */
export interface IntervalWithSettableEndpointsObject extends IntervalWithSettableEndpoints, DependencyNode, VirtualGeometryObject<"interval">, Evaluatable<number, boolean> { }

/**
 * Interface, that combines the {@link IntervalWithSettableEndpointsInclusion}, {@link Evaluatable}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 * 
 * @group Synthetic
 */
export interface IntervalWithSettableEndpointsInclusionObject extends IntervalWithSettableEndpointsInclusion, DependencyNode, VirtualGeometryObject<"interval">, Evaluatable<number, boolean> { }

/**
 * Interface, that combines the {@link IntervalWithSettableEndpointsValue}, {@link Evaluatable}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 * 
 * @group Synthetic
 */
export interface IntervalWithSettableEndpointsValueObject extends IntervalWithSettableEndpointsObject, DependencyNode, VirtualGeometryObject<"interval">, Evaluatable<number, boolean> { }

/**
 * Interface, that combines the {@link SettablePoint}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 * 
 * @group Synthetic
 */
export interface SettablePointObject extends SettablePoint, DependencyNode, NonVirtualGeometryObject<"point"> { }

/**
 * Interface, that combines the {@link LineWithSettableEquation}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 * 
 *  @group Synthetic
 */
export interface LineWithSettableEquationObject extends LineWithSettableEquation, DependencyNode, NonVirtualGeometryObject<"line"> { }

/**
 * Interface, that combines the {@link LineWithSettableXAxisAngle}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 * 
 * @group Synthetic
 */
export interface LineWithSettableXAxisAngleObject extends LineWithSettableXAxisAngle, DependencyNode, NonVirtualGeometryObject<"line"> {}

/**
 * Interface, that combines the {@link Union}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 * 
 * @group Synthetic
 */
export interface UnionObject<Objects extends NonVirtualObject[]> extends DependencyNode, NonVirtualGeometryObject<"union">, Union<Objects> {}

/**
 * Interface, that combines the {@link NullObject}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 * 
 * @group Synthetic
 */
export interface NullObjectDependencyNode<Virtual extends boolean = boolean> extends NullObject<Virtual>, DependencyNode, GeometryObject<"null", Virtual> {}