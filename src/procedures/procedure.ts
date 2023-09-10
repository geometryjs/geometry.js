import { Evaluatable } from "../interfaces/evaluatable";
import { Procedure as IProcedure } from "../interfaces/procedure";
/**
 * Instance of the procedure class represents a pure function that can be executed on specified data. The other properties of the class are used to describe the procedure.
 * To allow for procedure chaining, the input and output are both 1 record object.
 * @template Input - The type of the input data.
 * @template Output - The type of the output data.
 */
export class Procedure<Input extends Record<string, any>, Output extends Record<string, any>> implements IProcedure<Input, Output>, Evaluatable<Input, Output> {
    private readonly procedureName: string;
    private readonly procedure: (input: Input) => Output;


    constructor(options: ProcedureConstructorOptions<Input, Output>) {
        const { name, procedure } = options;
        this.procedureName = name;
        this.procedure = procedure;
    }

    /**
     * Name of the procedure.
     */
    get name(): string {
        return this.procedureName;
    }

    /**
     * Performs the procedure.
     */
    public perform(input: Input): Output {
        return this.procedure(input);
    }

    // NO-LOGIC

    public evaluate(input: Input): Output {
        return this.perform(input);
    }
}

type ProcedureConstructorOptions<Input extends Record<string, any>, Output extends Record<string, any>> = {
    name: string;
    procedure: (input: Input) => Output;
};
