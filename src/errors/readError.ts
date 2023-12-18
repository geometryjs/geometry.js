import { GeometryJsError } from "./geometryJsError";

/**
 * An error for when a read operation fails.
 */
export class ReadError extends GeometryJsError {
    constructor(parameters: { message: string, id: string, description?: string, name?: string }) {
        super(parameters);
        this.name = parameters.name ?? 'ReadError';
    }
}

/**
 * An error for when a read operation fails because the object does not exist.
 */
export class ExistanceViolationError extends ReadError {
    constructor(parameters: { message: string, id: string, description?: string, name?: string }) {
        super(parameters);
        this.name = parameters.name ?? 'ExistanceViolationError';
    }
}