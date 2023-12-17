

/**
 * Used to compare two float numbers according to the specified global precision unless specified otherwise.
 * @param a First number
 * @param b Second number
 * @param options Override the global precision and unit.
 */
export function isEqual(a: number, b: number, options: EqualityOptions = equalityOptions): boolean {
    return Number.isInteger(a) && Number.isInteger(b) ? a === b : isEqualFloat(a, b, options);
}

/**
 * Compares two float numbers according to the specified options.
 * @param a A float number
 * @param b A float number
 * @param options Float equality options
 */
function isEqualFloat(a: number, b: number, options: EqualityOptions): boolean {
    if (a === b) return true; // If the numbers are equal, return true
    if (!Number.isFinite(a) || !Number.isFinite(b)) return false; // If either number is not finite, return false
    if (Math.abs(a) < options.unit / 2 || Math.abs(b) < options.unit / 2) { // If either number is "small" (less than half the unit), we add the unit to both numbers before comparing
        a += options.unit; // Add the unit to the first number
        b += options.unit; // Add the unit to the second number
    }

    // Compare the numbers
    return Math.round(a * Math.pow(2, options.precision)) === Math.round(b * Math.pow(2, options.precision));

}

/**
 * 
 * @param a Return whether the number is zero according to the specified global precision unless specified otherwise.
 * @param options Override the global precision and unit.
 */
export function isZero(a: number, options: EqualityOptions = equalityOptions): boolean {
    return Number.isInteger(a) ? a === 0 : isZeroFloat(a, options);
}

/**
 * Compares a float number to zero according to the specified options.
 * @param a A float number
 * @param options Float equality options
 * @returns Whether the number is zero according to the specified options.
 */
function isZeroFloat(a: number, options: EqualityOptions): boolean {
    return isEqual(a + options.unit, options.unit, options);
}

export type EqualityOptions = {
    /**
     * The precision to use when comparing the two numbers.  
     * The precision is the number of binary places to compare.
     */
    precision: number;

    /**
     * Used when comparing to zero is needed.  
     * A number is considered zero if unit + number is equal to unit according to precision specified.
     */
    unit: number;
}

/**
 * Collection of equality options.  
 * @enum
 */
export const EQUALITY_OPTIONS = {
    /**
     * Default equality options.  
     * Handles precision of the *f64* datatype with 10 binary places of leaway.  
     * Precision is 43 and unit is 1.
     */
    "DOUBLE": {
        precision: 43,
        unit: 1,
    },
    /**
     * Lower precision equality options.  
     * Handles precision of the *f32* datatype with 4 binary places of leaway.
     */
    "SINGLE": {
        precision: 20,
        unit: 1,
    },
    /**
     * Lowest precision equality options.  
     * Handles precision of the *f16* datatype with 3 binary places of leaway.
     */
    "HALF": {
        precision: 8,
        unit: 1,
    },
    /**
     * The full equality of the *f64* datatype.  
     * Has no leaway.  
     * WARNING: This does not account for any floating point errors.
     */
    "FULL_DOUBLE": {
        precision: 53,
        unit: 1,
    },
    /**
     * The full equality of the *f32* datatype.  
     */
    "FULL_SINGLE": {
        precision: 24,
        unit: 1,
    },
    /**
     * The full equality of the *f16* datatype.  
     */
    "FULL_HALF": {
        precision: 11,
        unit: 1,
    },
    /**
     * Standard equality options for the *f64* datatype, with a small unit.  
     * The unit is 2e-24, thus anything smaller than about 2e-72 will be considered zero.  
     */
    "DOUBLE_LOW": {
        precision: 48,
        unit: 2e-24,
    },
    /**
     * Standard equality options for the *f64* datatype, with a high unit.  
     * The unit is 2e-12, thus anything smaller than about 2e-24 will be considered zero.
     */
    "DOUBLE_HIGH": {
        precision: 48,
        unit: 2e24,
    },
} satisfies Record<string, EqualityOptions>;

/**
 * Current global equality options.
 */
let equalityOptions: EqualityOptions = EQUALITY_OPTIONS.DOUBLE;

/**
 * Sets the current global equality options.
 * @param options The new global equality options.
 */
export function setEqualityOptions(options: EqualityOptions): void {
    // TODO: Validate options
    equalityOptions = options;
}

/**
 * Gets the current global equality options.
 * @returns Current global equality options.
 */
export function getEqualityOptions(): EqualityOptions {
    return equalityOptions;
}