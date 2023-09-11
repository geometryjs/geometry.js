import { MemoryMapCacheWithAutomaticCalculation } from "../../helpers/cache/memoryMapCache";
import { GeometryObject } from "../geometryObject";
import { Plane as IPlane } from "../../interfaces/plane";

export class Plane extends GeometryObject<{}> implements IPlane {
    constructor() {
        super({ dependencies: [], cache: new MemoryMapCacheWithAutomaticCalculation<{}>({}) });
    }

    public linkObject(object: GeometryObject): void {
        this.registerDependency(object);
    }
}
