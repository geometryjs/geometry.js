/**
 * A simple tuple of two numbers representing a readonly vector.
 * This can be used when you don't need the extra functionality of the Vector class and you may create a lot of vectors as creating the class is more expensive than creating the tuple.
 */
export type BareReadonlyVector = readonly [number, number];

/**
 * A simple tuple of two numbers representing a vector.
 * This can be used when you don't need the extra functionality of the Vector class and you may create a lot of vectors as creating the class is more expensive than creating the tuple.
 */
export type BareVector = [number, number];

/**
 * Represents a vector with functions to manipulate it.
 */
export interface Vector {
    /**
     * The x component of the vector.
     */
    readonly x: number;

    /**
     * The y component of the vector.
     */
    readonly y: number;

    /**
     * Provides iteration over the vector.
     */
    [Symbol.iterator](): IterableIterator<number>;

    /**
     * Returns the vector as a {@link BareVector | BareVector}.
     */
    toBare(): BareReadonlyVector;

    /**
     * Adds to vectors to create a new vector.
     * @param vector Another vector.
     */
    add(vector: Vector): Vector;

    /**
     * Subtracts another vector from this vector to create a new vector.
     * @param vector Another vector.
     */
    subtract(vector: Vector): Vector;

    /**
     * Multiplies the vector by a scalar to create a new vector.
     * @param scalar A scalar.
     */
    multiplyByScalar(scalar: number): Vector;

}

/**
 *
 */
export interface SettableVector extends Vector {
    /**
     * The x component of the vector.
     */
    x: number;

    /**
     * The y component of the vector.
     */
    y: number;
}
