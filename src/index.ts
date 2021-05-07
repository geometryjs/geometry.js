const DefaultError = Error as any;
namespace GeometryJS {
    /**
     * URL for the github repository of the library
     */
    const githubURL = "https://github.com/geometryjs/geometry.js";
    /**
     * Decimal precision used for float correction
     */
    const precision = 15;
    /**
     * Precision for round for results printed to the user. Does not affect any built in math.
     */
    const humanReadPrecision = 4;
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
        /**
         * Create a line based on two points 
         * @param a The first point
         * @param b The second point
         * @returns The created line
         */
        createLine(a: Point, b: Point): TwoPointLine {
            const l = new TwoPointLine(a, b);
            this.link(l);
            return l;
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
    }
    //! Points
    /**
     * Point base class
     */
    export abstract class Point extends Base {

        abstract get x(): number;
        get xRounded(): number { return round(this.x); }
        abstract get y(): number;
        get yRounded(): number { return round(this.y); }

        /**
         * Returns the distance from the origin [0, 0]
         */
        dist(): number;
        /**
         * Returns the distance between two points
         * @param point The second point
         */
        dist(point: Point): number;
        dist(line: Line): number;
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
            if (other instanceof Line) return helpers.Intersects.PointLine(this, other);
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
    export class PointOnLine extends Point {
        readonly line: Line;
        plane: Plane;
        _x: number;
        _y: number;
        constructor(line: Line, x: number, y: number) {
            super();
            this.line = line;
            this.plane = line.plane;
            this._x = x;
            this._y = y;
        }
        get x(): number { return this._x; }
        set y(value: number) {
            if (this._y == value) return;
            if (this.line.dy == 0) throw new ImpossibleAssignementError("You cannot change the x coordinate of point on a horizontal line.");
            const dy = this.line.a.y - this.line.b.y; // Line dx with sign
            const dx = this.line.a.x - this.line.b.x; // Line dy with sign
            const dyN = this.line.a.y - value; // Difference in y for new point and A
            const dr = dy / dyN; // Distance ratio
            const dxN = dx * dr; // Difference in x for new point and A
            this._x = this.line.a.x + dxN;
            this._y = value;
        }
        get y(): number { return this._y; }
        set x(value: number) {
            if (this._x == value) return;
            if (this.line.dx == 0) throw new ImpossibleAssignementError("You cannot change the x coordinate of point on a vertical line.");
            const dy = this.line.a.y - this.line.b.y; // Line dx with sign
            const dx = this.line.a.x - this.line.b.x; // Line dy with sign
            const dxN = this.line.a.x - value; // Difference in y for new point and A
            const dr = dx / dxN; // Distance ratio
            const dyN = dy * dr; // Difference in x for new point and A
            this._y = this.line.a.y + dyN;
            this._x = value;
        }
    }
    export class PerpendicularLinePointerPoint extends Point {
        plane: Plane;
        point: PointOnLine;
        line: Line;
        constructor(point: PointOnLine) {
            super();
            this.plane = point.plane;
            this.line = point.line;
            this.point = point;
        }
        get x(): number {
            const dy = this.point.y - this.line.a.y; // The dy for two points on the line
            return this.point.x + dy; // Due to triangles, dy for two line points and dx for this point and the point on line are equal
        }
        get y(): number {
            const dx = this.point.x - this.line.a.x; // The dx for two points on the line
            return this.point.y + dx; // Due to triangles, dx for two line points and dy for this point and the point on line are equal
        }
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
            if (other instanceof Line) return (this.a.equals(other.a) && this.b.equals(other.b) || this.a.equals(other.b) && this.b.equals(other.a))
                || this.isParallel(other) && this.dist(other.a) == 0;
            throw new InvalidArgumentError("Line", other);
        }
        dist(): number;
        dist(line: Line): number;
        dist(point: Point): number;
        dist(other?: Point | Line): number {
            if (other instanceof Line) return helpers.Distance.LineLine(other, this);
            if (other instanceof Point) return helpers.Distance.PointLine(other, this);
            throw new InvalidArgumentError("Base", other);
        }


        intersects(point: Point): boolean;
        intersects(line: Line): boolean;
        intersects(other: Point | Line): boolean {
            if (other instanceof Point) return helpers.Intersects.PointLine(other, this);
            if (other instanceof Line) return !this.isParallel(other);
            throw new InvalidArgumentError("Base", other);
        }
        /**
         * Checks if two lines are parallel
         * @param other The other line
         */
        isParallel(other: Line): boolean {
            return equals(this.dx / this.dy, other.dx / other.dy);
        }
        getPerpendicular(point: Point): PerpendicularLine {
            if (point.intersects(this)) {
                return new PerpendicularLine(new PointOnLine(this, point.x, point.y));
            }
            const ap = point.dist(this.a); // |AP|
            const bp = point.dist(this.b); // |BP|
            const ab = this.a.dist(this.b); // |AB|

            const abp = cosineTheoremAngle(bp, ab, ap); // |ABP|
            const pbd = Math.PI - abp; // |PBD|
            const bd = Math.cos(pbd) * bp; // |BD|

            const dr = bd / ab;
            const dx = dr * (this.b.x - this.a.x)
            const dy = dr * (this.b.y - this.a.y)

            const x = this.b.x + dx;
            const y = this.b.y + dy;
            return new PerpendicularLine(new PointOnLine(this, x, y));
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
    export class PerpendicularLine extends Line {
        readonly plane: Plane;
        line: Line;
        point: PointOnLine;
        pointerPoint: PerpendicularLinePointerPoint;
        constructor(pointOnLine: PointOnLine) {
            super();
            this.plane = pointOnLine.plane;
            this.line = pointOnLine.line;
            this.point = pointOnLine;
            this.pointerPoint = new PerpendicularLinePointerPoint(this.point);
        }

        get a(): PointOnLine { return this.point; }
        set a(value: PointOnLine) {
            if (value.line != this.line) throw new ImpossibleAssignementError("Cannot change point on line to a different line.")
            this.point = value;
        }

        get b(): PerpendicularLinePointerPoint { return this.pointerPoint };
    }
    //! Errors 
    /**
     * A generic GeometryJS Error
     */
    export class Error extends DefaultError {
        /**
         * Date telling you, when the error occurred.
         */
        public date: Date;
        constructor(message: string) {
            super(message);

            if (DefaultError.captureStackTrace as any) {
                DefaultError.captureStackTrace(this, Error);
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

            if (DefaultError.captureStackTrace as any) {
                DefaultError.captureStackTrace(this, InvalidArgumentError);
            }

            this.name = "InvalidArgumentError";
            this.expectedType = expectedType;
            this.actualType = actualType;
        }
    }
    export class NotImplementedError extends Error {
        constructor(feature: string) {
            super(`${feature} has not been yet implemented. For more information visit ${githubURL}.`);

            if (DefaultError.captureStackTrace as any) {
                DefaultError.captureStackTrace(this, InvalidArgumentError);
            }

            this.name = "NotImplementedError";
        }
    }
    export class PlaneError extends Error {
        readonly planes: Array<Plane>;
        constructor(...planes: Array<Plane>) {
            super(`Unable to perform this action on objects on different planes.`);

            if (DefaultError.captureStackTrace as any) {
                DefaultError.captureStackTrace(this, InvalidArgumentError);
            }
            this.planes = planes;
            this.name = "PlaneError";
        }
    }
    export class ImpossibleAssignementError extends Error {
        description: string;
        constructor(description: string, msg = "") {
            super(`Cannot assign the value to this property. ${msg}`);

            if (DefaultError.captureStackTrace as any) {
                DefaultError.captureStackTrace(this, InvalidArgumentError);
            }
            this.description = description;
            this.name = "ImpossibleAssignementError";
        }
    }
    //! Helpers
    export namespace helpers {
        export namespace Intersects {
            export function PointLine(point: Point, line: Line): boolean {
                return onOneLine(point.dist(line.a), point.dist(line.b), line.b.dist(line.a));
            }
        }
        export namespace GetIntersections {
            export function LineLine(l1: Line, l2: Line): [Line] | [Point] | [] {
                if (l1.equals(l2)) return [l1];
                if (l1.isParallel(l2)) return [];
                if (l1.plane !== l2.plane) throw new PlaneError(l1.plane, l2.plane);
                const [a, b] = [l1.a, l1.b].sort((a, b) => a.dist(l2) - b.dist(l2)); // Point B is the closer point to the second line
                const [d, c] = [l2.a, l2.b].sort((a, b) => a.dist(l1) - b.dist(l1)); // Point D is the closer point to the first line

                const bd = b.dist(d); // |BD|
                const cd = c.dist(b); // |CD|
                const bc = c.dist(b); // |BC| 
                const ab = a.dist(b); // |AB|
                const ad = a.dist(d); // |AD|

                const cdb = cosineTheoremAngle(bd, cd, bc); // |CDB|
                const abd = cosineTheoremAngle(ab, bd, ad); // |ABD|

                const de = sineTheorem(bd, - Math.PI + cdb + abd, Math.PI - abd); // |DE|

                const dr = de / cd; // Distance ratio
                const dx = dr * (d.x - c.x);
                const dy = dr * (d.y - c.y);

                const x = d.x + dx;
                const y = d.y + dy;

                return [l1.plane.createPoint(x, y)];
            }
        }
        export namespace Distance {
            export function PointLine(point: Point, line: Line): number {
                if (point.intersects(line)) return 0;
                const ap = point.dist(line.a); // |AP|
                const bp = point.dist(line.b); // |BP|
                const ab = line.a.dist(line.b); // |AB|

                const abp = cosineTheoremAngle(bp, ab, ap); // |ABP|
                const pbd = Math.PI - abp; // |PBD|
                const bd = Math.cos(pbd) * bp; // |BD|

                const dr = bd / ab;
                const dx = dr * (line.b.x - line.a.x)
                const dy = dr * (line.b.y - line.a.y)

                const x = line.b.x + dx;
                const y = line.b.y + dy;

                return Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
            }
            export function LineLine(l1: Line, l2: Line): number {
                if (l1.equals(l2)) return 0;
                if (!l1.isParallel(l2)) return 0;
                return helpers.Distance.PointLine(l1.a, l2);
            }
        }
    }
    //! Drawers
    /**
     * An sbtract class representing a drawer and all the methods extending classes need to implement
     */
    export abstract class Drawer {
        /**
         * A function that draws a line, that goes thru point A and B
         * @param ax X coordinate of the A point
         * @param ay Y coordinate of the A point
         * @param bx X coordinate of the B point
         * @param by Y coordinate of the B point
         */
        abstract line(ax: number, ay: number, bx: number, by: number): void;
        /**
         * A function that draws a point from it's X and Y coordinates
         * @param x The X coordinate
         * @param y The Y coordinate
         */
        abstract point(x: number, y: number): void;
        /**
         * A function that draws a circle with a radius and a center
         * @param x The X coordinate of the center of the circle
         * @param y The Y coordinate of the center of the circle
         * @param radius The radius of the circle
         */
        abstract circle(x: number, y: number, radius: number): void;
        /**
         * A function that draws a ray, that ends in the first point a whos direction is given by the second point
         * @param ax The X coordinate of the ending point of the ray
         * @param ay The Y coordinate of the ending point of the ray
         * @param bx The X coordinate of a second point of the ray
         * @param by The Y coordinate of a second point of the ray
         */
        abstract ray(ax: number, ay: number, bx: number, by: number): void;
        /**
         * A function that draws a segemnt, that starts in the point A and ends in the point B
         * @param ax X coordinate of the A point
         * @param ay Y coordinate of the A point
         * @param bx X coordinate of the B point
         * @param by Y coordinate of the B point
         */
        abstract segment(ax: number, ay: number, bx: number, by: number): void;
        /**
         * A function that graphs a continuous mathematical function 
         * @param func The continuous mathematical function
         */
        abstract continuousFunc(func: (x: number) => number): void;
        /**
         * A function that graphs a discontinuous mathematical function
         * @param func The discontinuous mathematical function
         */
        abstract discontinuousFunc(func: (x: number) => number): void;

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
     * A function that rounds a number to a sensible precision for human reading. 
     * @param a The number to round
     */
    export function round(a: number): number {
        return Number(a.toPrecision(humanReadPrecision));
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
        return Math.acos((a * a + b * b - c * c) / (2 * a * b));
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
    /**
     * A function that calculates the sine theorem
     * @param a The length of the side a
     * @param alpha Angle alpha
     * @param beta Angle beta
     * @returns Length of the side b
     */
    export function sineTheorem(a: number, alpha: number, beta: number): number {
        return a * (Math.sin(beta) / Math.sin(alpha));
    }
}