import type { Plane as IPlane } from "./interfaces";

import { Plane } from "./geometryObjects";

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
