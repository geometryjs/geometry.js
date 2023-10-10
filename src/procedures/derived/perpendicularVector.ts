import { BareReadonlyVector, BareVector } from "../../interfaces";
import { Procedure } from "../procedure";

/**
 * Creates a vector perpendicular to the given vector.
 * @see {@link ../../../docs/perpendicularVector.md | Perpendicular Vector Procedure Documentation}
 */
export class PerpendicularVector extends Procedure<{ vector: BareReadonlyVector; direction: "positive" | "negative" }, { perpendicularVector: BareVector }> {
    constructor() {
        super({
            name: "Perpendicular Vector",
            procedure: ({ vector, direction }) => {
                if (direction === "positive") {
                    return {
                        perpendicularVector: [-vector[1], vector[0]],
                    };
                } else {
                    return {
                        perpendicularVector: [vector[1], -vector[0]],
                    };
                }
            },
        })
    }
}
