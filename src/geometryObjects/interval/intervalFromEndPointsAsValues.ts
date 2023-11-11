import type { Plane, Value, ValueObject } from "../../interfaces";
import { AbstractInterval } from "./abstractInterval";

/**
 * An interval defined by its end points as values
 */
export class IntervalFromEndPointsAsValues extends AbstractInterval {
    private readonly startValue: Value;
    private readonly endValue: Value;
    private startIncludedValue: boolean;
    private endIncludedValue: boolean;

    constructor(parameters: { start: ValueObject, end: ValueObject, startIncluded: boolean, endIncluded: boolean, plane: Plane }) {
        super({ dependencies: [parameters.start, parameters.end], ...parameters });
        this.startValue = parameters.start;
        this.endValue = parameters.end;
        this.startIncludedValue = parameters.startIncluded;
        this.endIncludedValue = parameters.endIncluded;
    }
    getStart() {
        return this.startValue.value;
    }
    getEnd() {
        return this.endValue.value;
    }
    getStartIncluded() {
        return this.startIncludedValue;
    }
    getEndIncluded() {
        return this.endIncludedValue;
    }

    public get startIncluded() { // Do not remove this, when overriding a setter, the getter must be overridden too
        return super.startIncluded;
    }
    public set startIncluded(value: boolean) {
        this.endIncludedValue = value;
        this.update();
    }

    public get endIncluded() { // Do not remove this, when overriding a setter, the getter must be overridden too
        return super.endIncluded;
    }
    public set endIncluded(value: boolean) {
        this.endIncludedValue = value;
        this.update();
    }

}

/**
 * An open interval defined by its end points as values
 */
export class OpenIntervalFromEndPointsAsValues extends IntervalFromEndPointsAsValues {
    constructor(parameters: { start: ValueObject, end: ValueObject, plane: Plane }) {
        super({ ...parameters, start: parameters.start, end: parameters.end, startIncluded: false, endIncluded: false });
    }
}

/**
 * A closed interval defined by its end points as values
 */
export class ClosedIntervalFromEndPointsAsValues extends IntervalFromEndPointsAsValues {
    constructor(parameters: { start: ValueObject, end: ValueObject, plane: Plane }) {
        super({ ...parameters, start: parameters.start, end: parameters.end, startIncluded: true, endIncluded: true });
    }
}