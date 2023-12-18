import { intersection } from "../../../../src/geometryObjects";
import { UnboundPoint } from "../../../../src/geometryObjects/point";
import { createPlane } from "../../../../src";
describe("Unbound intersection of Point and Point", () => {
    const point1 = UnboundPoint.fromCoordinates(1, 2);
    const point2 = UnboundPoint.fromCoordinates(3, 4);

    test("Intersection of two different points is a null object", () => {
        expect(intersection(point1, point2).objectType).toBe("null");
    });

    test("Intersection of two equal points is a point", () => {
        expect(intersection(point1, point1).objectType).toBe("point");
    });

    test("Intersection of two equal points has the correct coordinates", () => {
        const intersectionObject = intersection(point1, point1);

        expect(intersectionObject.objectType).toBe("point");

        //@ts-ignore
        expect(intersectionObject.x).toBeCloseTo(1);
        //@ts-ignore
        expect(intersectionObject.y).toBeCloseTo(2);
    });
})

describe("Bound intersection of Point and Point", () => {
    const plane = createPlane();
    const point1 = plane.createPointFromCoordinates(1, 2);
    const a = plane.createValue(3);
    const b = plane.createValue(4);
    const point2 = plane.createPointFromTwoValues(a, b);

    const intersectionObject1 = plane.constructIntersection(point1, point2);
    const intersectionObject2 = plane.constructIntersection(point1, point1);

    test("Intersection of two different points is a null object", () => {
        expect(intersectionObject1.currentState.objectType).toBe("null");
        expect(intersectionObject1.states.none.exists()).toBe(true);
        expect(intersectionObject1.states.point.exists()).toBe(false);
        expect(intersectionObject1.states.none.virtual).toBe(false);
    });

    test("Intersection of two equal points is a point", () => {
        expect(intersectionObject2.currentState.objectType).toBe("point");
        expect(intersectionObject2.states.none.exists()).toBe(false);
        expect(intersectionObject2.states.point.exists()).toBe(true);
    });

    test("Intersection of two equal points has the correct coordinates", () => {
        //@ts-ignore
        expect(intersectionObject2.currentState.x).toBeCloseTo(1);
        //@ts-ignore
        expect(intersectionObject2.currentState.y).toBeCloseTo(2);
    });

    test("Intersection changes when the points change", () => {
        a.value = 1;
        b.value = 2;

        expect(intersectionObject1.currentState.objectType).toBe("point");

        a.value = 3;
        b.value = 4;

        expect(intersectionObject1.currentState.objectType).toBe("null");
    });

})