import { UnboundInterval } from "../geometryObjects/interval/unbound";
import { NEGATIVE_INFINITY, POSITIVE_INFINITY } from "./numbers";

/**
 * The interval of all real numbers.
 * 
 * @group Interval constants
 */
export const REALS = new UnboundInterval({
    start: NEGATIVE_INFINITY,
    startIncluded: false,
    end: POSITIVE_INFINITY,
    endIncluded: false
});

/**
 * The interval of all positive real numbers.
 * 
 * @group Interval constants
 */
export const POSITIVE_REALS = new UnboundInterval({
    start: 0,
    startIncluded: false,
    end: POSITIVE_INFINITY,
    endIncluded: false
});

/**
 * The interval of all negative real numbers.
 * 
 * @group Interval constants
 */
export const NEGATIVE_REALS = new UnboundInterval({
    start: NEGATIVE_INFINITY,
    startIncluded: false,
    end: 0,
    endIncluded: false
});

/**
 * The interval of all non-negative real numbers.
 * 
 * @group Interval constants
 */
export const NOT_NEGATIVE_REALS = new UnboundInterval({
    start: 0,
    startIncluded: true,
    end: POSITIVE_INFINITY,
    endIncluded: false
});

/**
 * The interval of all non-positive real numbers.
 * 
 * @group Interval constants
 */
export const NOT_POSITIVE_REALS = new UnboundInterval({
    start: NEGATIVE_INFINITY,
    startIncluded: false,
    end: 0,
    endIncluded: true
});