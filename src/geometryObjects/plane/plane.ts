import { MemoryMapCacheWithAutomaticCalculation } from "../../helpers/cache/memoryMapCache";
import { GeometryObject } from "../geometryObject";
import { Plane as IPlane } from "../../interfaces/plane";
import * as Interfaces from "../../interfaces";

export class Plane extends GeometryObject<{}> implements IPlane {
    private readonly objects: Set<GeometryObject> = new Set();

    constructor() {
        super({ dependencies: [], cache: new MemoryMapCacheWithAutomaticCalculation<{}>({}), implementedInterfaces: Interfaces.Plane });
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
