import type { ObjectWithType, Union } from "../../interfaces";

/**
 * A union of objects, that are not bound to a plane.
 */
export class UnboundUnion<Objects extends ObjectWithType[]> implements Union<Objects> {

    constructor(public readonly objects: Objects) { }

    public readonly objectType = "union";
    public readonly virtual = false;
}