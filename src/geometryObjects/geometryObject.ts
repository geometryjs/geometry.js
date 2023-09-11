import { DependencyNodeWithCache } from "./dependencyNode";
import { GeometryObject as IGeometryObject } from "../interfaces/geometryObject";
import { DependencyNode } from "../interfaces/dependencyNode";
import { Some } from "../helpers/types/general";
import { IterableCache } from "../interfaces/cache";
import * as Interfaces from "../interfaces";

export class GeometryObject<CacheRecords extends Record<string, Some | null> = Record<string, Some | null>> extends DependencyNodeWithCache<CacheRecords, true> implements IGeometryObject, DependencyNode {
    protected readonly implementedInterfaces: Set<Interfaces.Interface> = new Set();
    constructor(parameters: { readonly dependencies: Iterable<DependencyNode>; readonly cache: IterableCache<CacheRecords, true>, readonly implementedInterfaces: Iterable<Interfaces.Interface> }) {
        super(parameters);
        const { implementedInterfaces } = parameters;
        for (const implementedInterface of implementedInterfaces) {
            this.implementedInterfaces.add(implementedInterface);
        }
    }

    public getImplementedInterfaces(): Iterable<Interfaces.Interface> {
        return this.implementedInterfaces;
    }

    public get info(): IGeometryObject["info"] {
        return {
            implementedInterfaces: this.getImplementedInterfaces()
        }
    }
}
