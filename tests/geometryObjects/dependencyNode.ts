import { DependencyNode } from "../../src/geometryObjects/dependencyNode";

describe("DependencyNode", () => {
    const root = new DependencyNodeWithUpdateFuncition([], jest.fn());
    
});

class DependencyNodeWithUpdateFuncition extends DependencyNode{
    public readonly updateFunction: () => void;
    constructor(dependencies: Iterable<DependencyNode>, updateFunction: () => void) {
        super(dependencies);
        this.updateFunction = updateFunction;
    }
    public update(): void {
        this.updateFunction();
        super.update();
    }
}