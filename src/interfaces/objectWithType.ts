/**
 * Represents a non-virtual object.
 */
export interface NonVirtualObject extends ObjectWithType {
    /**
     * Describes the type of this object.  
     * This type is used when generic objects are used for calculations, and the type of the object is not known.  
     * Example of this can be an intersection calculation.
     */
    readonly objectType: NonVirtualObjectType;

    /**
     * Whether this object is virtual.
     */
    readonly virtual: false;

    /**
     * Whether this object is equal to another object.  
     * If the objects are of a different type, this method should return false.  
     * If the objects are of the same type, this method should return true if the objects are equal, and false if they are not.
     * @param other The object to compare to.
     */
    equals(other: NonVirtualObject): boolean;
}

/**
 * Represents a virtual object.
 */
export interface VirtualObject extends ObjectWithType{
    /**
     * Describes the type of this object.  
     * This type is used when generic objects are used for calculations, and the type of the object is not known.  
     * Example of this can be an intersection calculation.
     */
    readonly objectType: VirtualObjectType;

    /**
     * Whether this object is virtual.
     */
    readonly virtual: true;
}

/**
 * Represents a null object.  
 * A null object can be the result of a calculation that has no result.
 */
export interface NullObject<Virtual extends boolean = boolean> {
    /**
     * Describes the type of this object.  
     * This type is used when generic objects are used for calculations, and the type of the object is not known.  
     * Example of this can be an intersection calculation.
     */
    readonly objectType: "null";

    /**
     * Whether this object is virtual.  
     * This is dependant on from what calculation this object is the result of.
     */
    readonly virtual: Virtual;
} 

/**
 * Represents an object that is either virtual or non-virtual.
 */
export interface ObjectWithType<Type extends ObjectType = ObjectType, Virtual extends boolean = boolean> {
    /**
     * Describes the type of this object.  
     * This type is used when generic objects are used for calculations, and the type of the object is not known.  
     * Example of this can be an intersection calculation.
     */
    readonly objectType: Type;

    /**
     * Whether this object is virtual.  
     * This is dependant on from what calculation this object is the result of.
     */
    readonly virtual: Virtual;
}

/**
 * Represents an object type.
 */
export type ObjectType = NonVirtualObjectType | VirtualObjectType;

/**
 * Non virtual object types. Non virtual objects are objects that are physically placable in the plane.
 */
export type NonVirtualObjectType = "point" | "line" | "plane" | "null" | "union" | "enum";

/**
 * Virual object types. Virtual objects are objects that are not physically placable in the plane.
 */
export type VirtualObjectType = "vector" | "interval" | "null" | "value";