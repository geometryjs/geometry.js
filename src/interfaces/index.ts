export const Cache = ["Cache"] as const;
export const IterableCache = ["IterableCache", ...Cache] as const;
export const Evaluatable = ["Evaluatable"] as const;
export const DependencyNode = ["DependencyNode"] as const;
export const GeometryObject = ["GeometryObject"] as const;
export const Plane = ["Plane", ...GeometryObject, ...DependencyNode, ...IterableCache] as const;
export const Procedure = ["Procedure"] as const;
export const Transformer = ["Transformer"] as const;

export type Interface = Readonly<
    | (typeof Cache)[number]
    | (typeof IterableCache)[number]
    | (typeof Evaluatable)[number]
    | (typeof DependencyNode)[number]
    | (typeof GeometryObject)[number]
    | (typeof Plane)[number]
    | (typeof Procedure)[number]
    | (typeof Transformer)[number]
>;
