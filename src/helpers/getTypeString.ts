import { getPropertyDescriptor } from "./getPropertyDescriptor";

/**
 * Returns a human readable string of the type of the value
 * @param value Any value
 */
export function getTypeString(value: unknown): string {
    if (typeof value !== "object") return typeof value; // If the value is not an object, return the type
    
    if (value === null) return "null"; // If the value is null, return null
    if (Array.isArray(value)) { // Special case for arrays
        if (value.length === 0) return "[]";
        const insideType = new Set([getTypeString(value[0])]);
        for (const item of value) {
            const type = getTypeString(item);
            if (!insideType.has(type)) insideType.add(type);
        }
        return `Array<${[...insideType].join(" | ")}>`;
    }

    const objectType = getPropertyDescriptor(value, "objectType")?.value; // If the value has an objectType property, return it
    if (typeof objectType === "string") return objectType;

    const constructorName = value.constructor.name;
    if (constructorName !== "Object") return constructorName; // If the value is not a plain object, return the constructor name
    
    const keys = Object.keys(value);

    if (keys.length === 0) return "{}";
   
    
    // @ts-expect-error
    const valueType = new Set([getTypeString(value[keys[0]])]); 

    for (const key of keys) {
        // @ts-expect-error
        const type = getTypeString(value[key]);
        if (!valueType.has(type)) valueType.add(type);
    }

    return `{[key: string]: ${[...valueType].join(" | ")}}`;
}

