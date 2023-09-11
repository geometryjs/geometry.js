import { MemoryMapCacheWithAutomaticCalculation } from "../../helpers/cache/memoryMapCache";
import { GeometryObject } from "../geometryObject";
import { Point } from "../../interfaces/point";
import * as Interfaces from "../../interfaces";
import { PYTHAGOREAN_THEOREM } from "../../procedures";

export abstract class AbstractPoint extends GeometryObject<{ x: number; y: number; dist: number }> implements Point {
    protected abstract getX(): number;
    protected abstract getY(): number;

    constructor(parameters: { dependencies: Iterable<GeometryObject> }) {
        super({
            cache: new MemoryMapCacheWithAutomaticCalculation<{ x: number; y: number, dist: number }>({
                x: () => {
                    return this.getX();
                },
                y: () => {
                    return this.getY();
                },
                dist: () => {
                    return PYTHAGOREAN_THEOREM.perform({ values: [this.x, this.y] }).distance;
                },
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
}