import type { IterableCache, GeometryObject as IGeometryObject, DependencyNode, Plane, ObjectType, ObjectWithType } from "../interfaces";
import type { Some } from "../helpers/types/general";

import { DependencyNodeWithCache } from "./dependencyNode";
import * as Interfaces from "../interfaces/runtimeInterfaces";

/**
 * Represents a generic geometry object.
 *
 * @template CacheRecords The records the object caches.
 * @group General
 */
export abstract class GeometryObject<CacheRecords extends Record<string, Some | null> = Record<string, Some | null>> extends DependencyNodeWithCache<CacheRecords, true> implements IGeometryObject, DependencyNode, ObjectWithType {
    private readonly implementedInterfaces: Set<Interfaces.Interface> = new Set([...Interfaces.GeometryObject, ...Interfaces.DependencyNode]);
    public readonly plane: Plane;

    constructor(parameters: { readonly dependencies: Iterable<DependencyNode>; readonly cache: IterableCache<CacheRecords, true>; readonly implementedInterfaces: Iterable<Interfaces.Interface>; readonly plane: Plane }) {
        super(parameters);
        const { implementedInterfaces, plane } = parameters;

        this.plane = plane;
        plane.linkObject(this);

        for (const implementedInterface of implementedInterfaces) {
            this.implementedInterfaces.add(implementedInterface);
        }
    }

    public getImplementedInterfaces(): Iterable<Interfaces.Interface> {
        return this.implementedInterfaces;
    }

    protected addImplementedInterfaces(interfaces: Iterable<Interfaces.Interface>): void {
        for (const implementedInterface of interfaces) {
            this.implementedInterfaces.add(implementedInterface);
        }
    }

    public get info(): IGeometryObject["info"] {
        return {
            implementedInterfaces: this.getImplementedInterfaces(),
            canCauseUpdate: false,
        };
    }

    public abstract readonly objectType: ObjectType;
    public abstract readonly virtual: boolean;
}
