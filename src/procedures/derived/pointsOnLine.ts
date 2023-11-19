import { BareVector } from "../../interfaces";
import { Procedure } from "../procedure";
import { PERPENDICULAR_VECTOR } from "./perpendicularVector";

/**
 * Calculates two points on the line defined by the given coefficients.
 * @see [Points on Line Procedure Documentation](../../../docs/procedures/twoPointsOnEquationLine.md)
 */
export class TwoPointsOnEquationLine extends Procedure<{ aCoefficient: number, bCoefficient: number, cCoefficient: number }, { point1: BareVector, point2: BareVector }> {
    constructor() {
        super({
            name: "Two Points on Equation Line",
            procedure: ({ aCoefficient, bCoefficient, cCoefficient }) => {
                if (aCoefficient === 0 && bCoefficient === 0) throw new Error("Invalid coefficients");
                const directionalVector = PERPENDICULAR_VECTOR.perform({
                    direction: "negative",
                    vector: [aCoefficient, bCoefficient]
                }).perpendicularVector;
                let p1: BareVector;
                if (aCoefficient === 0) {
                    const y = -cCoefficient / bCoefficient;
                    p1 = [0, y];
                } else  {
                    const x = -cCoefficient / aCoefficient;
                    p1 = [x, 0];
                }

                const p2: BareVector = [p1[0] + directionalVector[0], p1[1] + directionalVector[1]];
                return {
                    point1: p1,
                    point2: p2
                }
            }
        });
    }
}

/**
 * Calculates two points on the line defined by the given coefficients.
 * @see {@link TwoPointsOnEquationLine}
 */
export const TWO_POINTS_ON_EQUATION_LINE = new TwoPointsOnEquationLine();