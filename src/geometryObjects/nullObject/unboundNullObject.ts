import type { NullObject } from "../../interfaces";

/**
 * A null object, that is not bound to a plane.
 */
export class UnboundNullObject implements NullObject {
    constructor(parameters: { virtual: boolean}) {
        this.virtual = parameters.virtual;
    }
    public readonly objectType = "null";
    public readonly virtual: boolean;
}