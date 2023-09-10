/**
 * A procedure is a pure function that takes an input and returns an output. It is designed to perform logic on data.
 */
export interface Procedure<Input extends Record<string, any>, Output extends Record<string, any>> {
    /**
     * Performs the procedure.
     */
    perform(input: Input): Output;

    /**
     * The name of the procedure.
     */
    readonly name: string;
}
