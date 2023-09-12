import { GeometryObject } from "../geometryObject";
import { Value as IValue } from "../../interfaces/value";
import { MemoryMapCacheWithAutomaticCalculation } from "../../helpers/cache/memoryMapCache";
import { DependencyNode } from "../../interfaces/dependencyNode";
import { Plane } from "../../interfaces/plane";
export abstract class AbstractValue extends GeometryObject<{ val: number }> implements IValue {
    protected abstract getValue(): number;

    constructor(parameters: { readonly dependencies: Iterable<DependencyNode>, readonly plane: Plane }) {
        super({
            cache: new MemoryMapCacheWithAutomaticCalculation<{ val: number }>({
                val: () => {
                    return this.getValue();
                },
            }),
            implementedInterfaces: [],
            ...parameters,
        });
    }

    public get value(): number {
        return this.cache.readValue("val");
    }
}
