import { NullObject, Point } from "../../../interfaces";
import { UnboundNullObject } from "../../nullObject";
import { UnboundPoint } from "../../point";

export function intersectionPointPoint(point1: Point, point2: Point): Point | NullObject {
    if (point1.equals(point2)) return UnboundPoint.fromPoint(point1);
    return UnboundNullObject.createNonVirtual();
}