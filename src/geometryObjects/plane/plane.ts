import type { PointObject, SettableValueObject, ValueObject, DependencyNode, GeometryObject, Plane as IPlane, LineObject, VectorObject, IntervalObject } from "../../interfaces";

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

    public createPointFromCoordinates(x: number, y: number): PointObject {
        return new PointFromCoordinates({ plane: this, x, y });
    }

    public createVectorFromTwoValues(x: ValueObject, y: ValueObject): VectorObject {
        return new VectorFromTwoValues({ plane: this, x, y });
    }

    public createVectorFromCoordinates(x: number, y: number): VectorObject {
        return new VectorFromCoordinates({ plane: this, x, y });
    }

    public createIntervalFromEndpointsAsValues(start: ValueObject, startIsIncluded: boolean, end: ValueObject, endIsIncluded: boolean): IntervalObject {
        return new IntervalFromEndPointsAsValues({ plane: this, start, startIncluded: startIsIncluded, end, endIncluded: endIsIncluded });
    }   

    public createIntervalFromEndpointsAsNumbers(start: number, startIsIncluded: boolean, end: number, endIsIncluded: boolean): IntervalObject {
        return new IntervalFromEndPoints({ plane: this, start, startIncluded: startIsIncluded, end, endIncluded: endIsIncluded })
    }

    public createOpenIntervalFromEndpointsAsValues(start: ValueObject, end: ValueObject): IntervalObject {
        return new OpenIntervalFromEndPointsAsValues({ plane: this, start, end });
    }

    public createOpenIntervalFromEndpointsAsNumbers(start: number, end: number): IntervalObject {
        return new OpenIntervalFromEndPoints({ plane: this, start, end });
    }

    public createClosedIntervalFromEndpointsAsValues(start: ValueObject, end: ValueObject): IntervalObject {
        return new ClosedIntervalFromEndPointsAsValues({ plane: this, start, end });
    }

    public createClosedIntervalFromEndpointsAsNumbers(start: number, end: number): IntervalObject {
        return new ClosedIntervalFromEndPoints({ plane: this, start, end });
    }

    public createLineFromTwoPoints(point1: PointObject, point2: PointObject): LineObject {
        return new LineFromTwoPoints({ plane: this, point1, point2 });
    }


    public constructPerpendicularLineFromPoint(line: LineObject, point: PointObject): LineObject {
        return new PerpendicularLineFromPoint({ plane: this, line, point });
    }

    public constructParallelLineFromPoint(line: LineObject, point: PointObject): LineObject {
        return new ParalellLineFromPoint({ plane: this, line, point });
    }
}
