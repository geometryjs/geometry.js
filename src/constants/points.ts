import { UnboundPoint } from "../geometryObjects/point/unbound";

/**
 * The origin point.
 * 
 * @group Point Constants
 */
export const ORIGIN = new UnboundPoint({
    x: 0,
    y: 0
});

/**
 * The point (1, 0).
 * 
 * @group Point Constants
 */
export const POINT_1_0 = new UnboundPoint({
    x: 1,
    y: 0
});

/**
 * The point (0, 1).
 * 
 * @group Point Constants
 */
export const POINT_0_1 = new UnboundPoint({
    x: 0,
    y: 1
});