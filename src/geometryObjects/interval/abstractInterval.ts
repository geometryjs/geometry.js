import type { DependencyNode, Evaluatable, Interval as IInterval, Plane } from "../../interfaces";

import { MemoryMapCacheWithAutomaticCalculation } from "../../helpers";
import * as Interfaces from "../../interfaces/runtimeInterfaces";
import { GeometryObject } from "../geometryObject";

/**
 * Represents common behaviour of intervals.
 */
export abstract class AbstractInterval extends GeometryObject<{ end: number; start: number; endClosed: boolean; startClosed: boolean }> implements IInterval, Evaluatable<number, boolean> {
    protected abstract getEnd(): number;
    protected abstract getStart(): number;
    protected abstract getEndClosed(): boolean;
    protected abstract getStartClosed(): boolean;

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
                    return this.getEndClosed();
                },
                startClosed: () => {
                    return this.getStartClosed();
                },
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
        return this.end - this.start;
    }

    get endClosed(): boolean {
        return this.cache.readValue("endClosed");
    }

    get startClosed(): boolean {
        return this.cache.readValue("startClosed");
    }

    isInside(value: number): boolean {
        if (this.startClosed && this.endClosed) {
            return value >= this.start && value <= this.end;
        } else if (this.startClosed) {
            return value >= this.start && value < this.end;
        } else if (this.endClosed) {
            return value > this.start && value <= this.end;
        } else {
            return value > this.start && value < this.end;
        }
    }

    evaluate(parameter: number): boolean {
        return this.isInside(parameter);
    }
}
