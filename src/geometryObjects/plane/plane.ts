import { MemoryMapCacheWithAutomaticCalculation } from "../../helpers/cache/memoryMapCache";
import { GeometryObject } from "../geometryObject";
import { Plane as IPlane } from "../../interfaces/plane";
import { DependencyNodeWithCache } from "../dependencyNode";

export class Plane extends DependencyNodeWithCache<{}, true> implements IPlane {
    private readonly objects: Set<GeometryObject> = new Set();

    constructor() {
        super({ dependencies: [], cache: new MemoryMapCacheWithAutomaticCalculation<{}>({}), });
    }

    public linkObject(object: GeometryObject): void {
        this.registerDependency(object);
        this.objects.add(object);
    }

    public ulinkObject(object: GeometryObject): void {
        this.objects.delete(object);
    }

    [Symbol.iterator](): Iterator<GeometryObject> {
        return this.objects.values();
    }
}
