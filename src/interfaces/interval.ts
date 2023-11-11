/**
 * Represents an interval the real numbers.
 */
export interface Interval {
    /**
     * The start of the interval.
     */
    readonly start: number;

    /**
     * The end of the interval.
     */
    readonly end: number;

    /**
     * The length of the interval.
     */
    readonly length: number;

    /**
     * Whether the end of the interval is closed.
     */
    readonly endIncluded: boolean;

    /**
     * Whether the start of the interval is closed.
     */
    readonly startIncluded: boolean;

    /**
     * Checks whether the given value is inside the interval.
     * @param value The value to check.
     */
    isInside(value: number): boolean;
}
