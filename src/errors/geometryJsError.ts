/**
 * The generic error thrown by GeometryJS.
 */
export class GeometryJsError extends Error {

    /**
     * The Unique Error ID.
     */
    public readonly id: string;

    /**
     * The description of the error.
     */
    public readonly description?: string;

    /**
     * The timestamp of the error.
     */
    public readonly timestamp: number = Date.now();
    constructor(parameters: { message: string, id: string, description?: string, name?: string }) {
        super(parameters.message);
        this.name = parameters.name ?? 'GeometryJsError';
        this.id = parameters.id;
        this.description = parameters.description;
        Object.setPrototypeOf(this, new.target.prototype);

    }
}