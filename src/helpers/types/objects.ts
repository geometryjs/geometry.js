import { Spread } from "./spread";
import { Complex } from "./unions";

/**
 * Removes all the `undefined` values from the object.
 */
export type FilterUndefined<O> = O extends Complex ? {
    [Key in keyof O as O[Key] extends undefined ? never : Key]: O[Key];
} : O;

/**
 * Sets all the values, that can accept `undefined` to optional.
 */
export type SetMaybeDefinedToOptionals<O> = O extends Complex ? Spread<[{
    [Key in keyof O as undefined extends O[Key] ? Key : never]?: Exclude<O[Key], undefined>
}, {
        [Key in keyof O as undefined extends O[Key] ? never : Key]: O[Key]
    }]> : O;

/**
 * Removes all the `undefined` values from the object and sets all the values, that can accept `undefined` to optional.
 */
export type FilterUndefinedAndSetMaybeDefinedToOptional<O> = FilterUndefined<SetMaybeDefinedToOptionals<O>>