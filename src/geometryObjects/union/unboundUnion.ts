import type { Union } from "../../interfaces";

/**
 * A union of objects, that are not bound to a plane.
 */
export class UnboundUnion<Objects extends any[]> implements Union<any, Objects> {

    constructor(public readonly objects: Objects) { }
}