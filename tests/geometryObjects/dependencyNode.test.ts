import { DependencyNode } from "../../src/geometryObjects/dependencyNode";

class DependencyNodeWithUpdateFuncition extends DependencyNode {
    public readonly updateFunction: jest.Mock<undefined, [], any>;
    constructor(dependencies: Iterable<DependencyNode>, updateFunction: jest.Mock<undefined, [], any>) {
        super(dependencies);
        this.updateFunction = updateFunction;
    }
    public update(): void {
        this.updateFunction(); 
        super.update();
    }
}


describe("DependencyNode", () => {
    const root = new DependencyNodeWithUpdateFuncition([], jest.fn());

    test("update calls update function", () => {
        root.update();
        expect(root.updateFunction).toBeCalled();
        root.updateFunction.mockClear();
    });

    test("registering dependants", () => {
        const dependants = [
            new DependencyNodeWithUpdateFuncition([], jest.fn()),
            new DependencyNodeWithUpdateFuncition([], jest.fn()),
            new DependencyNodeWithUpdateFuncition([], jest.fn()),
        ]
        for (const dependant of dependants) {
            root.registerDependant(dependant);
        }

        for (const dependant of dependants) {
            expect(root.dependants).toContain(dependant);
        }
    });

});
