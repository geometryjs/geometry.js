import { TypeError } from "../errors/typeError";
import { ObjectWithType } from "../interfaces";
import { isEqualityOptions } from "../validators";
import { EqualityOptions } from "./equality/float";

/**
 * Throws an error if the given object is not a valid equality options object
 * @param object An unknown object
 * @param id The unique identifier of the place from which this function is called. All assertors must have the same id
 * 
 * @throws An error if the given object is not a valid equality options object
 * @groupt Assertors
 */
export function assertIsEqualityOptions(object: unknown, id: string): asserts object is EqualityOptions {
    if (!isEqualityOptions(object)) throw new TypeError({
        id: "AssEqOpt-" + id,
        message: "The given object must be an equality options object",
        expectedType: "EqualityOptions",
        actualInstance: object,
    })
}