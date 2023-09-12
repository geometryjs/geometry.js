import { Plane } from "../../interfaces/plane";
import { AbstractValue } from "./abstractValue";

export class ReadonlyValue extends AbstractValue {
    private readonly internalValue: number;

    constructor(parameters: { value: number, plane: Plane }) {
        super({ dependencies: [], ...parameters });
        const { value } = parameters;
        this.internalValue = value;
    }

    protected getValue(): number {
        return this.internalValue;
    }
}
