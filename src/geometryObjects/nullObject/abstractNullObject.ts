import { MemoryMapCache, MemoryMapCacheWithAutomaticCalculation } from "../../helpers";
import { DependencyNodeObject, NullObject, Plane, Runtime } from "../../interfaces";
import { GeometryObject } from "../geometryObject";

export abstract class AbstractNullObject extends GeometryObject<{}> implements NullObject {
    public readonly objectType = "null";
    constructor(parameters: { plane: Plane, dependencies: DependencyNodeObject[] }) {
        super({
            implementedInterfaces: [...Runtime.NullObject],
            cache: new MemoryMapCacheWithAutomaticCalculation<{}>({}),
            ...parameters,
        })
    }
    protected abstract isVirtual(): boolean;
    protected abstract doesExist(): boolean;
    public get virtual(): boolean {
        return this.isVirtual();
    }

    public exists(): boolean {
        return this.doesExist() && super.exists();
    }
}