export interface Value {
    /**
     * Returns the value of this object.
     */
    readonly value: number;
} 

export interface SettableValue extends Value {
    /**
    * Sets the value of this object.
    */
    value: number;
}