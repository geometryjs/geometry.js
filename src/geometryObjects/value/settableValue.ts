import { AbstractValue } from "./abstractValue";
import * as Interfaces from "../../interfaces";
import { SettableValue as ISettableValue } from "../../interfaces/value";

export class SettableValue extends AbstractValue implements ISettableValue {
    private internalValue: number;

    constructor(parameters: { value: number }) {
        super({ dependencies: [] });
        const { value } = parameters;
        this.internalValue = value;
        this.addImplementedInterfaces(Interfaces.SettableValue);
    }

    protected getValue(): number {
        return this.internalValue;
    }

    public get value(): number {
        return super.value;
    }
    
    public set value(value: number) {
        this.internalValue = value;
        this.update();
    }
}
