import type { Plane } from "../../interfaces";
import { AbstractInterval } from "./abstractInterval";

class IntervalFromEndPoints extends AbstractInterval {
    private startValue: number;
    private endValue: number;
    private startIncludedValue: boolean;
    private endIncludedValue: boolean;

    constructor(parameters: { start: number, end: number, startIncluded: boolean, endIncluded: boolean, plane: Plane}) {
        super({ dependencies: [], ...parameters });
        this.startValue = parameters.start;
        this.endValue = parameters.end;
        this.startIncludedValue = parameters.startIncluded;
        this.endIncludedValue = parameters.endIncluded;
    }
    getStart() {
        return this.startValue;
    }
    getEnd() {
        return this.endValue;
    }
    getStartIncluded() {
        return this.startIncludedValue;
    }
    getEndIncluded() {
        return this.endIncludedValue;
    }

    public get start() { // Do not remove this, when overriding a setter, the getter must be overridden too
        return super.start;
    }
    public set start(value: number) {
        this.startValue = value;
        this.update();
    }

    public get end() { // Do not remove this, when overriding a setter, the getter must be overridden too
        return super.end;
    }
    public set end(value: number) {
        this.endValue = value;
        this.update();
    }

    public get startIncluded() { // Do not remove this, when overriding a setter, the getter must be overridden too
        return super.startIncluded;
    }
    public set startIncluded(value: boolean) {
        this.startIncludedValue = value;
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