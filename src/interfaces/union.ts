
/**
 * A union is a collection of objects that are combined into a single object.
 */
export interface Union<Object, Objects extends Object[]> { 
    /**
     * The objects that make up the union.
     */
    readonly objects: Objects;
}