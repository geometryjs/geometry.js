import type { BareReadonlyVector } from "../../../src/interfaces";
import { Derived } from "../../../src/procedures";

const cases: {
    equation: {
        aCoefficient: number,
        bCoefficient: number,
        cCoefficient: number
    }
}[] = [
    {
        equation: {
            aCoefficient: 1,
            bCoefficient: 0,
            cCoefficient: 0
        }
    },
    {
        equation:{
            aCoefficient: 0,
            bCoefficient: 1,
            cCoefficient: 0
        }
    },
    {
        equation: {
            aCoefficient: 1,
            bCoefficient: 1,
            cCoefficient: 0
        }
    },
    {
        equation: {
            aCoefficient: 1,
            bCoefficient: 0,
            cCoefficient: 65
        }
    },
    {
        equation:{
            aCoefficient: 0,
            bCoefficient: 1,
            cCoefficient: 112
        }
    },
    {
        equation: {
            aCoefficient: 1,
            bCoefficient: 1,
            cCoefficient: 13
        }
    },
    {
        equation: {
            aCoefficient: 1000,
            bCoefficient: .0001,
            cCoefficient: 24
        }
    },
    {
        equation:{
            aCoefficient: 3589,
            bCoefficient: 0.32,
            cCoefficient: 0.11
        }
    },
    {
        equation: {
            aCoefficient: 1992,
            bCoefficient: 1123,
            cCoefficient: 123
        }
    }
]

function evaluate(point: BareReadonlyVector, equation: { aCoefficient: number, bCoefficient: number, cCoefficient: number }) {
    const { aCoefficient, bCoefficient, cCoefficient } = equation;
    const [x, y] = point;
    return aCoefficient * x + bCoefficient * y + cCoefficient;
}   

describe("Get two points on a line given an equation", () => {
    test.each(cases)("should calculate two points on a line", ({ equation }) => {
        const result = Derived.TWO_POINTS_ON_EQUATION_LINE.perform(equation);
        expect(evaluate(result.point1, equation) + equation.cCoefficient).toBeCloseTo(equation.cCoefficient);
        expect(evaluate(result.point2, equation) + equation.cCoefficient).toBeCloseTo(equation.cCoefficient);
    });
    test("should throw an error if the equation is invalid", () => {
        const equation = {
            aCoefficient: 0,
            bCoefficient: 0,
            cCoefficient: 12223
        }
        expect(() => Derived.TWO_POINTS_ON_EQUATION_LINE.perform(equation)).toThrow();
    });
})