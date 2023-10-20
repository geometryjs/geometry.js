import { UnboundInterval } from "../../../../src/geometryObjects/interval"
describe("UnboundInterval", () => {
    test("can be created", () => {
        const interval = new UnboundInterval({
            start: {
                value: 1,
                closed: true,
            },
            end: {
                value: 2,
                closed: false,
            }
        });
        expect(interval).toBeDefined();
    });

    test.each([
        {
            number: 1,
            expected: true,
        },
        {
            number: 2,
            expected: false,
        },
        {
            number: 3,
            expected: false,
        },
        {
            number: 0,
            expected: false,
        }
    ])(`isInside`, ({ number, expected }) => {
        const interval = new UnboundInterval({
            start: {
                value: 1,
                closed: true,
            },
            end: {
                value: 2,
                closed: false,
            }
        });
        expect(interval.isInside(number)).toBe(expected);
    });

    test("length", () => {
        const interval = new UnboundInterval({
            start: {
                value: 1,
                closed: true,
            },
            end: {
                value: 2,
                closed: false,
            }
        });
        expect(interval.length).toBe(1);
    });

    test("evaluate", () => {
        const interval = new UnboundInterval({
            start: {
                value: 1,
                closed: false,
            },
            end: {
                value: 2,
                closed: true,
            }
        });
        expect(interval.evaluate(1)).toBe(false);
        expect(interval.evaluate(2)).toBe(true);
        expect(interval.evaluate(3)).toBe(false);
        expect(interval.evaluate(0)).toBe(false);
    });
});