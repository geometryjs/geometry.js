import { DependencyNode, DependencyNodeWithCache } from "../../src/geometryObjects/dependencyNode";
import { Some } from "../../src/helpers/types/general";
import { IterableCache } from "../../src/interfaces/cache";

class DependencyNodeWithUpdateFuncition extends DependencyNode {
    public readonly updateFunction: jest.Mock<undefined, [], any>;
    constructor(dependencies: Iterable<DependencyNodeWithUpdateFuncition>, updateFunction: jest.Mock<undefined, [], any>) {
        super(dependencies);
        this.updateFunction = updateFunction;
    }
    public update(): void {
        this.updateFunction();
        super.update();
    }

    get dependencies(): Iterable<DependencyNodeWithUpdateFuncition> {
        return super.dependencies as Iterable<DependencyNodeWithUpdateFuncition>;
    }
    get dependants(): Iterable<DependencyNodeWithUpdateFuncition> {
        return super.dependants as Iterable<DependencyNodeWithUpdateFuncition>;
    }

    get deepDependencies(): Iterable<DependencyNodeWithUpdateFuncition> {
        return super.deepDependencies as Iterable<DependencyNodeWithUpdateFuncition>;
    }
    get deepDependants(): Iterable<DependencyNodeWithUpdateFuncition> {
        return super.deepDependants as Iterable<DependencyNodeWithUpdateFuncition>;
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
        const dependants = [new DependencyNodeWithUpdateFuncition([root], jest.fn()), new DependencyNodeWithUpdateFuncition([root], jest.fn()), new DependencyNodeWithUpdateFuncition([root], jest.fn())];

        for (const dependant of dependants) {
            expect(root.dependants).toContain(dependant);
        }
    });
    test("dependants register dependencies", () => {
        for (const dependant of root.dependants) {
            expect(dependant.dependencies).toContain(root);
        }
    });
    test("update updates direct dependants", () => {
        root.update();

        for (const node of [root, ...root.dependants]) {
            expect(node.updateFunction).toBeCalled();
            node.updateFunction.mockClear();
        }
    });

    test("second level dependants", () => {
        for (const dependant of root.dependants) {
            const secondLevelDependants = [new DependencyNodeWithUpdateFuncition([dependant], jest.fn()), new DependencyNodeWithUpdateFuncition([dependant], jest.fn()), new DependencyNodeWithUpdateFuncition([dependant], jest.fn())];
            for (const secondLevelDependant of secondLevelDependants) {
                expect(dependant.dependants).toContain(secondLevelDependant);
            }
        }
    });

    test("deep dependants", () => {
        const deepDependants = [...root.deepDependants];
        for (const dependant of root.dependants) {
            expect(deepDependants).toContain(dependant);
            for (const secondLevelDependant of dependant.dependants) {
                expect(deepDependants).toContain(secondLevelDependant);
            }
        }
    });

    test("deep dependencies", () => {
        for (const dependant of root.dependants) {
            for (const secondDependant of dependant.dependants) {
                expect(secondDependant.deepDependencies).toContain(root);
                expect(secondDependant.deepDependencies).toContain(dependant);
            }
        }
    });

    test("deep update", () => {
        root.update();
        for (const dependant of [...root.deepDependants, root]) {
            expect(dependant.updateFunction).toBeCalled();
            dependant.updateFunction.mockClear();
        }
    });
});

class MockCache<Records extends Record<string, Some | null> = Record<string, Some | null>> implements IterableCache<Records> {
    public clearAll = jest.fn();
    public clearValue = jest.fn();
    public hasValue = jest.fn();
    public readValue = jest.fn();
    public saveValue = jest.fn();
    public [Symbol.iterator] = jest.fn();
}

describe("DependencyNodeWithCache", () => {
    const rootCache = new MockCache();
    const root = new DependencyNodeWithCache([], rootCache);

    test("update clears cache", () => {
        root.update();
        expect(rootCache.clearAll).toBeCalled();
        rootCache.clearAll.mockClear();
    });

    const depCaches = [new MockCache(), new MockCache(), new MockCache()];
    test("registering dependants", () => {
        const dependants = [new DependencyNodeWithCache([root], depCaches[0]!), new DependencyNodeWithCache([root], depCaches[1]!), new DependencyNodeWithCache([root], depCaches[2]!)];

        for (const dependant of dependants) {
            expect(root.dependants).toContain(dependant);
        }
    });

    test("update triggers all cache deletion", () => {
        root.update();
        for (const cache of depCaches) {
            expect(cache.clearAll).toBeCalled();
            cache.clearAll.mockClear();
        }
    });

});
