import type { Evaluatable, Interval } from "../../interfaces";

export class UnboundInterval implements Interval, Evaluatable<number, boolean> {
    public readonly start: number;
    public readonly end: number;
    public readonly startClosed: boolean;
    public readonly endClosed: boolean;
    constructor(parameters: {
        start: {
            value: number,
            closed: boolean,
        },
        end: {
            value: number,
            closed: boolean,
        }
    }) {
        this.start = parameters.start.value;
        this.end = parameters.end.value;
        this.startClosed = parameters.start.closed;
        this.endClosed = parameters.end.closed;
    }

    public get length(): number {
        return this.end - this.start;
    }

    isInside(value: number): boolean {
        if (this.startClosed && value < this.start) return false;
        if (!this.startClosed && value <= this.start) return false;
        if (this.endClosed && value > this.end) return false;
        if (!this.endClosed && value >= this.end) return false;
        return true;
    }
    evaluate(input: number): boolean {
        return this.isInside(input);
    }
}