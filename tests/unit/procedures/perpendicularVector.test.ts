import { PERPENDICULAR_VECTOR } from "../../../src/procedures/derived";

const cases: {
    output: ReturnType<typeof PERPENDICULAR_VECTOR["perform"]>,
    input: Parameters<typeof PERPENDICULAR_VECTOR["perform"]>[0]
}[] = [
    {
        input: {
            vector: [1, 0],
            direction: "positive"
        },
        output: {
            perpendicularVector: [0, 1]
        }
    },
    {
        input: {
            vector: [1, 0],
            direction: "negative"
        },
        output: {
            perpendicularVector: [0, -1]
        }
    },
    {
        input: {
            vector: [321, 551],
            direction: "positive"
        },
        output: {
            perpendicularVector: [-551, 321]
        }
    },
    {
        input: {
            vector: [321, 551],
            direction: "negative"
        },
        output: {
            perpendicularVector: [551, -321]
        }
    }
]
describe("perpendicularVector", () => {
    test.each(cases)("should calculate perpendicular vector", ({ input, output }) => {
        const result = PERPENDICULAR_VECTOR.perform(input);
        expect(result.perpendicularVector[0]).toBeCloseTo(output.perpendicularVector[0]);
        expect(result.perpendicularVector[1]).toBeCloseTo(output.perpendicularVector[1]);
    });
});