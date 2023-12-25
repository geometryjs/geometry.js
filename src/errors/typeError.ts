import { getTypeString } from "../helpers/getTypeString";
import { GeometryJsError } from "./geometryJsError";

export class TypeError extends GeometryJsError {
    readonly expectedType: string;
    readonly actualType: string;

    constructor(parameters: TypeErrorConstructorOptions) {
        super({
            ...parameters,
            name: parameters.name ?? 'TypeError',
            id: "Typ." + parameters.id,
        });

        this.expectedType = parameters.expectedType;
        this.actualType = "actualType" in parameters ? parameters.actualType : getTypeString(parameters.actualInstance);
    }
}

export type TypeErrorConstructorOptions = 
// Standard constructor with actual type as string
{
    message: string,
    id: string,
    description?: string,
    name?: string,
    expectedType: string,
    actualType: string,
} | {
    // Constructor with actual type as instance
    message: string,
    id: string,
    description?: string,
    name?: string,
    expectedType: string,
    actualInstance: unknown,
}