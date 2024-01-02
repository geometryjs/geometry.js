import { GeometryObject } from "../../../src/geometryObjects/geometryObject";
import { Plane } from "../../../src/geometryObjects/plane/plane";
import { MemoryMapCacheWithAutomaticCalculation } from "../../../src/helpers/cache/memoryMapCache";
import { ObjectType } from "../../../src/interfaces";
import * as Interfaces from "../../../src/interfaces/runtimeInterfaces";
class ImleGO extends GeometryObject<{}> {
    public objectType: ObjectType = "interval";
    public virtual: boolean = true;
}
describe("GeometryObject", () => {
    const plane = new Plane();
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
        
        const geometryObject = new ImleGO({
            dependencies: [],
            cache: new MemoryMapCacheWithAutomaticCalculation<{}>({}),
            implementedInterfaces: interfaces,
            plane
        });

        const implementedInterfaces = [...geometryObject.getImplementedInterfaces()];

        for (const expectedInterface of interfaces) {
            expect(implementedInterfaces).toContain(expectedInterface);
        }

    });

    test("info", () => {
        const geometryObject = new ImleGO({
            dependencies: [],
            cache: new MemoryMapCacheWithAutomaticCalculation<{}>({}),
            implementedInterfaces: Interfaces.Plane,
            plane
        });

        const info = geometryObject.info;

        expect(info.implementedInterfaces).toBe(geometryObject.getImplementedInterfaces());
        expect(info.canCauseUpdate).toBe(false);
    });
});
