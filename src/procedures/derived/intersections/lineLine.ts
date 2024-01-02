import { isEqual } from "../../../helpers/equality/float";
import { LINE_FROM_LINE_DISTANCE } from "../../foundational";
import { Procedure } from "../../procedure";
import { LINES_PARALLEL } from "../lineEquation";

/**
 * Calculates the intersection of two lines.
 * 
 * @see [Line Line Intersection Procedure Documentation](../../../docs/wiki/procedures/Line-Line-Intersection.md)
 */
export class LineLineIntersection extends Procedure<{ line1: { a: number, b: number, c: number }, line2: { a: number, b: number, c: number } }, { intersection: { x: number, y: number }, objectType: "point" } | { intersection: { a: number, b: number, c: number }, objectType: "line" } | { intersection: null, objectType: "null" }> {
    constructor() {
        super({
            name: "Line Line Intersection",
            procedure: ({ line1, line2 }) => {
                if (LINES_PARALLEL.perform({ lines: [line1, line2] }).parallel) {
                    if (isEqual(LINE_FROM_LINE_DISTANCE.perform({ line1, line2 }).distance, 0)) return { intersection: line1, objectType: "line" };
                    return { intersection: null, objectType: "null" };
                }
                const x = (line2.b * line1.c - line1.b * line2.c) / (line2.a * line1.b - line1.a * line2.b);
                const y = (line1.a * line2.c - line2.a * line1.c) / (line2.a * line1.b - line1.a * line2.b);

                return { intersection: { x, y }, objectType: "point" };
            }
        });
    }
}

/**
 * Calculates the intersection of two lines.
 * @see {@link LineLineIntersection}
 */
export const LINE_LINE_INTERSECTION = new LineLineIntersection();