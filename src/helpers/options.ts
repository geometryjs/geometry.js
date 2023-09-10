import { Evaluatable } from "../interfaces/evaluatable";
import { Transformer } from "../interfaces/transformer";
import { deepClone } from "./deepClone";

/**
 * Options object. Can be an array or a record. Can be nested.
 * The `Options<O>` generic allows for empty objects and arrays to be excluded from the options object.
 */
export type Options<O> = O extends Array<any>
    ? { [Key in keyof O]: Options<O[Key]> } extends O
        ? { [Key in keyof O]: Options<O[Key]> } | undefined
        : { [Key in keyof O]: Options<O[Key]> }
    : O extends Record<string | number | symbol, any>
    ? { [Key in keyof O]: Options<O[Key]> } extends O
        ? { [Key in keyof O]: Options<O[Key]> } | undefined
        : { [Key in keyof O]: Options<O[Key]> }
    : O;

/**
 * Represents an object, that includes all the default values for the options object.
 * Only values, that can be `undefined` can be included in the default options object.
 */
export type DefaultOptions<O> = any;

/**
 * Transforms the options object by setting the default values.
 */
export class OptionsTransformer<O> implements Transformer<Options<O>, O>, Evaluatable<Options<O>, O> {
    /**
     * Default options.
     */
    public readonly defaultOptions: DefaultOptions<O>;

    constructor(defaults: DefaultOptions<O>) {
        this.defaultOptions = defaults;
    }

    /**
     * Sets the default values of the options. Only sets the values that are not provided (`undefined`). `null` is considered a value.
     * @param input The input options.
     * @returns Options with the default values set.
     */
    transform(input: Options<O>): O {
        return setDefaults(this.defaultOptions, input);
    }

    //NO-LOGIC

    evaluate(input: Options<O>): O {
        return this.transform(input);
    }
}


/**
 * Deeply sets the default values of the options. Only sets the values that are not provided (`undefined`). `null` is considered a value.
 * @param defaults The default options.
 * @param options The provided options.
 * @returns Object, where all the values are set to the default value if they are not provided.
 */
export function setDefaults<O>(defaults: DefaultOptions<O>, options: Options<O>): O {
    if (typeof defaults === "object") {
        if (options === undefined) {
            return deepClone(defaults);
        }
        const result: O = deepClone(options) as O;
        for (const key in defaults) {
            //@ts-expect-error
            result[key] = setDefaults(defaults[key], options[key]);
        }
        return result;
    } else {
        if (options === undefined) {
            return defaults;
        }
        return options as O;
    }
}