
namespace GeometryJS {
    /**
     * URL for the github repository of the library
     */
    const githubURL = "https://github.com/geometryjs/geometry.js";
    /**
     * Decimal precision used for float correction
     */
    const precision = 15;
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
        createPoint(x: number, y: number): FreePoint {
            const p = new FreePoint(this, x, y);
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
        abstract dist(point: Point | Line): number;

        /**
         * Checks, whether this object intersects a Point
         * @param other The object to calculate the intersect with
         */
        abstract intersects(other: Point | Line): boolean;

        /**
         * Calculates all the intersections between this object and a Point
         * @param other The object to calculate the intersections with
         */
        abstract getIntersections(other: Point | Line): Array<Base>;
    }
    //! Points
    /**
     * Point base class
     */
    export abstract class Point extends Base {

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
        dist(point: Point): number;
        /**
         * Returns the distance between this point and another object
         * @param object The secondary object
         */
        dist(object?: Point | Line): number {
            if (!object) return Math.sqrt(this.x * this.x + this.y * this.y);
            if (object instanceof GeometryJS.Point) {
                const dx = object.x - this.x;
                const dy = object.y - this.y;
                return Math.sqrt(dx * dx + dy * dy);
            }
            if (object instanceof Line) return helpers.Distance.PointLine(this, object);
            throw new InvalidArgumentError("undefined | Base", object);
        }
        equals(object: Point): boolean {
            if (object instanceof Point) return equals(object.x, this.x) && equals(object.y, this.y);
            throw new InvalidArgumentError("Point", object);
        }


        intersects(point: Line): boolean;
        intersects(point: Point): boolean;
        intersects(other: Point | Line): boolean {
            if (other instanceof Point) return this.equals(other);
            if (other instanceof Line) throw new NotImplementedError("Line - Point intersect");
            throw new InvalidArgumentError("Base", other);
        }


        getIntersections(other: Line): [Point] | [];
        getIntersections(other: Point): [Point] | [];
        getIntersections(other: Point | Line): [Point] | [] {
            if (other instanceof Point) return this.equals(other) ? [this] : [];
            if (other instanceof Line) throw new NotImplementedError("Line - Point intersect");
            throw new InvalidArgumentError("Base", other);
        }
    }

    /**
     * A class representing a freely movable point
     */
    export class FreePoint extends Point {
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
    export abstract class Line extends Base {
        abstract get a(): Point;
        abstract get b(): Point;

        get dx(): number {
            return Math.abs(this.a.x - this.b.x);
        }
        get dy(): number {
            return Math.abs(this.a.y - this.b.y);
        }
        equals(other: Line): boolean {
            if (other instanceof Line) return (this.a.equals(other.a) && this.b.equals(other.b) || this.a.equals(other.b) && this.b.equals(other.a));
            throw new InvalidArgumentError("Line", other);
        }
        dist(): number;
        dist(other?: Point | Line): number {
            if (other instanceof Line) helpers.Distance.PointLine(other.a, this);
            if (other instanceof Point) helpers.Distance.PointLine(other, this);
            throw new InvalidArgumentError("Base", other);
        }

        isParalel(other: Line): boolean {
            return equals(this.dx / this.dy, other.dx / other.dy);
        }
    }
    export class TwoPointLine extends Line {
        protected _a: Point;
        protected _b: Point;

        public plane: Plane;
        constructor(a: Point, b: Point) {
            super();
            if (a.plane !== b.plane) throw new PlaneError(a.plane, b.plane);
            this.plane = a.plane;
            this._a = a;
            this._b = b;
        }

        get a(): Point { return this._a; }
        set a(value: Point) { this._a = value; }

        get b(): Point { return this._b; }
        set b(value: Point) { this._b = value; }

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
        export namespace Distance {
            export function PointLine(point: Point, line: Line): number {
                const ap = point.dist(line.a); // |AP|
                const bp = point.dist(line.b); // |BP|
                const ab = line.a.dist(line.b); // |AB|

                const abp = cosineTheoremAngle(bp, ab, ap); // |ABP|
                const pbd = Math.PI - abp; // |PBD|
                const bd = Math.cos(pbd) * bp; // |BD|

                const angleAB = Math.atan2(line.a.y - line.b.y, line.a.x - line.b.x);
                const dx = Math.cos(angleAB) * bd;
                const dy = Math.sin(angleAB) * bd;

                const x = line.b.x + dx;
                const y = line.b.y + dy;

                return Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
            }
        }
    }
    /**
     * Compares two numbers according to set decimal precision
     * @param a First number
     * @param b Second number
     */
    export function equals(a: number, b: number): boolean {
        return a.toPrecision(precision) === b.toPrecision(precision);
    }
    /**
     * A function that calculates the cosine theorem
     * @param a Length of one side
     * @param b Length of the other side
     * @param angle The angle between the two sides
     * @returns Length of the third side
     */
    export function cosineTheorem(a: number, b: number, angle: number): number {
        return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(angle));
    }
    /**
     * A function that calculates the cosine theorem
     * @param a Length of the one side
     * @param b Length of the second side
     * @param c Length of the third side
     * @returns Size of the angle opposed to the side c
     */
    export function cosineTheoremAngle(a: number, b: number, c: number): number {
        return Math.acos((a * a + b * b - c * c) / 2 * a * b);
    }
    /**
     * A function, that determines, whether or not three points lay on one line based on the distance between them
     * @param ab Distance between A and B |AB|
     * @param bc Distance between B and C |BC|
     * @param ca Distance between C and A |CA|
     * @return Whether all the points lay on the same line
     */
    export function onOneLine(ab: number, bc: number, ca: number): boolean {
        const s = [ab, bc, ca].sort((a, b) => a - b);
        return equals(s[2], s[1] + s[0]);
    }
}