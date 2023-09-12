import { GeometryObject } from "../../src/geometryObjects/geometryObject";
import { MemoryMapCacheWithAutomaticCalculation } from "../../src/helpers/cache/memoryMapCache";
import * as Interfaces from "../../src/interfaces";
describe("GeometryObject", () => {
    test.concurrent.each([
        [Interfaces.Plane],
        [Interfaces.Cache],
        [Interfaces.DependencyNode],
        [Interfaces.IterableCache],
        [Interfaces.Evaluatable],
        [Interfaces.GeometryObject],
        [Interfaces.Procedure],
        [Interfaces.Transformer],
        [[...Interfaces.Evaluatable, ...Interfaces.Procedure]],
        [[...Interfaces.Evaluatable, ...Interfaces.Transformer]],
        [[...Interfaces.Evaluatable, ...Interfaces.Procedure, ...Interfaces.Transformer]],
        [[...Interfaces.Evaluatable, ...Interfaces.Procedure, ...Interfaces.Transformer, ...Interfaces.IterableCache]],
        [[...Interfaces.Evaluatable, ...Interfaces.Procedure, ...Interfaces.Transformer, ...Interfaces.IterableCache, ...Interfaces.Cache]],
        [[...Interfaces.Evaluatable, ...Interfaces.Procedure, ...Interfaces.Transformer, ...Interfaces.IterableCache, ...Interfaces.Cache, ...Interfaces.DependencyNode]],
        [[...Interfaces.Evaluatable, ...Interfaces.Procedure, ...Interfaces.Transformer, ...Interfaces.IterableCache, ...Interfaces.Cache, ...Interfaces.DependencyNode, ...Interfaces.GeometryObject]],
        [[...Interfaces.Evaluatable, ...Interfaces.Procedure, ...Interfaces.Transformer, ...Interfaces.IterableCache, ...Interfaces.Cache, ...Interfaces.DependencyNode, ...Interfaces.GeometryObject, ...Interfaces.Plane]],
    ])("implementedInterfaces", (interfaces) => {
        const geometryObject = new GeometryObject<{}>({
            dependencies: [],
            cache: new MemoryMapCacheWithAutomaticCalculation<{}>({}),
            implementedInterfaces: interfaces,
        });

        const implementedInterfaces = [...geometryObject.getImplementedInterfaces()];

        for (const expectedInterface of interfaces) {
            expect(implementedInterfaces).toContain(expectedInterface);
        }

    });

    test("info", () => {
        const geometryObject = new GeometryObject<{}>({
            dependencies: [],
            cache: new MemoryMapCacheWithAutomaticCalculation<{}>({}),
            implementedInterfaces: Interfaces.Plane,
        });

        const info = geometryObject.info;

        expect(info.implementedInterfaces).toBe(geometryObject.getImplementedInterfaces());
        expect(info.canCauseUpdate).toBe(false);
    });
});
