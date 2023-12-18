import { createPlane } from "../../../../src";
import { UnboundLine, intersection } from "../../../../src/geometryObjects";

describe("Unbound intersection of Line and Line", () => {
    const line1 = UnboundLine.fromEquation(1, 2, 3);
    const line2 = UnboundLine.fromEquation(4, 5, 6);
    const line3 = UnboundLine.fromEquation(3, 6, 5);

    test("Intersection of two parallel lines is a null object", () => {
        expect(intersection(line1, line3).objectType).toBe("null");
    });

    test("Intersection of two equal lines is a line", () => {
        expect(intersection(line1, line1).objectType).toBe("line");
    });

    test("Intersection of two lines is a point", () => {
        expect(intersection(line1, line2).objectType).toBe("point");
    });
    
});

describe("Bound intersection of Line and Line", () => {
    const plane = createPlane();
    const line1 = plane.createLineFromEquationAsNumbers(1, 2, 3);
    const line2 = plane.createLineFromEquationAsNumbers(4, 5, 6);
    const line3 = plane.createLineFromEquationAsNumbers(3, 6, 5);

    const intersectionObject1 = plane.constructIntersection(line1, line3);
    const intersectionObject2 = plane.constructIntersection(line1, line1);
    const intersectionObject3 = plane.constructIntersection(line1, line2);

    test("The null object is not virutal", () => {
        expect(intersectionObject1.states.none.virtual).toBe(false);
    });



    test("Intersection of two parallel lines is a null object", () => {
        expect(intersectionObject1.currentState.objectType).toBe("null");
        expect(intersectionObject1.states.none.exists()).toBe(true);
        expect(intersectionObject1.states.point.exists()).toBe(false);
        expect(intersectionObject1.states.line.exists()).toBe(false);
    });

    test("Intersection of two equal lines is a line", () => {
        expect(intersectionObject2.currentState.objectType).toBe("line");
        expect(intersectionObject2.states.none.exists()).toBe(false);
        expect(intersectionObject2.states.point.exists()).toBe(false);
        expect(intersectionObject2.states.line.exists()).toBe(true);
    });

    test("Intersection of two lines is a point", () => {
        expect(intersectionObject3.currentState.objectType).toBe("point");
        expect(intersectionObject3.states.none.exists()).toBe(false);
        expect(intersectionObject3.states.point.exists()).toBe(true);
        expect(intersectionObject3.states.line.exists()).toBe(false);
    });

});