import { Plane } from "./geometryObjects";
import { Plane as IPlane } from "./interfaces";

/**
 * A factory function that creates a plane. All other objects are created from the plane.
 * The plane is the only object that is not created from another object.
 * @returns An object, that implements the {@link IPlane | Plane} interface, currently {@link Plane | Plane}.
 *
 * @group Object creation
 */
export function createPlane(): IPlane {
    return new Plane();
}
