import { UnboundInterval } from "../geometryObjects/interval/unbound";
import { NEGATIVE_INFINITY, POSITIVE_INFINITY } from "./numbers";

/**
 * The interval of all real numbers.
 * 
 * @group Interval constants
 */
export const REALS = new UnboundInterval({
    end: {
        closed: false,
        value: POSITIVE_INFINITY
    },
    start: {
        closed: false,
        value: NEGATIVE_INFINITY
    }
});

/**
 * The interval of all positive real numbers.
 * 
 * @group Interval constants
 */
export const POSITIVE_REALS = new UnboundInterval({
    end: {
        closed: false,
        value: POSITIVE_INFINITY
    },
    start: {
        closed: false,
        value: 0
    }
});

/**
 * The interval of all negative real numbers.
 * 
 * @group Interval constants
 */
export const NEGATIVE_REALS = new UnboundInterval({
    end: {
        closed: false,
        value: 0
    },
    start: {
        closed: false,
        value: NEGATIVE_INFINITY
    }
});

/**
 * The interval of all non-negative real numbers.
 * 
 * @group Interval constants
 */
export const NOT_NEGATIVE_REALS = new UnboundInterval({
    end: {
        closed: false,
        value: POSITIVE_INFINITY
    },
    start: {
        closed: true,
        value: 0
    }
});

/**
 * The interval of all non-positive real numbers.
 * 
 * @group Interval constants
 */
export const NOT_POSITIVE_REALS = new UnboundInterval({
    end: {
        closed: true,
        value: 0
    },
    start: {
        closed: false,
        value: NEGATIVE_INFINITY
    }
});