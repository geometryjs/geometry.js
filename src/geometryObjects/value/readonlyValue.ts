import { AbstractValue } from "./abstractValue";

export class ReadonlyValue extends AbstractValue {
    private readonly internalValue: number;

    constructor(parameters: { value: number }) {
        super({ dependencies: [] });
        const { value } = parameters;
        this.internalValue = value;
    }

    protected getValue(): number {
        return this.internalValue;
    }
}
