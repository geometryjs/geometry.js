import { Evaluatable } from "../interfaces/evaluatable";
import { Transformer } from "../interfaces/transformer";
import { deepClone } from "./deepClone";
import { FilterUndefinedAndSetMaybeDefinedToOptional } from "./types/objects";
import { Complex } from "./types/unions";


/**
 * Options object. Can be an array or a record. Can be nested.
 * The `Options<O>` generic allows for empty objects and arrays to be excluded from the options object.
 */
export type Options<O> = O extends Complex ? FilterUndefinedAndSetMaybeDefinedToOptional<OptionsObject<O>> : O;

type ObjectOfOptions<O extends Complex> = FilterUndefinedAndSetMaybeDefinedToOptional<{ [Key in keyof O]: Options<O[Key]> }>;
type OptionsObject<O extends Complex> = {} extends ObjectOfOptions<O> ? ObjectOfOptions<O> | undefined : [] extends ObjectOfOptions<O> ? ObjectOfOptions<O> | undefined : ObjectOfOptions<O>;;


/**
 * Represents an object, that includes all the default values for the options object.
 * Only values, that can be `undefined` can be included in the default options object.
 */
export type DefaultOptions<O> = [O] extends [Complex] ? DefaultOptionsObject<O> : DefaultOptionsSingular<O>;

type DefaultOptionsSingular<O> = [undefined] extends [O] ? Exclude<O, undefined> : undefined;
type DefaultOptionsObject<O extends Complex> = {
    [Key in keyof O]-?: DefaultOptions<O[Key]>
};



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
        return setDefaults<O>(this.defaultOptions, input);
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
        if ((options as any) === undefined) { //@ts-ignore
            return deepClone(defaults) as O;
        }
        const result: O = deepClone(options) as O;
        for (const key in defaults) {
            //@ts-expect-error
            result[key] = setDefaults(defaults[key], options[key]);
        }
        return result;
    } else {
        if (options === undefined) {
            return defaults as O;
        }
        return options as O;
    }
}
