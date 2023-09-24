
// import type { Point, GeometryObject as IGeometryObject, Line, DependencyNode, SingleParametricCurve, Plane, Evaluatable, Vector } from "../../interfaces";

// import { MemoryMapCacheWithAutomaticCalculation } from "../../helpers";
// import { GeometryObject } from "../geometryObject";
// import * as Interfaces from "../../interfaces/runtimeInterfaces";
// import { UnboundPoint } from "../point";
// import { UnboundVector } from "../vector/unbound";
// export abstract class AbstractLineFromTwoPoints extends GeometryObject<{point1: Point, point2: Point}> implements Line, IGeometryObject, DependencyNode, SingleParametricCurve, Evaluatable<number, Point> {
//     protected abstract getPoint1(): Point;
//     protected abstract getPoint2(): Point;

//     constructor(parameters: { dependencies: Iterable<DependencyNode>, plane: Plane }) {
//         super({
//             cache: new MemoryMapCacheWithAutomaticCalculation({
//                 point1: () => {
//                     return this.getPoint1();
//                 },
//                 point2: () => {
//                     return this.getPoint2();
//                 }
//             }),
//             implementedInterfaces: [...Interfaces.Line, ...Interfaces.SingleParametricCurve],
//             ...parameters
//         });
//     }

//     get arbitraryPoint1(): Point {
//         return this.cache.readValue("point1");
//     }

//     get arbitraryPoint2(): Point {
//         return this.cache.readValue("point2");
//     }

//     get directionalVector(): Vector {
//         return this.arbitraryPoint2.toVector().subtract(this.arbitraryPoint1.toVector());
//     }


// }
