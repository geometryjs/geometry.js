import { DependencyNodeWithCache } from "./dependencyNode";
import { GeometryObject as IGeometryObject } from "../interfaces/geometryObject";
import { DependencyNode } from "../interfaces/dependencyNode";
import { Some } from "../helpers/types/general";
import { IterableCache } from "../interfaces/cache";

export class GeometryObject<CacheRecords extends Record<string, Some | null> = Record<string, Some | null>> extends DependencyNodeWithCache<CacheRecords, true> implements IGeometryObject, DependencyNode {
    constructor(dependencies: Iterable<DependencyNode>, cache: IterableCache<CacheRecords, true>) {
        super(dependencies, cache);
    }
}