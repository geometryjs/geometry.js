import type { Point, Plane, DependencyNode, Vector, NonVirtualObject } from "../../interfaces";

import { MemoryMapCacheWithAutomaticCalculation } from "../../helpers/cache/memoryMapCache";
import { GeometryObject } from "../geometryObject";
import * as Interfaces from "../../interfaces/runtimeInterfaces";
import { PYTHAGOREAN_THEOREM } from "../../procedures/foundational";
import { UnboundVector } from "../vector";
import { isPoint } from "../../validators";
import { isEqual } from "../../helpers/equality/float";
/**
 * Defines all the common functionality of a point.
 * 
 * @group Point
 */
export abstract class AbstractPoint extends GeometryObject<{ x: number; y: number; dist: number, nonExistantState: boolean }> implements Point {
    protected abstract getX(): number;
    protected abstract getY(): number;

    constructor(parameters: { dependencies: Iterable<DependencyNode>, plane: Plane }) {
        super({
            cache: new MemoryMapCacheWithAutomaticCalculation({
                x: () => {
                    return this.getX();
                },
                y: () => {
                    return this.getY();
                },
                dist: () => {
                    return PYTHAGOREAN_THEOREM.perform({ values: [this.x, this.y] }).distance;
                },
                nonExistantState: () => {
                    return Number.isNaN(this.x) || Number.isNaN(this.y);
                }
            }),
            implementedInterfaces: Interfaces.Point,
            ...parameters,
        });
    }
    public get x(): number {
        return this.cache.readValue("x");
    }

    public get y(): number {
        return this.cache.readValue("y");
    }

    public get distanceFromOrigin(): number {
        return this.cache.readValue("dist");
    }

    public exists(): boolean {
        return !this.cache.readValue("nonExistantState") && super.exists();
    }
    toVector(): Vector {
        return UnboundVector.fromBare([this.x, this.y]);
    }

    equals(other: NonVirtualObject): boolean {
        if (!isPoint(other)) return false;
        return isEqual(this.x, other.x) && isEqual(this.y, other.y);
    }

    public readonly objectType = "point";
    public readonly virtual = false;
}
