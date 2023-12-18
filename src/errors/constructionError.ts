import { GeometryJsError } from "./geometryJsError";

/**
 * An error for when a construction operation fails.
 */
export class ConstructionError extends GeometryJsError {
    constructor(parameters: { message: string, id: string, description?: string, name?: string }) {
        super({
            ...parameters,
            name: parameters.name ?? 'ConstructionError',
            id: "Cst." + parameters.id,
        });
    }
}

/**
 * An error for when a construction operation fails because a specific case is not implemented.
 */
export class NotImplementedConstructionError extends ConstructionError {
    constructor(parameters: { message: string, id: string, description?: string, name?: string }) {
        super({
            ...parameters,
            name: parameters.name ?? 'NotImplementedConstructionError',
            id: "NI." + parameters.id,
        });
    }
}

/**
 * An error for when an intersection construction operation fails because a specific case is not implemented.
 */
export class NotImplementedIntersectionConstructionError extends NotImplementedConstructionError {
    constructor(parameters: { message: string, id: string, description?: string, name?: string }) {
        super({
            ...parameters,
            name: parameters.name ?? 'NotImplementedIntersectionConstructionError',
            id: "Intr." + parameters.id,
        });
    }
}