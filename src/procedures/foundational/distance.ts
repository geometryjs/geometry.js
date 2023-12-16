import { Procedure } from "../procedure";

/**
 * Calculates the distance between a point and a line.
 * @see {@link https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line}
 */
export class PointFromLineDistance extends Procedure<{point: {x: number, y: number}, line: {a: number, b: number, c:number}}, {distance: number}> {
    constructor() {
        super({
            name: "Point From Line Distance",
            procedure: ({point, line}) => {
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