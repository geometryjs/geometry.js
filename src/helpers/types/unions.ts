/**
 * A complex type is either an array or an object. Values that are pass by reference.
 */
export type Complex = Array<any> | Record<string | number | symbol, any>;