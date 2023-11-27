import type { Plane, DependencyNode, Value as IValue } from "../../interfaces";

import { GeometryObject } from "../geometryObject";
import { MemoryMapCacheWithAutomaticCalculation } from "../../helpers/cache/memoryMapCache";
import * as Interfaces from "../../interfaces/runtimeInterfaces";
/**
 * Defines all the common functionality of a value.
 *
 * @group Value
 */
export abstract class AbstractValue extends GeometryObject<{ value: number }> implements IValue {
    protected abstract getValue(): number;

    constructor(parameters: { readonly dependencies: Iterable<DependencyNode>; readonly plane: Plane }) {
        super({
            cache: new MemoryMapCacheWithAutomaticCalculation({
                value: () => {
                    return this.getValue();
                },
            }),
            implementedInterfaces: [...Interfaces.Value],
            ...parameters,
        });
    }

    public get value(): number {
        return this.cache.readValue("val");
    }
}
