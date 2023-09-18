/**
 * Value holds a number value.
 */
export interface Value {
    /**
     * Returns the value of this object.
     */
    readonly value: number;
} 

/**
 * SettableValue holds a number value that can also be modified.
 */
export interface SettableValue extends Value {
    /**
    * Sets the value of this object.
    */
    value: number;
}