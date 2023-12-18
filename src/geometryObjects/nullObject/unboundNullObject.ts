import type { NullObject } from "../../interfaces";

/**
 * A null object, that is not bound to a plane.
 */
export class UnboundNullObject<Virtual extends boolean = boolean> implements NullObject<Virtual> {
    constructor(parameters: { virtual: Virtual }) {
        this.virtual = parameters.virtual;
    }
    public readonly objectType = "null";
    public readonly virtual: Virtual;

    /**
     * Creates a virtual null object.
     * @returns A virtual null object.
     */
    static createVirtual(): UnboundNullObject<true> {
        return new UnboundNullObject({ virtual: true });
    }

    /**
     * Creates a non-virtual null object.
     * @returns A non-virtual null object.
     */
    static createNonVirtual(): UnboundNullObject<false> {
        return new UnboundNullObject({ virtual: false });
    }
}