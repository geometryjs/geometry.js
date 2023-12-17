import { NonVirtualObject, ObjectWithType } from "./objectWithType";

/**
 * A union is a collection of objects that are combined into a single object.  
 * When returned by a function or method, it is to be handled as a single object.
 */
export interface Union<Objects extends ObjectWithType[]> extends NonVirtualObject { 
    /**
     * The objects that make up the union.
     */
    readonly objects: Objects;

    /**
     * The type of the union.
     */
    readonly objectType: "union";
}