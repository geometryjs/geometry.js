import { MemoryMapCache, MemoryMapCacheWithAutomaticCalculation } from "../../helpers";
import { DependencyNodeObject, NullObject, Plane, Runtime } from "../../interfaces";
import { GeometryObject } from "../geometryObject";

export abstract class AbstractNullObject<Virtual extends boolean = boolean> extends GeometryObject<{}> implements NullObject<Virtual> {
    public readonly objectType = "null";
    constructor(parameters: { plane: Plane, dependencies: DependencyNodeObject[] }) {
        super({
            implementedInterfaces: [...Runtime.NullObject],
            cache: new MemoryMapCacheWithAutomaticCalculation<{}>({}),
            ...parameters,
        })
    }
    protected abstract isVirtual(): Virtual;
    protected abstract doesExist(): boolean;
    public get virtual(): Virtual {
        return this.isVirtual();
    }

    public exists(): boolean {
        return this.doesExist() && super.exists();
    }
}