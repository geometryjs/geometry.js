import { createPlane } from "../../../src";
import { UnboundLine, UnboundPoint } from "../../../src/geometryObjects"
import { NonVirtualObject } from "../../../src/interfaces"
import { Derived, Foundational } from "../../../src/procedures";

describe("equals", () => {
    const plane = createPlane();
    const objects: NonVirtualObject[][] = [
        [plane],
        [UnboundPoint.fromCoordinates(1, 2), plane.createPointFromCoordinates(1, 2)],
        [UnboundPoint.fromCoordinates(2, 2), plane.createPointFromCoordinates(2, 2)],
        [UnboundLine.fromEquation(1, 2, 3), plane.createLineFromEquationAsNumbers(1, 2, 3), UnboundLine.fromEquation(2, 4, 6)],
        [UnboundLine.fromEquation(5, 2, 3), plane.createLineFromEquationAsNumbers(5, 2, 3), UnboundLine.fromEquation(10, 4, 6)],
    ]

    for (const objectType of objects) {
        for (const object of objectType) {
            for (const otherEqualObject of objectType) {
                test(`Object ${JSON.stringify(object)} equals object ${JSON.stringify(otherEqualObject)}`, () => {
                    expect(object.equals(otherEqualObject)).toBe(true);
                });
            }
            for (const otherObjectTypes of objects) {
                if (otherObjectTypes === objectType) continue;
                for (const otherObject of otherObjectTypes) {
                    test(`Object of type ${JSON.stringify(object)} does not equal object of type ${JSON.stringify(otherObject)}`, () => {
                        expect(object.equals(otherObject)).toBe(false);
                    });
                }
            }
        }
    }
    
})