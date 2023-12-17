import { Line, NullObject, Point } from "../../../interfaces";
import { Derived } from "../../../procedures";
import { UnboundLine } from "../../line";
import { UnboundNullObject } from "../../nullObject";
import { UnboundPoint } from "../../point";

export function intersectionLineLine(line1: Line, line2: Line): Line | Point | NullObject {
    const result = Derived.LINE_LINE_INTERSECTION.perform({
        line1,
        line2
    });

    switch (result.objectType) {
        case "line":
            return UnboundLine.fromEquation(result.intersection.a, result.intersection.b, result.intersection.c);
        case "point":
            return UnboundPoint.fromCoordinates(result.intersection.x, result.intersection.y)
        case "null":
            return UnboundNullObject.createNonVirtual();
    }
}