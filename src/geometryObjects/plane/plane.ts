import type { PointObject, SettableValueObject, ValueObject, DependencyNode, GeometryObject, Plane as IPlane, LineObject } from "../../interfaces";

import { MemoryMapCacheWithAutomaticCalculation } from "../../helpers/cache/memoryMapCache";
import { DependencyNodeWithCache } from "../dependencyNode";
import { PointFromTwoValues } from "../point/pointFromTwoValues";
import { ReadonlyValue } from "../value/readonlyValue";
import { SettableValue } from "../value/settableValue";
import { LineFromTwoPoints } from "../line/lineFromTwoPoints";
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

    public createLineFromTwoPoints(point1: PointObject, point2: PointObject): LineObject {
        return new LineFromTwoPoints({ plane: this, point1, point2 });
    }

    
}
