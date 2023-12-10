import type { Some } from "../../helpers/types";
import { Runtime, type DependencyNodeObject, type IterableCache, type Plane, type Union } from "../../interfaces";

import { GeometryObject } from "../geometryObject";

/**
 * Abstract base class for unions.
 */
export abstract class AbstractUnion<Objects extends GeometryObject[], CacheRecords extends Record<string, Some | null> = Record<string, Some | null>> extends GeometryObject<CacheRecords> implements Union<GeometryObject, Objects> {
    protected abstract getObjects(): Objects;
    
    constructor(parameters: { dependencies: DependencyNodeObject[], plane: Plane, cache: IterableCache<CacheRecords, true>, implementedInterfaces: Iterable<Runtime.Interface> }) {
        super({
            ...parameters,
            implementedInterfaces: [...Runtime.Union, ...parameters.implementedInterfaces]
        });
    }

    public get objects(): Objects {
        return this.getObjects();
    }
}