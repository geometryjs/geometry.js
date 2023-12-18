import { ObjectWithType } from "../interfaces";
import { GeometryJsError } from "./geometryJsError";

/**
 * An error for when a calculation operation fails.
 */
export class CalculationError extends GeometryJsError {
    constructor(parameters: { message: string, id: string, description?: string, name?: string }) {
        super({
            ...parameters,
            name: parameters.name ?? 'CalculationError',
            id: "Calc." + parameters.id,
        });
    }
}

/**
 * An error for when a calculation operation fails because a specific case is not implemented.
 */
export class NotImplementedCalculationError extends CalculationError {
    constructor(parameters: { message: string, id: string, description?: string, name?: string }) {
        super({
            ...parameters,
            name: parameters.name ?? 'NotImplementedCalculationError',
            id: "NI." + parameters.id,
        });
    }
}

/**
 * An error for when an intersection calculation operation fails because a specific case is not implemented.
 */
export class NotImplementedIntersectionCalculationError extends NotImplementedCalculationError {
    public readonly object1: ObjectWithType;
    public readonly object2: ObjectWithType;

    constructor(parameters: { message: string, id: string, description?: string, name?: string, object1: ObjectWithType, object2: ObjectWithType }) {
        super({
            ...parameters,
            name: parameters.name ?? 'NotImplementedIntersectionCalculationError',
            id: "Intr." + parameters.id,
        });
        this.object1 = parameters.object1;
        this.object2 = parameters.object2;
    }
}