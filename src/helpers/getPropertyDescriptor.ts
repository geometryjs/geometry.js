/**
 * Gets the property descriptor of a property of an object. Loops through the prototype chain.
 * @param obj Any object
 * @param prop Property name
 * @returns The property descriptor of the property, or undefined if the property does not exist.
 */
export function getPropertyDescriptor(obj: any, prop: string): PropertyDescriptor | undefined {
    let desc;
    do {
        desc = Object.getOwnPropertyDescriptor(obj, prop);
    } while (!desc && (obj = Object.getPrototypeOf(obj)));
    return desc;
}
