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

    /**
     * Creates a virtual null object.
     * @returns A virtual null object.
     */
    static createVirtual(): UnboundNullObject {
        return new UnboundNullObject({ virtual: true });
    }

    /**
     * Creates a non-virtual null object.
     * @returns A non-virtual null object.
     */
    static createNonVirtual(): UnboundNullObject {
        return new UnboundNullObject({ virtual: false });
    }
}