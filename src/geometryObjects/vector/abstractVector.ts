import type { DependencyNode, Plane, GeometryObject as IGeometryObject, BareReadonlyVector, Vector as IVector } from "../../interfaces";

import { MemoryMapCacheWithAutomaticCalculation } from "../../helpers";
import { GeometryObject } from "../geometryObject";
import * as Interfaces from "../../interfaces/runtimeInterfaces";
import { UnboundVector } from "./unbound";
import * as Procedures from "../../procedures";

/**
 * Defines all the common functionality of a vector.
 *
 * @group Vector
 */
export abstract class AbstractVector extends GeometryObject<{ x: number; y: number, nonExistantState: boolean }> implements IVector, IGeometryObject {
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
                nonExistantState: () => {
                    return Number.isNaN(this.x) || Number.isNaN(this.y) || !Number.isFinite(this.x) || !Number.isFinite(this.y) || this.x === 0 && this.y === 0;
                }
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

    public toBare(): BareReadonlyVector {
        return [this.x, this.y];
    }

    public exists(): boolean {
        return !this.cache.readValue("nonExistantState") && super.exists();
    }

    add(vector: IVector): IVector {
        return UnboundVector.fromBare(Procedures.Foundational.VECTOR_ADDITION.perform({
            vectors: [this.toBare(), vector.toBare()],
        }).sumVector);
    }

    subtract(vector: IVector): IVector {
        return UnboundVector.fromBare(Procedures.Foundational.VECTOR_SUBTRACTION.perform({
            positive: [this.toBare()],
            negative: [vector.toBare()],
        }).differenceVector);
    }

    multiplyByScalar(scalar: number): IVector {
        return UnboundVector.fromBare(Procedures.Foundational.VECTOR_BY_SCALAR_MULTIPLICATION.perform({
            vector: this.toBare(),
            scalar,
        }).resultVector);
    }

    normalize(length = 1): IVector {
        return UnboundVector.fromBare(Procedures.Foundational.VECTOR_NORMALIZATION.perform({
            vector: this.toBare(),
            length,
        }).resultVector);
    }

    dotProduct(vector: IVector): number {
        return Procedures.Foundational.VECTOR_DOT_PRODUCT.perform({
            vector1: this.toBare(),
            vector2: vector.toBare(),
        }).product;
    }

    public readonly objectType = "vector";
    public readonly virtual = true;
}



