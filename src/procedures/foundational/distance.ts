import { LINES_PARALLEL } from "../derived/lineEquation";
import { Procedure } from "../procedure";

/**
 * Calculates the distance between a point and a line.
 * @see {@link https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line}
 */
export class PointFromLineDistance extends Procedure<{ point: { x: number, y: number }, line: { a: number, b: number, c: number } }, { distance: number }> {
    constructor() {
        super({
            name: "Point From Line Distance",
            procedure: ({ point, line }) => {
                // TODO: Handle case where line is made of zero vectors
                return {
                    distance: Math.abs(line.a * point.x + line.b * point.y + line.c) / Math.sqrt(line.a ** 2 + line.b ** 2)
                }
            }
        })
    }
}

/**
 * Calculates the distance between a point and a line.
 */
export const POINT_FROM_LINE_DISTANCE = new PointFromLineDistance();

/**
 * Calculates the distance between two lines.
 * @see {@link https://en.wikipedia.org/wiki/Distance_between_two_parallel_lines}
 */
export class LineFromLineDistance extends Procedure<{ line1: { a: number, b: number, c: number }, line2: { a: number, b: number, c: number } }, { distance: number }> {
    constructor() {
        super({
            name: "Line From Line Distance",
            procedure: ({ line1, line2 }) => { 
                if (!LINES_PARALLEL.perform({ lines: [line1, line2] }).parallel) return { distance: 0 };
                return { distance: Math.abs(line1.c - line2.c) / Math.sqrt(line1.a ** 2 + line1.b ** 2) };
            }
        });
    }
}

/**
 * Calculates the distance between two lines.
 * @see {@link LineFromLineDistance}
 */
export const LINE_FROM_LINE_DISTANCE = new LineFromLineDistance();