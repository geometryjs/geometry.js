import { VirtualObject } from "./objectWithType";

/**
 * Value holds a number value.
 */
export interface Value extends VirtualObject {
    /**
     * Returns the value of this object.
     */
    readonly value: number;

    /**
     * This object is of type value.
     */
    readonly objectType: "value";
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