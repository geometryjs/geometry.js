import { Procedure } from "../procedure";

/**
 * A procedure for the Pythagorean Theorem.
 * @see {@link https://en.wikipedia.org/wiki/Pythagorean_theorem}
 */
export class PythagoreanTheorem extends Procedure<{ values: number[] }, { distance: number }> {
    constructor() {
        super({
            name: "Pythagorean Theorem",
            procedure: ({ values }) => {
                let sum = 0;
                for (const value of values) {
                    sum += value ** 2;
                }
                return {
                    distance: Math.sqrt(sum),
                };
            },
        });
    }
}
