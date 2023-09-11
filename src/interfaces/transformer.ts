/**
 * A transformer transofrms data from one type to another. It should not perform any logic on the data. It can be used to set default values, change names and object types, but should not perform any calculations.
 * @template Input - The type of the input data.
 * @template Output - The type of the output data.
 */
export interface Transformer<Input, Output> {
    /**
     * Transforms the input data into the output data.
     * @param input - The input data.
     * @returns The output data.
     */
    transform(input: Input): Output;
}
