
namespace GeometryJS {
    /**
     * URL for the github repository of the library
     */
    const githubURL = "https://github.com/geometryjs/geometry.js";
    //! 2D
    /**
     * Class describing a 2D plane.
     */
    export class Plane {
        readonly type = "Plane";
        /**
         * All the objects linked to this plane
         */
        readonly objects: Array<Base> = [];
        /**
         * Checks if an object is linked to this plane
         * @param object The object
         */
        public isLinked(object: Base): boolean {
            return this.objects.includes(object) && object.plane == this;
        }
        /**
         * Relinks the object to another plane
         * @param object The object
         * @param secondPlane new plane
         */
        public relink(object: Base, secondPlane: Plane): typeof object {
            const i = this.objects.indexOf(object);
            if (i === -1) return object;
            this.objects.splice(i, 1);
            secondPlane.link(object);
            return object;
        }
        /**
         * Links an object the this plane
         * @param object The object
         */
        public link(object: Base): typeof object {
            if (!this.objects.includes(object)) this.objects.push(object);
            object.plane = this;
            return object;
        }
        /**
         * Creates a movable point on in this plane and links it to it
         * @param x The x coordinate
         * @param y The y coordinate
         * @returns The created Point
         */
        createPoint(x: number, y: number): Point {
            const p = new Point(this, x, y);
            this.link(p);
            return p;
        }
    }
    //! Base
    export abstract class Base {
        public abstract plane: Plane;
        readonly type: string;
        constructor() {
            this.type = this.constructor.name;
        }
        /**
         * Checks if the two objects represent the same thing
         * @param object The second object
         * @returns 
         */
        abstract equals(object: this): boolean;

        abstract dist(): number;
        abstract dist(point: PointBase): number;

        /**
         * Checks, whether this object intersects a Point
         * @param point The Point to calculate the intersect with
         */
        abstract intersects(point: PointBase): boolean;

        /**
         * Calculates all the intersections between this object and a Point
         * @param point The Point to calculate the intersections with
         */
        abstract getIntersections(point: PointBase): [PointBase] | [];
    }
    //! Points
    /**
     * Point base class
     */
    export abstract class PointBase extends Base {

        abstract get x(): number;

        abstract get y(): number;

        /**
         * Returns the distance from the origin [0, 0]
         */
        dist(): number;
        /**
         * Returns the distance between two points
         * @param point The second point
         */
        dist(point: PointBase): number;
        /**
         * Returns the distance between this point and another object
         * @param object The secondary object
         */
        dist(object?: PointBase): number {
            if (!object) return Math.sqrt(this.x * this.x + this.y * this.y);
            if (object instanceof GeometryJS.PointBase) {
                const dx = object.x - this.x;
                const dy = object.y - this.y;
                return Math.sqrt(dx * dx + dy * dy);
            }
            throw new InvalidArgumentError("undefined | Base", object);
        }
        equals(object: PointBase): boolean {
            if (object instanceof PointBase) return object.x === this.x && object.y === this.y;
            throw new InvalidArgumentError("PointBase", object);
        }
        intersects(point: PointBase): boolean;
        intersects(other: Base): boolean {
            if (other instanceof PointBase) return this.equals(other);
            throw new InvalidArgumentError("Base", other);
        }

        getIntersections(other: PointBase): [PointBase] | [];
        getIntersections(other: Base): [PointBase] | [] {
            if (other instanceof PointBase) return this.equals(other) ? [this] : [];
            throw new InvalidArgumentError("Base", other);
        }
    }

    /**
     * A class representing a freely movable point
     */
    export class Point extends PointBase {
        public plane: Plane;
        protected _x: number
        protected _y: number
        constructor(plane: Plane, x: number, y: number) {
            super();
            this.plane = plane;
            this._x = x;
            this._y = y;
        }

        get x(): number { return this._x; }
        set x(value: number) { this._x = value; }

        get y(): number { return this._y; }
        set y(value: number) { this._y = value; }
    }
    //! Lines
    /**
     * Line base class
     */
    export abstract class LineBase extends Base {
        
    }
    export class Line extends LineBase {
        public plane: Plane;
        constructor(a: PointBase, b: PointBase) {
            super();
            if (a.plane !== b.plane) throw new PlaneError(a.plane, b.plane); 
            this.plane = a.plane; 
        }
    }

    //! Errors 
    /**
     * A generic GeometryJS Error
     */
    export class Error extends window.Error {
        /**
         * Date telling you, when the error occurred.
         */
        public date: Date;
        constructor(message: string) {
            super(message);

            if (window.Error.captureStackTrace as any) {
                window.Error.captureStackTrace(this, Error);
            }
            this.name = "Error";
            this.date = new Date();
        }

        toString(): string {
            return `GeometryJS ${this.name} at ${this.date.getHours()}:${this.date.getMinutes()}:${this.date.getSeconds()}.${this.date.getMilliseconds()}.`;
        }
        toJSON(): {
            name: string,
            date: number
        } {
            return {
                name: this.name,
                date: this.date.getTime()
            }
        }
    }
    export class InvalidArgumentError extends Error {
        readonly expectedType: string;
        readonly actualType: string;
        constructor(expectedType: string, actualType: string | any) {
            if (actualType?.type) actualType = actualType.type;
            else if (typeof actualType != "string") actualType = typeof actualType;
            super(`Invalid argument type. Expected '${expectedType}' but got '${actualType}'`);

            if (window.Error.captureStackTrace as any) {
                window.Error.captureStackTrace(this, InvalidArgumentError);
            }

            this.name = "InvalidArgumentError";
            this.expectedType = expectedType;
            this.actualType = actualType;
        }
    }
    export class NotImplementedError extends Error {
        constructor(feature: string) {
            super(`${feature} has not been yet implemented. For more information visit ${githubURL}.`);

            if (window.Error.captureStackTrace as any) {
                window.Error.captureStackTrace(this, InvalidArgumentError);
            }

            this.name = "NotImplementedError";
        }
    }
    export class PlaneError extends Error {
        readonly planes: Array<Plane>;
        constructor(...planes: Array<Plane>) {
            super(`Unable to perform this action on objects on different planes.`);

            if (window.Error.captureStackTrace as any) {
                window.Error.captureStackTrace(this, InvalidArgumentError);
            }
            this.planes = planes;
            this.name = "PlaneError";
        }
    }
    //! Helpers
    namespace helpers {
        export namespace Intersects {

        }
        export namespace GetIntersections {

        }
    }
}