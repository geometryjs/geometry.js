import type { BareReadonlyVector, Point } from "../../interfaces";

import { Procedure } from "../procedure";
/**
 * Calculates the c coefficient of the line equation in the form of ax + by + c = 0, given the line's normal vector and a point on the line.
 * @see [Line c Coefficient Procedure Documentation](../../../docs/procedures/lineCCoefficient.md)
 */
export class LineCCoefficient extends Procedure<{ normalVector: BareReadonlyVector, point: Point }, { cCoefficient: number }> {
    constructor() {
        super({
            name: "Line c Coefficient",
            procedure: ({ normalVector, point }) => {
                return {
                    cCoefficient: -normalVector[0] * point.x - normalVector[1] * point.y,
                };
            },
        })
    }
}

/**
 * Calculates the c coefficient of the line equation in the form of ax + by + c = 0, given the line's normal vector and a point on the line.
 * @see {@link LineCCoefficient}
 */
export const LINE_C_COEFFICIENT = new LineCCoefficient();