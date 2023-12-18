import type { NonVirtualObject, ObjectWithType, Union } from "../../interfaces";
import { isUnion } from "../../validators";

/**
 * A union of objects, that are not bound to a plane.
 */
export class UnboundUnion<Objects extends NonVirtualObject[]> implements Union<Objects> {

    constructor(public readonly objects: Objects) { }

    public readonly objectType = "union";
    public readonly virtual = false;

    public equals(other: NonVirtualObject): boolean {
        if (!isUnion(other)) return false;

        return this.objects.every(object => {
            return other.objects.some(otherObject => {
                return object.equals(otherObject);
            })
        });
        
    }
}