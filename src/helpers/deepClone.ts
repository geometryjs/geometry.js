/**
 * Deep clones the source object.
 * @param source Source object.
 * @returns Deep clone of the source object.
 */
export function deepClone<O>(source: O): O {
    if (Array.isArray(source)) {
        const result = [];
        for (const item of source) {
            result.push(deepClone(item));
        }
        return result as any;
    }
    if (typeof source === "object") {
        const result: any = {};
        for (const key in source) {
            result[key] = deepClone((source as any)[key]);
        }
        return result;
    }
    return source;
}
