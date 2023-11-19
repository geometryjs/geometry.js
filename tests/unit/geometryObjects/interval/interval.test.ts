import { NEGATIVE_REALS, NOT_NEGATIVE_REALS, NOT_POSITIVE_REALS, POSITIVE_REALS, REALS } from "../../../../src/constants";
import { Plane } from "../../../../src/geometryObjects";
import { UnboundInterval } from "../../../../src/geometryObjects/interval"
import { Evaluatable, Interval, IntervalWithSettableEndpointsInclusionObject, IntervalWithSettableEndpointsObject, IntervalWithSettableEndpointsValueObject } from "../../../../src/interfaces";
describe("UnboundInterval", () => {
    test("can be created", () => {
        const interval = new UnboundInterval({
            start: 1,
            startIncluded: true,
            end: 2,
            endIncluded: false
        });
        expect(interval).toBeDefined();
    });
});

describe("Interval constants", () => {
    test("to be defined", () => {
        expect(REALS).toBeDefined();
        expect(POSITIVE_REALS).toBeDefined();
        expect(NEGATIVE_REALS).toBeDefined();
        expect(NOT_NEGATIVE_REALS).toBeDefined();
        expect(NOT_POSITIVE_REALS).toBeDefined();
    });
});

describe("Interval from endpoints", () => {
    const plane = new Plane();
    const settableIntervals: IntervalWithSettableEndpointsValueObject[] = [
        plane.createIntervalFromEndpointsAsNumbers(1, true, 2, false),
        plane.createIntervalFromEndpointsAsNumbers(1, false, 2, false),
        plane.createIntervalFromEndpointsAsNumbers(1, true, 2, true),
        plane.createIntervalFromEndpointsAsNumbers(1, false, 2, true),
    ];

    const settableInclusionIntervals: IntervalWithSettableEndpointsInclusionObject[] = [
        plane.createIntervalFromEndpointsAsValues(plane.createReadonlyValue(1), true, plane.createReadonlyValue(2), false),
        plane.createIntervalFromEndpointsAsValues(plane.createReadonlyValue(1), false, plane.createValue(2), false),
        plane.createIntervalFromEndpointsAsValues(plane.createValue(1), true, plane.createReadonlyValue(2), true),
        plane.createIntervalFromEndpointsAsValues(plane.createValue(1), false, plane.createValue(2), true),
    ];

    const settableValueIntervals: IntervalWithSettableEndpointsObject[] = [
        plane.createClosedIntervalFromEndpointsAsNumbers(1, 2),
        plane.createOpenIntervalFromEndpointsAsNumbers(1, 2),
    ]



    test.each([...settableInclusionIntervals, ...settableIntervals])("can change inclusions", (interval) => {
        interval.startIncluded = false;
        interval.endIncluded = false;
        expect(interval.startIncluded).toBe(false);
        expect(interval.endIncluded).toBe(false);
        interval.startIncluded = true;
        interval.endIncluded = true;
        expect(interval.startIncluded).toBe(true);
        expect(interval.endIncluded).toBe(true);
    });

    test.each([...settableIntervals, ...settableValueIntervals])("can change endpoints", (interval) => {
        interval.start = 3;
        interval.end = 4;
        expect(interval.start).toBe(3);
        expect(interval.end).toBe(4);
    });
});



describe("Interval", () => {
    const plane = new Plane();

    const intervals: (Interval & Evaluatable<number, boolean>)[] = [
        new UnboundInterval({ start: 1, startIncluded: true, end: 2, endIncluded: false }),
        new UnboundInterval({ start: 1, startIncluded: false, end: 2, endIncluded: false }),
        new UnboundInterval({ start: 1, startIncluded: true, end: 2, endIncluded: true }),
        new UnboundInterval({ start: 1, startIncluded: false, end: 2, endIncluded: true }),
        REALS,
        POSITIVE_REALS,
        NOT_NEGATIVE_REALS,
        NOT_POSITIVE_REALS,
        NEGATIVE_REALS,
        plane.createClosedIntervalFromEndpointsAsNumbers(1, 2),
        plane.createOpenIntervalFromEndpointsAsNumbers(1, 2),
        plane.createClosedIntervalFromEndpointsAsValues(plane.createValue(1), plane.createValue(2)),
        plane.createOpenIntervalFromEndpointsAsValues(plane.createValue(1), plane.createValue(2)),
        plane.createIntervalFromEndpointsAsNumbers(1, true, 2, false),
        plane.createIntervalFromEndpointsAsNumbers(1, false, 2, false),
        plane.createIntervalFromEndpointsAsNumbers(1, true, 2, true),
        plane.createIntervalFromEndpointsAsNumbers(1, false, 2, true),
        plane.createIntervalFromEndpointsAsValues(plane.createReadonlyValue(1), true, plane.createReadonlyValue(2), false),
        plane.createIntervalFromEndpointsAsValues(plane.createReadonlyValue(1), false, plane.createValue(2), false),
        plane.createIntervalFromEndpointsAsValues(plane.createValue(1), true, plane.createReadonlyValue(2), true),
        plane.createIntervalFromEndpointsAsValues(plane.createValue(1), false, plane.createValue(2), true),
    ];

    test.each(intervals)("is inside", (interval) => {
        const values = [1, 2, -1, 0, 1.5, 2.5, 3];
        values.forEach(value => {
            const isLeftOfEnd = interval.endIncluded ? value <= interval.end : value < interval.end;
            const isRightOfStart = interval.startIncluded ? value >= interval.start : value > interval.start;
            const isInside = isLeftOfEnd && isRightOfStart;
            expect(interval.isInside(value)).toBe(isInside);
            expect(interval.evaluate(value)).toBe(isInside);
        });
    });

    test.each(intervals)("length", (interval) => {
        expect(interval.length).toBe(interval.end - interval.start);
    });
})