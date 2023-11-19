import { REALS, Y_UNIT_VECTOR } from "../../constants";
import type {  Interval, Line, Point, Vector } from "../../interfaces";
import { Derived, Foundational } from "../../procedures";
import { UnboundPoint } from "../point";
import { UnboundVector } from "../vector";

/**
 * A line, that is not bound to a plane, nor is it a part of the dependency graph.
 */
export class UnboundLine implements Line {
    public readonly a: number;
    public readonly b: number;
    public readonly c: number;

    public readonly arbitraryPoint1: Point;
    public readonly arbitraryPoint2: Point;

    public readonly directionalVector: Vector;
    public readonly normalVector: Vector;

    public readonly xAxisAngle: number;

    constructor(parameters: { a: number, b: number, c: number, arbitraryPoint1: Point, arbitraryPoint2: Point, directionalVector: Vector, normalVector: Vector, xAxisAngle: number }) {
        this.a = parameters.a;
        this.b = parameters.b;
        this.c = parameters.c;

        this.arbitraryPoint1 = parameters.arbitraryPoint1;
        this.arbitraryPoint2 = parameters.arbitraryPoint2;

        this.directionalVector = parameters.directionalVector;
        this.normalVector = parameters.normalVector;

        this.xAxisAngle = parameters.xAxisAngle;
    }

    get interval(): Interval {
        return REALS;
    }

    atParameterValue(t: number): Point {
        return this.evaluate(t);
    }

    evaluate(input: number): Point {
        return UnboundPoint.fromVector(this.arbitraryPoint1.toVector().add(this.directionalVector.multiplyByScalar(input)));
    }

    /**
     * Creates an unbound line from a given line.
     * @param line The line to convert to an unbound line
     * @returns An unbound line with the same properties as the given line.
     */
    static fromLine(line: Line): Line {
        return new UnboundLine(line);
    }

    /**
     * Creates an unbound line from a given the lines equation.
     * @param a The a coefficient of the line equation in the form of ax + by + c = 0.
     * @param b The b coefficient of the line equation in the form of ax + by + c = 0.
     * @param c The c coefficient of the line equation in the form of ax + by + c = 0.
     * @returns An unbound line with the given equation.
     */
    static fromEquation(a: number, b: number, c: number): Line {
        const normalVector = UnboundVector.fromCoordinates(a, b);
        const directionalVector = UnboundVector.fromBare(Derived.PERPENDICULAR_VECTOR.perform({ vector: normalVector.toBare(), direction: "negative" }).perpendicularVector);

        const { point1, point2 } = Derived.TWO_POINTS_ON_EQUATION_LINE.perform({ aCoefficient: a, bCoefficient: b, cCoefficient: c });
        
        const xAxisAngle = Foundational.LINE_ANGLE.perform({ line1Vector: normalVector.toBare(), line2Vector: Y_UNIT_VECTOR.toBare()}).angle;

        return new UnboundLine({ a, b, c, normalVector, directionalVector, arbitraryPoint1: UnboundPoint.fromBareVector(point1), arbitraryPoint2: UnboundPoint.fromBareVector(point2), xAxisAngle});
    }

    /**
     * Creates an unbound line from a given two points.
     * @param point1 A point on the line.
     * @param point2 A second point on the line.
     * @returns An unbound line passing through the given points.
     */
    static fromPoints(point1: Point, point2: Point): Line {
        const arbitraryPoint1 = UnboundPoint.fromPoint(point1);
        const arbitraryPoint2 = UnboundPoint.fromPoint(point2);

        const directionalVector = UnboundVector.fromVector(point2.toVector().subtract(point1.toVector()));
        const normalVector = UnboundVector.fromBare(Derived.PERPENDICULAR_VECTOR.perform({ vector: directionalVector.toBare(), direction: "positive" }).perpendicularVector);

        const xAxisAngle = Foundational.LINE_ANGLE.perform({ line1Vector: normalVector.toBare(), line2Vector: Y_UNIT_VECTOR.toBare()}).angle;

        const a = normalVector.x;
        const b = normalVector.y;
        const c = Derived.LINE_C_COEFFICIENT.perform({ normalVector: normalVector.toBare(), point: arbitraryPoint1}).cCoefficient;


        return new UnboundLine({ a, b, c, normalVector, directionalVector, arbitraryPoint1, arbitraryPoint2, xAxisAngle});
    }

    /**
     * Creates an unbound line from a given point and directional vector.
     * @param point A point on the line.
     * @param directionalVector The directional vector of the line.
     * @returns An unbound line passing through the given point with the given directional vector.
     */
    static fromPointAndDirectionalVector(point: Point, directionalVector: Vector): Line {
        const arbitraryPoint1 = UnboundPoint.fromPoint(point);
        const arbitraryPoint2 = UnboundPoint.fromVector(point.toVector().add(directionalVector));

        const normalVector = UnboundVector.fromBare(Derived.PERPENDICULAR_VECTOR.perform({ vector: directionalVector.toBare(), direction: "positive" }).perpendicularVector);
        directionalVector = UnboundVector.fromVector(directionalVector);

        const xAxisAngle = Foundational.LINE_ANGLE.perform({ line1Vector: normalVector.toBare(), line2Vector: Y_UNIT_VECTOR.toBare()}).angle;

        const a = normalVector.x;
        const b = normalVector.y;
        const c = Derived.LINE_C_COEFFICIENT.perform({ normalVector: normalVector.toBare(), point: arbitraryPoint1}).cCoefficient;

        return new UnboundLine({ a, b, c, normalVector, directionalVector, arbitraryPoint1, arbitraryPoint2, xAxisAngle});
    }

    /**
     * Creates an unbound line from a given point and normal vector.
     * @param point A point on the line.
     * @param normalVector The normal vector of the line.
     * @returns An unbound line passing through the given point with the given normal vector.
     */
    static fromPointAndNormalVector(point: Point, normalVector: Vector): Line {
        const directionalVector = UnboundVector.fromBare(Derived.PERPENDICULAR_VECTOR.perform({ vector: normalVector.toBare(), direction: "negative" }).perpendicularVector);
        normalVector = UnboundVector.fromVector(normalVector);

        const arbitraryPoint1 = UnboundPoint.fromPoint(point);
        const arbitraryPoint2 = UnboundPoint.fromVector(point.toVector().add(directionalVector));

        const xAxisAngle = Foundational.LINE_ANGLE.perform({ line1Vector: normalVector.toBare(), line2Vector: Y_UNIT_VECTOR.toBare()}).angle;

        const a = normalVector.x;
        const b = normalVector.y;
        const c = Derived.LINE_C_COEFFICIENT.perform({ normalVector: normalVector.toBare(), point: arbitraryPoint1}).cCoefficient;

        return new UnboundLine({ a, b, c, normalVector, directionalVector, arbitraryPoint1, arbitraryPoint2, xAxisAngle});
    }

}