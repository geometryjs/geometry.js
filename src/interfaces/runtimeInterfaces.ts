import { Cache as ICache, IterableCache as IIterableCache } from "./cache";
import { Evaluatable as IEvaluatable } from "./evaluatable";
import { DependencyNode as IDependencyNode } from "./dependencyNode";
import { GeometryObject as IGeometryObject } from "./geometryObject";
import { Plane as IPlane } from "./plane";
import { Procedure as IProcedure } from "./procedure";
import { Transformer as ITransformer } from "./transformer";
import { Value as IValue, SettableValue as ISettableValue } from "./value";
import { Point as IPoint } from "./point";

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
>;
