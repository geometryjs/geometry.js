import { MemoryMapCacheWithAutomaticCalculation } from "../../helpers/cache/memoryMapCache";
import { DependencyNode } from "../../interfaces/dependencyNode";
import { GeometryObject } from "../../interfaces/geometryObject";
import { Plane as IPlane } from "../../interfaces/plane";
import { Point } from "../../interfaces/point";
import { Value } from "../../interfaces/value";
import { DependencyNodeWithCache } from "../dependencyNode";
import { PointFromTwoValues } from "../point/pointFromTwoValues";
import { ReadonlyValue } from "../value/readonlyValue";
import { SettableValue } from "../value/settableValue";

export class Plane extends DependencyNodeWithCache<{}, true> implements IPlane {
    private readonly objects: Set<GeometryObject> = new Set();

    constructor() {
        super({ dependencies: [], cache: new MemoryMapCacheWithAutomaticCalculation<{}>({}) });
    }

    public linkObject(object: (GeometryObject & DependencyNode)): void {
        this.registerDependency(object);
        this.objects.add(object);
    }

    public ulinkObject(object: GeometryObject): void {
        this.objects.delete(object);
    }

    [Symbol.iterator](): Iterator<GeometryObject> {
        return this.objects.values();
    }

    public createReadonlyValue(value: number): Value {
        return new ReadonlyValue({ plane: this, value });
    }

    public createValue(value: number): Value & SettableValue {
        return new SettableValue({ plane: this, value });
    }

    public createPointFromTwoValues(x: Value & DependencyNode, y: Value & DependencyNode): Point & GeometryObject & DependencyNode {
        return new PointFromTwoValues({ plane: this, x, y });
    }
}
