import type { Some } from "../../helpers/types";
import { Runtime, type DependencyNodeObject, type IterableCache, type Plane, type Union, NonVirtualGeometryObject, NonVirtualObject } from "../../interfaces";
import { isUnion } from "../../validators";

import { GeometryObject } from "../geometryObject";

/**
 * Abstract base class for unions.
 */
export abstract class AbstractUnion<Objects extends NonVirtualGeometryObject[], CacheRecords extends Record<string, Some | null> = Record<string, Some | null>> extends GeometryObject<CacheRecords> implements Union<Objects> {
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

    public readonly objectType = "union";
    public readonly virtual = false;

    public equals(other: NonVirtualObject): boolean {
        if (!isUnion(other)) return false;

        return this.objects.every(object => {
            return other.objects.some(otherObject => {
                return object.equals(otherObject);
            })
        });
        
    }
}