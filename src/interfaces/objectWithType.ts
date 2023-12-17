/**
 * Represents a non-virtual object.
 */
export interface NonVirtualObject {
    /**
     * Describes the type of this object.  
     * This type is used when generic objects are used for calculations, and the type of the object is not known.  
     * Example of this can be an intersection calculation.
     */
    objectType: NonVirtualObjectType;

    /**
     * Whether this object is virtual.
     */
    virtual: false;
}

/**
 * Represents a virtual object.
 */
export interface VirtualObject {
    /**
     * Describes the type of this object.  
     * This type is used when generic objects are used for calculations, and the type of the object is not known.  
     * Example of this can be an intersection calculation.
     */
    objectType: VirtualObjectType;

    /**
     * Whether this object is virtual.
     */
    virtual: true;
}

/**
 * Represents a null object.  
 * A null object can be the result of a calculation that has no result.
 */
export interface NullObject {
    /**
     * Describes the type of this object.  
     * This type is used when generic objects are used for calculations, and the type of the object is not known.  
     * Example of this can be an intersection calculation.
     */
    objectType: "null";

    /**
     * Whether this object is virtual.  
     * This is dependant on from what calculation this object is the result of.
     */
    virtual: boolean;
} 

/**
 * Represents an object that is either virtual or non-virtual.
 */
export type ObjectWithType = NonVirtualObject | VirtualObject;

/**
 * Represents an object type.
 */
export type ObjectType = NonVirtualObjectType | VirtualObjectType;

/**
 * Non virtual object types. Non virtual objects are objects that are physically placable in the plane.
 */
export type NonVirtualObjectType = "point" | "line" | "plane" | "null";

/**
 * Virual object types. Virtual objects are objects that are not physically placable in the plane.
 */
export type VirtualObjectType = "vector" | "interval" | "null" | "value";