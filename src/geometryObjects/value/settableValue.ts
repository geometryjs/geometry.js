import { AbstractValue } from "./abstractValue";
import * as Interfaces from "../../interfaces/runtimeInterfaces";
import { SettableValue as ISettableValue } from "../../interfaces/value";
import { Plane } from "../../interfaces/plane";

export class SettableValue extends AbstractValue implements ISettableValue {
    private internalValue: number;

    constructor(parameters: { value: number, plane: Plane}) {
        super({ dependencies: [], ...parameters });
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

    public get info(): AbstractValue["info"] {
        return {
            ...super.info,
            canCauseUpdate: true,
        }
    }
}
