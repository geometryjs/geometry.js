import { DependencyNode } from "../../interfaces/dependencyNode";
import { GeometryObject } from "../../interfaces/geometryObject";
import { Value } from "../../interfaces/value";
import { AbstractPoint } from "./abstractPoint";

export class PointFromTwoValues extends AbstractPoint {
    private readonly xValue: Value;
    private readonly yValue: Value;

    constructor(parameters: { x: (DependencyNode & Value); y: (DependencyNode  & Value) }) {
        super({ dependencies: [parameters.x, parameters.y] });
        const { x, y } = parameters;
        this.xValue = x;
        this.yValue = y;
    }

    protected getX(): number {
        return this.xValue.value;
    }

    protected getY(): number {
        return this.yValue.value;
    }
}
