import type { BareReadonlyVector, Point } from "../../interfaces";

import { Procedure } from "../procedure";
/**
 * Calculates the c coefficient of the line equation in the form of ax + by + c = 0, given the line's normal vector and a point on the line.
 * @see {@link ../../../docs/lineCCoefficient.md | Line c Coefficient Procedure Documentation}
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