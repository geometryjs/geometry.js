/**
 * Synthetic interfaces combine multiple interfaces into one. Their use should be equivalent to using all of the interfaces at once.
 * @module
 */

import type { DependencyNode } from "./dependencyNode";
import type { GeometryObject } from "./geometryObject";
import type { Interval, IntervalWithSettableEndpoints, IntervalWithSettableEndpointsInclusion } from "./interval";
import type { SingleParametricCurve } from "./parametricCurve";
import type { Point, SettablePoint } from "./point";
import type { SettableValue, Value } from "./value";
import type { SettableVector, Vector } from "./vector";
import type { Line, LineWithSettableEquation, LineWithSettableXAxisAngle } from "./line";
import { Evaluatable } from "./evaluatable";
import { Union } from "./union";

/**
 * Interface, that combines the {@link Value}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 *
 * @group Synthetic
 */
export interface ValueObject extends Value, DependencyNode, GeometryObject { }

/**
 * Interface, that combines the {@link SettableValue}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 *
 * @group Synthetic
 */
export interface SettableValueObject extends SettableValue, DependencyNode, GeometryObject { }

/**
 * Interface, that combines the {@link Point}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 *
 * @group Synthetic
 */
export interface PointObject extends Point, DependencyNode, GeometryObject { }

/**
 * Interface, that combines the {@link Vector}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 *
 * @group Synthetic
 */
export interface VectorObject extends Vector, DependencyNode, GeometryObject { }

/**
 * Interface, that combines the {@link SettableVector}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 *
 * @group Synthetic
 */
export interface SettableVectorObject extends SettableVector, DependencyNode, GeometryObject { }

/**
 * Interface, that combines the {@link Interval}, {@link Evaluatable}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 *
 * @group Synthetic
 */
export interface IntervalObject extends Interval, DependencyNode, GeometryObject, Evaluatable<number, boolean> { }

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
export interface LineObject extends Line, DependencyNode, GeometryObject { }

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
export interface IntervalWithSettableEndpointsObject extends IntervalWithSettableEndpoints, DependencyNode, GeometryObject, Evaluatable<number, boolean> { }

/**
 * Interface, that combines the {@link IntervalWithSettableEndpointsInclusion}, {@link Evaluatable}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 * 
 * @group Synthetic
 */
export interface IntervalWithSettableEndpointsInclusionObject extends IntervalWithSettableEndpointsInclusion, DependencyNode, GeometryObject, Evaluatable<number, boolean> { }

/**
 * Interface, that combines the {@link IntervalWithSettableEndpointsValue}, {@link Evaluatable}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 * 
 * @group Synthetic
 */
export interface IntervalWithSettableEndpointsValueObject extends IntervalWithSettableEndpointsObject, DependencyNode, GeometryObject, Evaluatable<number, boolean> { }

/**
 * Interface, that combines the {@link SettablePoint}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 * 
 * @group Synthetic
 */
export interface SettablePointObject extends SettablePoint, DependencyNode, GeometryObject { }

/**
 * Interface, that combines the {@link LineWithSettableEquation}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 * 
 *  @group Synthetic
 */
export interface LineWithSettableEquationObject extends LineWithSettableEquation, DependencyNode, GeometryObject { }

/**
 * Interface, that combines the {@link LineWithSettableXAxisAngle}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 * 
 * @group Synthetic
 */
export interface LineWithSettableXAxisAngleObject extends LineWithSettableXAxisAngle, DependencyNode, GeometryObject {}

/**
 * Interface, that combines the {@link Union}, {@link DependencyNode} and {@link GeometryObject} interfaces.
 * 
 * @group Synthetic
 */
export interface UnionObject<Object, Objects extends Object[]> extends DependencyNode, GeometryObject, Union<Object, Objects> {}