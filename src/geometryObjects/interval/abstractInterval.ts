import type { DependencyNode, Evaluatable, Interval as IInterval, Plane } from "../../interfaces";

import { MemoryMapCacheWithAutomaticCalculation } from "../../helpers";
import * as Interfaces from "../../interfaces/runtimeInterfaces";
import { GeometryObject } from "../geometryObject";

/**
 * Represents common behaviour of bound intervals.
 * 
 * @group Interval
 */
export abstract class AbstractInterval extends GeometryObject<{ end: number; start: number; endClosed: boolean; startClosed: boolean, length: number, nonExistantState: boolean }> implements IInterval, Evaluatable<number, boolean> {
    protected abstract getEnd(): number;
    protected abstract getStart(): number;
    protected abstract getEndIncluded(): boolean;
    protected abstract getStartIncluded(): boolean;

    constructor(parameters: { dependencies: Iterable<DependencyNode>; plane: Plane }) {
        super({
            implementedInterfaces: [...Interfaces.Interval],
            cache: new MemoryMapCacheWithAutomaticCalculation({
                end: () => {
                    return this.getEnd();
                },
                start: () => {
                    return this.getStart();
                },
                endClosed: () => {
                    return this.getEndIncluded();
                },
                startClosed: () => {
                    return this.getStartIncluded();
                },
                length: () => {
                    return this.end - this.start;
                },
                nonExistantState: () => {
                    return this.end < this.start || Number.isNaN(this.end) || Number.isNaN(this.start);
                }
            }),
            ...parameters,
        });
    }

    get end(): number {
        return this.cache.readValue("end");
    }

    get start(): number {
        return this.cache.readValue("start");
    }

    get length(): number {
        return this.cache.readValue("length");
    }

    get endIncluded(): boolean {
        return this.cache.readValue("endClosed");
    }

    get startIncluded(): boolean {
        return this.cache.readValue("startClosed");
    }

    public exists(): boolean {
        return !this.cache.readValue("nonExistantState") && super.exists();
    }

    isInside(value: number): boolean {
        if (this.startIncluded && this.endIncluded) {
            return value >= this.start && value <= this.end;
        } else if (this.startIncluded) {
            return value >= this.start && value < this.end;
        } else if (this.endIncluded) {
            return value > this.start && value <= this.end;
        } else {
            return value > this.start && value < this.end;
        }
    }

    evaluate(parameter: number): boolean {
        return this.isInside(parameter);
    }
}
