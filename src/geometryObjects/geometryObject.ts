import { DependencyNodeWithCache } from "./dependencyNode";
import { GeometryObject as IGeometryObject } from "../interfaces/geometryObject";
import { DependencyNode } from "../interfaces/dependencyNode";
import { Some } from "../helpers/types/general";
import { IterableCache } from "../interfaces/cache";
import * as Interfaces from "../interfaces";
import { Plane } from "../interfaces/plane";

export class GeometryObject<CacheRecords extends Record<string, Some | null> = Record<string, Some | null>> extends DependencyNodeWithCache<CacheRecords, true> implements IGeometryObject, DependencyNode {
    private readonly implementedInterfaces: Set<Interfaces.Interface> = new Set();
    public readonly plane: Plane;

    constructor(parameters: { readonly dependencies: Iterable<DependencyNode>; readonly cache: IterableCache<CacheRecords, true>, readonly implementedInterfaces: Iterable<Interfaces.Interface>, readonly plane: Plane }) {
        super(parameters);
        const { implementedInterfaces, plane } = parameters;
        
        this.plane = plane;

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
            implementedInterfaces: this.getImplementedInterfaces()
        }
    }
}
