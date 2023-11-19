import type { Cache as ICache, IterableCache as IIterableCache } from "./cache";
import type { Evaluatable as IEvaluatable } from "./evaluatable";
import type { DependencyNode as IDependencyNode } from "./dependencyNode";
import type { GeometryObject as IGeometryObject } from "./geometryObject";
import type { Plane as IPlane } from "./plane";
import type { Procedure as IProcedure } from "./procedure";
import type { Transformer as ITransformer } from "./transformer";
import type { Value as IValue, SettableValue as ISettableValue } from "./value";
import type { Point as IPoint, SettablePoint as ISettablePoint } from "./point";
import type { Vector as IVector, SettableVector as ISettableVector, BareReadonlyVector as IBareReadonlyVector, BareVector as IBareVector } from "./vector";
import type { Interval as IInterval, IntervalWithSettableEndpoints as IIntervalWithSettableEndpoints, IntervalWithSettableEndpointsInclusion as IIntervalWithSettableEndpointsInclusion, IntervalWithSettableEndpointsValue as IIntervalWithSettableEndpointsValue } from "./interval";
import type { SingleParametricCurve as ISingleParametricCurve } from "./parametricCurve";
import type { Line as ILine, LineWithSettableArbitraryPoints as ILineWithSettableArbitraryPoints, LineWithSettableDirectionalVector as ILineWithSettableDirectionalVector, LineWithSettableEquation as ILineWithSettableEquation, LineWithSettableNormalVector as ILineWithSettableNormalVector, LineWithSettableXAxisAngle as ILineWithSettableXAxisAngle } from "./line";

import type * as Synthetic from "./synthetic";

/**
 * Represents the {@link ICache | Cache} interface at runtime.
 */
export const Cache = ["Cache"] as const;

/**
 * Represents the {@link IIterableCache | IterableCache} interface at runtime.
 */
export const IterableCache = ["IterableCache", ...Cache] as const;

/**
 * Represents the {@link IEvaluatable | Evaluatable} interface at runtime.
 */
export const Evaluatable = ["Evaluatable"] as const;

/**
 * Represents the {@link IDependencyNode | DependencyNode} interface at runtime.
 */
export const DependencyNode = ["DependencyNode"] as const;

/**
 * Represents the {@link IGeometryObject | GeometryObject} interface at runtime.
 */
export const GeometryObject = ["GeometryObject"] as const;

/**
 * Represents the {@link IPlane | Plane} interface at runtime.
 */
export const Plane = ["Plane", ...GeometryObject, ...DependencyNode, ...IterableCache] as const;

/**
 * Represents the {@link IProcedure | Procedure} interface at runtime.
 */
export const Procedure = ["Procedure"] as const;

/**
 * Represents the {@link ITransformer | Transformer} interface at runtime.
 */
export const Transformer = ["Transformer"] as const;

/**
 * Represents the {@link IValue | Value} interface at runtime.
 */
export const Value = ["Value"] as const;

/**
 * Represents the {@link ISettableValue | SettableValue} interface at runtime.
 */
export const SettableValue = ["SettableValue", ...Value] as const;

/**
 * Represents the {@link IPoint | Point} interface at runtime.
 */
export const Point = ["Point"] as const;

/**
 * Represents the {@link IVector | Vector} interface at runtime.
 */
export const Vector = ["Vector"] as const;

/**
 * Represents the {@link ISettableVector | SettableVector} interface at runtime.
 */
export const SettableVector = ["SettableVector", ...Vector] as const;

/**
 * Represents the {@link IBareReadonlyVector | BareReadonlyVector} interface at runtime.
 */
export const BareReadonlyVector = ["BareReadonlyVector"] as const;

/**
 * Represents the {@link IBareVector | BareVector} interface at runtime.
 */
export const BareVector = ["BareVector"] as const;

/**
 * Represents the {@link IInterval | Interval} interface at runtime.
 */
export const Interval = ["Interval"] as const;

/**
 * Represents the {@link ISingleParametricCurve | SingleParametricCurve} interface at runtime.
 */
export const SingleParametricCurve = ["SingleParametricCurve", ...Evaluatable] as const;

/**
 * Represents the {@link ILine | Line} interface at runtime.
 */
export const Line = ["Line"] as const;

/**
 * Represents the {@link IIntervalWithSettableEndpoints | IntervalWithSettableEndpoints} interface at runtime.
 */
export const IntervalWithSettableEndpointsInclusion = ["IntervalWithSettableEndpointsInclusion", ...Interval] as const;

/**
 * Represents the {@link IIntervalWithSettableEndpointsInclusion | IntervalWithSettableEndpointsInclusion} interface at runtime.
 */
export const IntervalWithSettableEndpoints = ["IntervalWithSettableEndpoints", ...Interval] as const;

/**
 * Represents the {@link IIntervalWithSettableEndpointsValue | IntervalWithSettableEndpointsValue} interface at runtime.
 */
export const IntervalWithSettableEndpointsValue = ["IntervalWithSettableEndpointsValue", ...Interval] as const;

/**
 * Represents the {@link ISettablePoint | SettablePoint} interface at runtime.  
 */
export const SettablePoint = ["SettablePoint", ...Point] as const;

/**
 * Represents the {@link ILineWithSettableEquation | LineWithSettableEquation} interface at runtime.
 */
export const LineWithSettableEquation = ["LineWithSettableEquation", ...Line] as const;

/**
 * Represents the {@link ILineWithSettableArbitraryPoints | LineWithSettableArbitraryPoints} interface at runtime.
 */
export const LineWithSettableArbitraryPoints = ["LineWithSettableArbitraryPoints", ...Line] as const;

/**
 * Represents the {@link ILineWithSettableDirectionalVector | LineWithSettableDirectionalVector} interface at runtime.
 */
export const LineWithSettableDirectionalVector = ["LineWithSettableDirectionalVector", ...Line] as const;

/**
 * Represents the {@link ILineWithSettableNormalVector | LineWithSettableNormalVector} interface at runtime.
 */
export const LineWithSettableNormalVector = ["LineWithSettableNormalVector", ...Line] as const;

/**
 * Represents the {@link ILineWithSettableXAxisAngle | LineWithSettableXAxisAngle} interface at runtime.
 */
export const LineWithSettableXAxisAngle = ["LineWithSettableXAxisAngle", ...Line] as const;


/**
 * General type for all constants, that represent interfaces at runtime.
 */
export type Interface = Readonly<
    | (typeof Cache)[number]
    | (typeof IterableCache)[number]
    | (typeof Evaluatable)[number]
    | (typeof DependencyNode)[number]
    | (typeof GeometryObject)[number]
    | (typeof Plane)[number]
    | (typeof Procedure)[number]
    | (typeof Transformer)[number]
    | (typeof Value)[number]
    | (typeof SettableValue)[number]
    | (typeof Point)[number]
    | (typeof Vector)[number]
    | (typeof SettableVector)[number]
    | (typeof BareReadonlyVector)[number]
    | (typeof BareVector)[number]
    | (typeof Interval)[number]
    | (typeof SingleParametricCurve)[number]
    | (typeof Line)[number]
    | (typeof IntervalWithSettableEndpoints)[number]
    | (typeof IntervalWithSettableEndpointsInclusion)[number]
    | (typeof IntervalWithSettableEndpointsValue)[number]
    | (typeof SettablePoint)[number]
    | (typeof LineWithSettableEquation)[number]
    | (typeof LineWithSettableArbitraryPoints)[number]
    | (typeof LineWithSettableDirectionalVector)[number]
    | (typeof LineWithSettableNormalVector)[number]
    | (typeof LineWithSettableXAxisAngle)[number]
>;

// Synthetic interfaces
/**
 * Represents the synthetic {@link Synthetic.ValueObject | ValueObject} interface at runtime.
 *
 * @group Synthetic
 */
export const ValueObject = [...Value, ...DependencyNode, ...GeometryObject] as const;

/**
 * Represents the synthetic {@link Synthetic.SettableValueObject | SettableValueObject} interface at runtime.
 *
 * @group Synthetic
 */
export const SettableValueObject = [...SettableValue, ...DependencyNode, ...GeometryObject] as const;

/**
 * Represents the synthetic {@link Synthetic.PointObject | PointObject} interface at runtime.
 *
 * @group Synthetic
 */
export const PointObject = [...Point, ...DependencyNode, ...GeometryObject] as const;

/**
 * Represents the synthetic {@link Synthetic.DependencyNodeObject | DependencyNodeObject} interface at runtime.
 */
export const DependencyNodeObject = [...DependencyNode, ...GeometryObject] as const;

/**
 * Represents the synthetic {@link Synthetic.VectorObject | VectorObject} interface at runtime.
 *
 * @group Synthetic
 */
export const VectorObject = [...Vector, ...DependencyNode, ...GeometryObject] as const;

/**
 * Represents the synthetic {@link Synthetic.SettableVectorObject | SettableVectorObject} interface at runtime.
 *
 * @group Synthetic
 */
export const SettableVectorObject = [...SettableVector, ...DependencyNode, ...GeometryObject] as const;

/**
 * Represents the synthetic {@link Synthetic.IntervalObject | IntervalObject} interface at runtime.
 *
 * @group Synthetic
 */
export const IntervalObject = [...Interval, ...DependencyNode, ...GeometryObject, ...Evaluatable] as const;

/**
 * Represents the synthetic {@link Synthetic.SingleParametricCurveObject | SingleParametricCurveObject} interface at runtime.
 *
 * @group Synthetic
 */
export const SingleParametricCurveObject = [...SingleParametricCurve, ...DependencyNode, ...GeometryObject] as const;

/**
 * Represents the synthetic {@link Synthetic.LineObject | LineObject} interface at runtime.
 *
 * @group Synthetic
 */
export const LineObject = [...Line, ...DependencyNode, ...GeometryObject] as const;

/**
 * Represents the synthetic {@link Synthetic.IntervalWithSettableEndpointsObject | IntervalWithSettableEndpointsObject} interface at runtime.
 */
export const IntervalWithSettableEndpointsObject = [...Evaluatable, ...IntervalWithSettableEndpoints, ...DependencyNode, ...GeometryObject] as const;

/**
 * Represents the synthetic {@link Synthetic.IntervalWithSettableEndpointsInclusionObject | IntervalWithSettableEndpointsInclusionObject} interface at runtime.
 */
export const IntervalWithSettableEndpointsInclusionObject = [...IntervalWithSettableEndpointsInclusion, ...DependencyNode, ...GeometryObject] as const;

/**
 * Represents the synthetic {@link Synthetic.IntervalWithSettableEndpointsValueObject | IntervalWithSettableEndpointsValueObject} interface at runtime.
 */
export const IntervalWithSettableEndpointsValueObject = [...IntervalWithSettableEndpointsValue, ...DependencyNode, ...GeometryObject] as const;

/**
 * Represents the synthetic {@link Synthetic.BareReadonlyVectorObject | BareReadonlyVectorObject} interface at runtime.
 */
export const SettablePointObject = [...SettablePoint, ...PointObject] as const;
