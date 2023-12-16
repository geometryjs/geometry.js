/**
 * The generic error thrown by GeometryJS.
 */
export class GeometryJsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'GeometryJsError';
    }
}