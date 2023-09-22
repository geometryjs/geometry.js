import type { DependencyNode, Plane, GeometryObject as IGeometryObject, BareReadonlyVector, Vector as IVector } from "../../interfaces";

import { MemoryMapCacheWithAutomaticCalculation } from "../../helpers";
import { GeometryObject } from "../geometryObject";
import * as Interfaces from "../../interfaces/runtimeInterfaces";

/**
 * Defines all the common functionality of a vector.
 *
 * @group Vector
 */
export abstract class Vector extends GeometryObject<{ x: number; y: number }> implements IVector, IGeometryObject {
    protected abstract getX(): number;
    protected abstract getY(): number;
    public readonly lenght: 2 = 2;
    
    constructor(parameters: { dependencies: Iterable<DependencyNode>; plane: Plane }) {
        super({
            cache: new MemoryMapCacheWithAutomaticCalculation({
                x: () => {
                    return this.getX();
                },
                y: () => {
                    return this.getY();
                },
            }),
            implementedInterfaces: [...Interfaces.Vector, ...Interfaces.BareVector],
            ...parameters,
        });
    }

    get x(): number {
        return this.cache.readValue("x");
    }

    get y(): number {
        return this.cache.readValue("y");
    }

    get [0](): number {
        return this.x;
    }

    get [1](): number {
        return this.y;
    }

    *[Symbol.iterator](): IterableIterator<number> {
        yield this.x;
        yield this.y;
    }
}



