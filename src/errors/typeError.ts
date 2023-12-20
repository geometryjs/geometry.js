import { GeometryJsError } from "./geometryJsError";

export class TypeError extends GeometryJsError {
    constructor(parameters: { message: string, id: string, description?: string, name?: string }) {
        super({
            ...parameters,
            name: parameters.name ?? 'TypeError',
            id: "Typ." + parameters.id,
        });
    }
}