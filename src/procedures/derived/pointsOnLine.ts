import { BareVector } from "../../interfaces";
import { Procedure } from "../procedure";
import { PerpendicularVector } from "./perpendicularVector";

const PERPENDICULAR_VECTOR = new PerpendicularVector();

/**
 * Calculates two points on the line defined by the given coefficients.
 * @see {@link ../../../docs/twoPointsOnEquationLine.md | Points on Line Procedure Documentation}
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
