import { Procedure } from "../procedure";

/**
 * A procedure for the Pythagorean Theorem.
 * @see {@link https://en.wikipedia.org/wiki/Pythagorean_theorem | Pythagorean Theorem}
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

/**
 * A procedure for the Pythagorean Theorem.
 *@see {@link https://en.wikipedia.org/wiki/Pythagorean_theorem | Pythagorean Theorem}
 */
export const PYTHAGOREAN_THEOREM = new PythagoreanTheorem();
