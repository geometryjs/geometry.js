import { isEqual } from "../../helpers/equality/float";
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

/**
 * Checks whether two lines are parallel.
 * @see [Lines Parallel Procedure Documentation](../../../docs/procedures/linesParallel.md)
 */
export class LinesParallel extends Procedure<{ lines: { a: number, b: number, c: number }[] }, { parallel: boolean }> {
    constructor() {
        super({
            name: "Lines Parallel",
            procedure: ({ lines }) => {
                const firstLine = lines[0]!;
                for (let i = 1; i < lines.length; i++) {
                    const line = lines[i]!;
                    if (!isEqual(firstLine.a * line.b, firstLine.b * line.a)) {
                        return { parallel: false };
                    }
                }
                return { parallel: true };
            },
        })
    }
}

/**
 * Checks whether two lines are parallel.
 * @see {@link LinesParallel}
 */
export const LINES_PARALLEL = new LinesParallel();