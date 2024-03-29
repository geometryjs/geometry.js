import type { Point, GeometryObject as IGeometryObject, Line, DependencyNode, SingleParametricCurve, Plane, Evaluatable, Vector, Interval, NonVirtualObject } from "../../interfaces";

import { MemoryMapCacheWithAutomaticCalculation } from "../../helpers";
import { GeometryObject } from "../geometryObject";
import * as Interfaces from "../../interfaces/runtimeInterfaces";
import { UnboundPoint } from "../point";
import * as Procedures from "../../procedures";
import { UnboundVector } from "../vector";
import { REALS, Y_UNIT_VECTOR } from "../../constants";
import { isLine } from "../../validators";
import { isZero } from "../../helpers/equality/float";

/**
 * Represents common behaviour of bound lines.
 */
export abstract class AbstractLine extends GeometryObject<{ point1: Point, point2: Point, normalVector: Vector, directionalVector: Vector, a: number, b: number, c: number, xAxisAngle: number, nonExistantState: boolean }> implements Line, IGeometryObject, DependencyNode {
    get arbitraryPoint1(): Point {
        return this.cache.readValue("point1");
    }

    get arbitraryPoint2(): Point {
        return this.cache.readValue("point2");
    }

    get directionalVector(): Vector {
        return this.cache.readValue("directionalVector");
    }

    get normalVector(): Vector {
        return this.cache.readValue("normalVector");
    }

    get a(): number {
        return this.cache.readValue("a");
    }

    get b(): number {
        return this.cache.readValue("b");
    }

    get c(): number {
        return this.cache.readValue("c");
    }

    get interval(): Interval {
        return REALS;
    }

    get xAxisAngle(): number {
        return this.cache.readValue("xAxisAngle");
    }

    public exists(): boolean {
        return !this.cache.readValue("nonExistantState") && super.exists();
    }
    atParameterValue(t: number): Point {
        return this.evaluate(t);
    }

    evaluate(input: number): Point {
        return UnboundPoint.fromVector(this.arbitraryPoint1.toVector().add(this.directionalVector.multiplyByScalar(input)));
    }
    equals(other: NonVirtualObject): boolean {
        if (!isLine(other)) return false;
        const intersection = Procedures.Derived.LINE_LINE_INTERSECTION.perform({
            line1: this,
            line2: other
        });

        return intersection.objectType === "line";
    }

    public readonly objectType = "line";
    public readonly virtual = false;
}

/**
 * Represents common behaviour of bound lines that are defined by two points.
 * 
 * @group Line
 */
export abstract class AbstractLineFromTwoPoints extends AbstractLine {
    protected abstract getPoint1(): Point;
    protected abstract getPoint2(): Point;

    constructor(parameters: { dependencies: Iterable<DependencyNode>, plane: Plane }) {
        super({
            cache: new MemoryMapCacheWithAutomaticCalculation({
                point1: () => {
                    return UnboundPoint.fromPoint(this.getPoint1());
                },
                point2: () => {
                    return UnboundPoint.fromPoint(this.getPoint2());
                },
                normalVector: () => {
                    return UnboundVector.fromBare(Procedures.Derived.PERPENDICULAR_VECTOR.perform({
                        direction: "positive",
                        vector: this.directionalVector.toBare()
                    }).perpendicularVector);
                },
                directionalVector: () => {
                    return this.arbitraryPoint2.toVector().subtract(this.arbitraryPoint1.toVector()).normalize();
                },
                a: () => {
                    return this.normalVector.x;
                },
                b: () => {
                    return this.normalVector.y;
                },
                c: () => {
                    return Procedures.Derived.LINE_C_COEFFICIENT.perform({
                        normalVector: this.normalVector.toBare(),
                        point: this.arbitraryPoint1
                    }).cCoefficient;
                },
                xAxisAngle: () => {
                    return Procedures.Foundational.LINE_ANGLE.perform({
                        line1Vector: this.normalVector.toBare(),
                        line2Vector: Y_UNIT_VECTOR.toBare()
                    }).angle;
                },
                nonExistantState: () => {
                    return false;
                }
            }),
            implementedInterfaces: [...Interfaces.Line, ...Interfaces.SingleParametricCurve, ...Interfaces.Evaluatable],
            ...parameters
        });
    }

}

/**
 * Represents common behaviour of bound lines that are defined by an equation.
 */
export abstract class AbstractLineFromEquation extends AbstractLine {
    protected abstract getA(): number;
    protected abstract getB(): number;
    protected abstract getC(): number;

    constructor(parameters: { dependencies: Iterable<DependencyNode>, plane: Plane }) {
        super({
            cache: new MemoryMapCacheWithAutomaticCalculation({
                a: () => {
                    return this.getA();
                },
                b: () => {
                    return this.getB();
                },
                c: () => {
                    return this.getC();
                },
                normalVector: () => {
                    return UnboundVector.fromBare([this.a, this.b]);
                },
                directionalVector: () => {
                    return UnboundVector.fromBare(Procedures.Derived.PERPENDICULAR_VECTOR.perform({
                        direction: "negative",
                        vector: this.normalVector.toBare()
                    }).perpendicularVector);
                },
                point1: () => {
                    return UnboundPoint.fromBareVector(Procedures.Derived.TWO_POINTS_ON_EQUATION_LINE.perform({
                        aCoefficient: this.a,
                        bCoefficient: this.b,
                        cCoefficient: this.c
                    }).point1);
                },
                point2: () => {
                    return UnboundPoint.fromBareVector(Procedures.Derived.TWO_POINTS_ON_EQUATION_LINE.perform({
                        aCoefficient: this.a,
                        bCoefficient: this.b,
                        cCoefficient: this.c
                    }).point2);
                },
                xAxisAngle: () => {
                    return Procedures.Foundational.LINE_ANGLE.perform({
                        line1Vector: this.normalVector.toBare(),
                        line2Vector: Y_UNIT_VECTOR.toBare()
                    }).angle;
                },
                nonExistantState: () => {
                    return this.a === 0 && this.b === 0 && this.c !== 0 || this.a === 0 && this.b === 0 && this.c === 0 || Number.isNaN(this.a) || Number.isNaN(this.b) || Number.isNaN(this.c);
                }
            }),
            implementedInterfaces: [...Interfaces.Line, ...Interfaces.SingleParametricCurve, ...Interfaces.Evaluatable],
            ...parameters,
        })
    }
}

/**
 * Represents common behaviour of bound lines that are defined by a point and a directional vector.
 */
export abstract class AbstractLineFromPointAndDirectionalVector extends AbstractLine {
    protected abstract getPoint(): Point;
    protected abstract getDirectionalVector(): Vector;

    constructor(parameters: { dependencies: Iterable<DependencyNode>, plane: Plane }) {
        super({
            cache: new MemoryMapCacheWithAutomaticCalculation({
                point1: () => {
                    return UnboundPoint.fromPoint(this.getPoint());
                },
                point2: () => {
                    return UnboundPoint.fromVector(this.getPoint().toVector().add(this.getDirectionalVector()));
                },
                normalVector: () => {
                    return UnboundVector.fromBare(Procedures.Derived.PERPENDICULAR_VECTOR.perform({
                        direction: "positive",
                        vector: this.directionalVector.toBare()
                    }).perpendicularVector);
                },
                directionalVector: () => {
                    return UnboundVector.fromVector(this.getDirectionalVector());
                },
                a: () => {
                    return this.normalVector.x;
                },
                b: () => {
                    return this.normalVector.y;
                },
                c: () => {
                    return Procedures.Derived.LINE_C_COEFFICIENT.perform({
                        normalVector: this.normalVector.toBare(),
                        point: this.arbitraryPoint1
                    }).cCoefficient;
                },
                xAxisAngle: () => {
                    return Procedures.Foundational.LINE_ANGLE.perform({
                        line1Vector: this.normalVector.toBare(),
                        line2Vector: Y_UNIT_VECTOR.toBare()
                    }).angle;
                },
                nonExistantState: () => {
                    return false;
                }
            }),
            implementedInterfaces: [...Interfaces.Line, ...Interfaces.SingleParametricCurve, ...Interfaces.Evaluatable],
            ...parameters
        });
    }
}

/**
 * Represents common behaviour of bound lines that are defined by a point and a normal vector.
 */
export abstract class AbstractLineFromPointAndNormalVector extends AbstractLine {
    protected abstract getPoint(): Point;
    protected abstract getNormalVector(): Vector;

    constructor(parameters: { dependencies: Iterable<DependencyNode>, plane: Plane }) {
        super({
            cache: new MemoryMapCacheWithAutomaticCalculation({
                point1: () => {
                    return UnboundPoint.fromPoint(this.getPoint());
                },
                point2: () => {
                    return UnboundPoint.fromVector(this.getPoint().toVector().add(this.getNormalVector()));
                },
                normalVector: () => {
                    return UnboundVector.fromVector(this.getNormalVector());
                },
                directionalVector: () => {
                    return UnboundVector.fromBare(Procedures.Derived.PERPENDICULAR_VECTOR.perform({
                        direction: "negative",
                        vector: this.normalVector.toBare()
                    }).perpendicularVector);
                },
                a: () => {
                    return this.normalVector.x;
                },
                b: () => {
                    return this.normalVector.y;
                },
                c: () => {
                    return Procedures.Derived.LINE_C_COEFFICIENT.perform({
                        normalVector: this.normalVector.toBare(),
                        point: this.arbitraryPoint1
                    }).cCoefficient;
                },
                xAxisAngle: () => {
                    return Procedures.Foundational.LINE_ANGLE.perform({
                        line1Vector: this.normalVector.toBare(),
                        line2Vector: Y_UNIT_VECTOR.toBare()
                    }).angle;
                },
                nonExistantState: () => {
                    return false;
                }
            }),
            implementedInterfaces: [...Interfaces.Line, ...Interfaces.SingleParametricCurve, ...Interfaces.Evaluatable],
            ...parameters
        });
    }
}