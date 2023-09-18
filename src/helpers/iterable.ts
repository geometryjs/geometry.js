/**
 * Checks if a value is in an iterable. Compares using `===`. Check is done in O(n).
 * @param iterable Iterable to check.
 * @param value Value to check for.
 * @returns Whether the value is in the iterable.
 */
export function inIterable<T>(iterable: Iterable<T>, value: T): boolean {
    for (const v of iterable) if (v === value) return true;
    return false;
}