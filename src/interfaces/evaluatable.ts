/**
 * When implemented, the main purpose of the class is to evaluate at an input and return an output.
 * @template Input - The input data type.
 * @template Output - The output data type.
 */
export interface Evaluatable<Input, Output> {
    /**
     * Performs the evaluation. Should be a pure function.
     * @param input - The input data.
     * @returns The output data.
     */
    evaluate(input: Input): Output;
}
