
/**
 * A union is a collection of objects that are combined into a single object.  
 * When returned by a function or method, it is to be handled as a single object.
 */
export interface Union<Object, Objects extends Object[]> { 
    /**
     * The objects that make up the union.
     */
    readonly objects: Objects;
}