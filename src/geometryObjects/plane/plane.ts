import type { PointObject, SettableValueObject, ValueObject, DependencyNode, GeometryObject, Plane as IPlane, LineObject, VectorObject, IntervalWithSettableEndpointsObject, IntervalWithSettableEndpointsInclusionObject, SettablePointObject, SettableVectorObject, LineWithSettableEquationObject } from "../../interfaces";

import { MemoryMapCacheWithAutomaticCalculation } from "../../helpers/cache/memoryMapCache";
import { DependencyNodeWithCache } from "../dependencyNode";
import { PointFromTwoValues } from "../point/pointFromTwoValues";
import { ReadonlyValue } from "../value/readonlyValue";
import { SettableValue } from "../value/settableValue";
import { LineFromTwoPoints } from "../line/lineFromTwoPoints";
import { PerpendicularLineFromPoint } from "../line/perpendicularLine";
import { ParalellLineFromPoint } from "../line/parallelLine";
import { PointFromCoordinates } from "../point";
import { VectorFromCoordinates, VectorFromTwoValues } from "../vector";
import { ClosedIntervalFromEndPoints, ClosedIntervalFromEndPointsAsValues, IntervalFromEndPoints, IntervalFromEndPointsAsValues, OpenIntervalFromEndPoints, OpenIntervalFromEndPointsAsValues } from "../interval";
import { LineFromEquation, LineFromEquationAsValues, LineFromPointAndDirectionalVector, LineFromPointAndNormalVector } from "../line";
/**
 * Represents a plane.
 *
 * @group Plane
 */
export class Plane extends DependencyNodeWithCache<{}, true> implements IPlane {
    private readonly objects: Set<GeometryObject> = new Set();

    constructor() {
        super({ dependencies: [], cache: new MemoryMapCacheWithAutomaticCalculation<{}>({}) });
    }

    public linkObject(object: GeometryObject & DependencyNode): void {
        this.registerDependency(object);
        this.objects.add(object);
    }

    public ulinkObject(object: GeometryObject): void {
        this.objects.delete(object);
    }

    [Symbol.iterator](): Iterator<GeometryObject> {
        return this.objects.values();
    }

    public createReadonlyValue(value: number): ValueObject {
        return new ReadonlyValue({ plane: this, value });
    }

    public createValue(value: number): SettableValueObject {
        return new SettableValue({ plane: this, value });
    }

    public createPointFromTwoValues(x: ValueObject, y: ValueObject): PointObject {
        return new PointFromTwoValues({ plane: this, x, y });
    }

    public createPointFromCoordinates(x: number, y: number): SettablePointObject {
        return new PointFromCoordinates({ plane: this, x, y });
    }

    public createVectorFromTwoValues(x: ValueObject, y: ValueObject): VectorObject {
        return new VectorFromTwoValues({ plane: this, x, y });
    }

    public createVectorFromCoordinates(x: number, y: number): SettableVectorObject {
        return new VectorFromCoordinates({ plane: this, x, y });
    }

    public createIntervalFromEndpointsAsValues(start: ValueObject, startIsIncluded: boolean, end: ValueObject, endIsIncluded: boolean): IntervalWithSettableEndpointsInclusionObject {
        return new IntervalFromEndPointsAsValues({ plane: this, start, startIncluded: startIsIncluded, end, endIncluded: endIsIncluded });
    }   

    public createIntervalFromEndpointsAsNumbers(start: number, startIsIncluded: boolean, end: number, endIsIncluded: boolean): IntervalWithSettableEndpointsObject {
        return new IntervalFromEndPoints({ plane: this, start, startIncluded: startIsIncluded, end, endIncluded: endIsIncluded })
    }

    public createOpenIntervalFromEndpointsAsValues(start: ValueObject, end: ValueObject): IntervalWithSettableEndpointsInclusionObject {
        return new OpenIntervalFromEndPointsAsValues({ plane: this, start, end });
    }

    public createOpenIntervalFromEndpointsAsNumbers(start: number, end: number): IntervalWithSettableEndpointsObject {
        return new OpenIntervalFromEndPoints({ plane: this, start, end });
    }

    public createClosedIntervalFromEndpointsAsValues(start: ValueObject, end: ValueObject): IntervalWithSettableEndpointsInclusionObject {
        return new ClosedIntervalFromEndPointsAsValues({ plane: this, start, end });
    }

    public createClosedIntervalFromEndpointsAsNumbers(start: number, end: number): IntervalWithSettableEndpointsObject {
        return new ClosedIntervalFromEndPoints({ plane: this, start, end });
    }

    public createLineFromTwoPoints(point1: PointObject, point2: PointObject): LineObject {
        return new LineFromTwoPoints({ plane: this, point1, point2 });
    }

    public createLineFromEquationAsNumbers(a: number, b: number, c: number): LineWithSettableEquationObject {
        return new LineFromEquation({ plane: this, a, b, c });
    }

    public createLineFromEquationAsValues(a: ValueObject, b: ValueObject, c: ValueObject): LineWithSettableEquationObject {
        return new LineFromEquationAsValues({ plane: this, a, b, c });
    }

    public createLineFromPointAndDirectionalVector(point: PointObject, directionalVector: VectorObject): LineObject {
        return new LineFromPointAndDirectionalVector({ plane: this, point, directionalVector });
    }

    public createLineFromPointAndNormalVector(point: PointObject, normalVector: VectorObject): LineObject {
        return new LineFromPointAndNormalVector({ plane: this, point, normalVector: normalVector });
    }

    public constructPerpendicularLineFromPoint(line: LineObject, point: PointObject): LineObject {
        return new PerpendicularLineFromPoint({ plane: this, line, point });
    }

    public constructParallelLineFromPoint(line: LineObject, point: PointObject): LineObject {
        return new ParalellLineFromPoint({ plane: this, line, point });
    }


    public readonly objectType = "plane";
    public readonly virtual = false;
}
