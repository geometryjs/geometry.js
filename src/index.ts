import { isThisTypeNode } from "typescript";

const DefaultError = Error as typeof Error & { captureStackTrace: (error: Error, construct: any) => void };
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
        /**
         * Creates a ray based on two points
         * @param originPoint The ending point of the ray   
         * @param pointerPoint The point, that determines the direction of the ray
         * @return The created ray
         */
        createRay(originPoint: Point, pointerPoint: Point): Ray {
            return new TwoPointRay(originPoint, pointerPoint);
        }
    }
    export abstract class DependencyNode {
        constructor(dependencies: Array<DependencyNode>) {
            for (const depend of dependencies) this.addDependency(depend);
        }
        /**
         * Array of all dependencies of this Base object 
         */
        readonly dependencies: Array<DependencyNode> = [];
        /**
         * Array of all dependant objects of this Base object
         */
        readonly dependants: Array<DependencyNode> = [];

        addDependency(dependency: DependencyNode): void {
            this.dependencies.push(dependency);
            dependency.addDependant(this);
        }
        addDependant(dependant: DependencyNode): void {
            this.dependants.push(dependant);
        }
        resetDependencies(newDependingDependencies?: Array<DependencyNode>): void {
            for (const dependency of this.dependencies) {
                dependency.removeDependant(this);
            }
            this.dependencies.splice(0, this.dependencies.length);
            if (newDependingDependencies) {
                for (const d of newDependingDependencies) this.addDependency(d);
            }
        }
        removeDependant(dependant: DependencyNode): void {
            const index = this.dependants.indexOf(dependant);
            if (index !== -1) this.dependants.splice(index, 1);
        }
        update(): void {
            this.deleteCache();
            for (const dependant of this.dependants) dependant.update();
        }
        protected abstract deleteCache(): void;
    }
    //! Base
    export abstract class Base extends DependencyNode {
        public abstract plane: Plane;
        abstract readonly analyticInterface: AnalyticInterface<Base>;
        readonly type: string;
        constructor(dependencies: Array<DependencyNode>) {
            super(dependencies);
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
        abstract intersects(other: Point | Line | Ray): boolean;

    }
    //! Points
    /**
     * Point base class
     */
    export abstract class Point extends Base {

        protected cache: Map<string, number> = new Map<string, number>();

        abstract getX(): number;
        get xRounded(): number { return round(this.x); }
        abstract getY(): number;
        get yRounded(): number { return round(this.y); }

        get x(): number {
            const cx = this.cache.get("x");
            if (cx) return cx;
            this.cache.set("x", this.getX());
            return <number>this.cache.get("x");
        }
        get y(): number {
            const cy = this.cache.get("y");
            if (cy) return cy;
            this.cache.set("y", this.getY());
            return <number>this.cache.get("y");
        }

        public readonly analyticInterface: PointAnalyticInterface = new PointAnalyticInterface(this);
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
        intersects(other: Point | Line | Ray): boolean {
            if (other instanceof Point) return this.equals(other);
            if (other instanceof Line) return helpers.Intersects.PointLine(this, other);
            if (other instanceof Ray) throw new NotImplementedError("Ray intersects");
            throw new InvalidArgumentError("Base", other);
        }
        deleteCache(): void {
            this.cache.clear();
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
            super([]);
            this.plane = plane;
            this._x = x;
            this._y = y;
        }

        getX(): number { return this._x; }
        set x(value: number) { this._x = value; this.update(); }

        getY(): number { return this._y; }
        set y(value: number) { this._y = value; this.update(); }

        // Needed because of stupid set get behaviour
        get x(): number { return super.x; }
        get y(): number { return super.y; }
    }
    export class PointOnLine extends Point { // TODO: fix total bullshit, wont update with line
        readonly line: Line;
        /**
         * Distance to the a point divided by the distance between A and B
         */
        protected aDist!: number;
        plane: Plane;

        constructor(line: Line, x: number, y: number) {
            super([line]);
            this.line = line;
            this.plane = line.plane;
            if (x) this.x = x;
            if (y) this.y = y;
        }
        getX(): number {
            return this.line.a.x + this.line.dx * this.aDist;
        }
        set y(value: number) {
            if (this.line.dy == 0) throw new ImpossibleAssignementError("You cannot change the x coordinate of point on a horizontal line.");
            const dy = this.line.a.y - this.line.b.y; // Line dx with sign
            const dx = this.line.a.x - this.line.b.x; // Line dy with sign
            const dyN = this.line.a.y - value; // Difference in y for new point and A
            const dr = dy / dyN; // Distance ratio
            const dxN = dx * dr; // Difference in x for new point and A
            const x = this.line.a.x + dxN;
            const y = value;

            this.aDist = Math.sqrt((this.line.a.x - x) ** 2 + (this.line.a.y - y) ** 2) / this.line.a.dist(this.line.b);
            this.update();
        }
        getY(): number {
            return this.line.a.y + this.line.dy * this.aDist;
        }
        set x(value: number) {
            if (this.line.dx == 0) throw new ImpossibleAssignementError("You cannot change the x coordinate of point on a vertical line.");
            const dy = this.line.a.y - this.line.b.y; // Line dx with sign
            const dx = this.line.a.x - this.line.b.x; // Line dy with sign
            const dxN = this.line.a.x - value; // Difference in y for new point and A
            const dr = dx / dxN; // Distance ratio
            const dyN = dy * dr; // Difference in x for new point and A
            const y = this.line.a.y + dyN;
            const x = value;

            this.aDist = Math.sqrt((this.line.a.x - x) ** 2 + (this.line.a.y - y) ** 2) / this.line.a.dist(this.line.b);
            this.update();
        }

        // Needed because of stupid set get behaviour
        get x(): number { return super.x; }
        get y(): number { return super.y; }
    }
    export class PointOnLineFromPoint extends Point {
        plane: Plane;
        readonly line: Line;
        readonly point: Point;
        constructor(line: Line, point: Point) {
            super([line, point]);
            if (line.plane !== point.plane) throw new PlaneError(line.plane, point.plane);
            this.plane = point.plane;
            this.line = line;
            this.point = point;
        }
        getX(): number {
            if (this.point.intersects(this.line)) {
                return this.point.x;
            }
            const ap = this.point.dist(this.line.a); // |AP|
            const bp = this.point.dist(this.line.b); // |BP|
            const ab = this.line.a.dist(this.line.b); // |AB|

            const abp = cosineTheoremAngle(bp, ab, ap); // |ABP|
            const pbd = Math.PI - abp; // |PBD|
            const bd = Math.cos(pbd) * bp; // |BD|

            const dr = bd / ab;
            const dx = dr * (this.line.b.x - this.line.a.x)

            return this.line.b.x + dx;
        }
        getY(): number {
            if (this.point.intersects(this.line)) {
                return this.point.y;
            }
            const ap = this.point.dist(this.line.a); // |AP|
            const bp = this.point.dist(this.line.b); // |BP|
            const ab = this.line.a.dist(this.line.b); // |AB|

            const abp = cosineTheoremAngle(bp, ab, ap); // |ABP|
            const pbd = Math.PI - abp; // |PBD|
            const bd = Math.cos(pbd) * bp; // |BD|

            const dr = bd / ab;
            const dy = dr * (this.line.b.y - this.line.a.y)

            return this.line.b.y + dy;
        }
    }
    export class PerpendicularLinePointerPoint extends Point {
        plane: Plane;
        readonly point: PointOnLineFromPoint;
        readonly line: Line;
        constructor(point: PointOnLineFromPoint) {
            super([point]);
            this.plane = point.plane;
            this.line = point.line;
            this.point = point;
        }
        getX(): number {
            const dy = this.point.y - this.line.a.y; // The dy for two points on the line
            return this.point.x + dy; // Due to triangles, dy for two line points and dx for this point and the point on line are equal
        }
        getY(): number {
            const dx = this.point.x - this.line.a.x; // The dx for two points on the line
            return this.point.y - dx; // Due to triangles, dx for two line points and dy for this point and the point on line are equal
        }
    }
    export class ParallelLinePointerPoint extends Point {
        plane: Plane;
        readonly point: Point;
        readonly line: Line;
        constructor(line: Line, point: Point) {
            super([line, point]);
            if (line.plane !== point.plane) throw new PlaneError(line.plane, point.plane);
            this.plane = line.plane;
            this.point = point
            this.line = line;
        }
        getX(): number {
            const bc = this.line.b.dist(this.point); // |BC|
            if (bc == 0) return this.line.b.y == this.point.y && this.line.b.x == this.point.x ? this.line.a.y : this.line.b.y; // Return the x of line.b if it's not the same as the point, else the x of line.a
            const bd = this.line.dist(this.point) // |BD| due to the lines beeing parallel, distance of any two points laying on a perpendicular line is the same

            const dc = Math.sqrt(bc * bc - bd * bd); // |DC| Pythagorian theorem
            const ce = bd - dc; // |CE|

            const dy = this.point.y - this.line.b.y; // Difference in y between the point and B point of the line

            const a1 = Math.acos(dy / bc);
            const a2 = Math.acos(bd / bc);
            const a = Math.PI / 2 - a1 - a2;

            return ce == 0 ? this.point.x - Math.cos(a) * bd : this.point.x + Math.cos(a) * ce; // Return the point, if it doesn't match the given point, then it return a different one
        }
        getY(): number {
            const bc = this.line.b.dist(this.point); // |BC|
            if (bc == 0) return this.line.b.y == this.point.y && this.line.b.x == this.point.x ? this.line.a.x : this.line.b.x; // Return the y of line.b if it's not the same as the point, else the y of line.a
            const bd = this.line.dist(this.point) // |BD| due to the lines beeing parallel, distance of any two points laying on a perpendicular line is the same


            const dc = Math.sqrt(bc * bc - bd * bd); // |DC| Pythagorian theorem
            const ce = bd - dc; // |CE|
            const dy = this.point.y - this.line.b.y; // Difference in y between the point and B point of the line

            const a1 = Math.acos(dy / bc);
            const a2 = Math.acos(bd / bc);
            const a = Math.PI / 2 - a1 - a2;

            return ce == 0 ? this.point.y - Math.sin(a) * bd : this.point.y + Math.sin(a) * ce; // Return the point, if it doesn't match the given point, then it return a different one
        }
    }
    //! Lines
    /**
     * Line base class
     */
    export abstract class Line extends Base {
        abstract getA(): Point;
        abstract getB(): Point;
        protected cache: Map<string, Point> = new Map<string, Point>();
        get a(): Point {
            const ca = this.cache.get("a");
            if (ca) return ca;
            this.cache.set("a", this.getA());
            return <Point>this.cache.get("a");
        };
        get b(): Point {
            const cb = this.cache.get("b");
            if (cb) return cb;
            this.cache.set("b", this.getB());
            return <Point>this.cache.get("b");

        };

        public readonly analyticInterface: LineAnalyticInterface = new LineAnalyticInterface(this);

        get dx(): number {
            return this.a.x - this.b.x;
        }
        get dy(): number {
            return this.a.y - this.b.y;
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
        intersects(other: Point | Line | Ray): boolean {
            if (other instanceof Point) return helpers.Intersects.PointLine(other, this);
            if (other instanceof Line) return !this.isParallel(other);
            if (other instanceof Ray) throw new NotImplementedError("Ray intersects");

            throw new InvalidArgumentError("Base", other);
        }
        /**
         * Checks if two lines are parallel
         * @param other The other line
         */
        isParallel(other: Line): boolean {
            return equals(this.dx / this.dy, other.dx / other.dy);
        }
        createPerpendicular(point: Point): PerpendicularLine {
            return new PerpendicularLine(new PointOnLineFromPoint(this, point));
        }
        createParallel(point: Point): ParallelLine {
            return new ParallelLine(point, this);
        }

        deleteCache(): void {
            this.cache.clear();
        }
    }
    export class TwoPointLine extends Line {
        protected _a: Point;
        protected _b: Point;

        public plane: Plane;
        constructor(a: Point, b: Point) {
            super([a, b]);
            if (a.plane !== b.plane) throw new PlaneError(a.plane, b.plane);
            this.plane = a.plane;
            this._a = a;
            this._b = b;
        }

        getA(): Point { return this._a; }
        set a(value: Point) {
            this._a = value;
            this.resetDependencies([this._a, this._b]);
            this.update();
        }

        getB(): Point { return this._b; }
        set b(value: Point) {
            this._b = value;
            this.resetDependencies([this._a, this._b]);
            this.update();
        }

        // Needed because of stupid set get behaviour
        get a(): Point { return super.a; }
        get b(): Point { return super.b; }
    }
    export class PerpendicularLine extends Line {
        readonly plane: Plane;
        line: Line;
        point: PointOnLineFromPoint;
        pointerPoint: PerpendicularLinePointerPoint;
        constructor(pointOnLine: PointOnLineFromPoint) {
            super([pointOnLine]);
            this.plane = pointOnLine.plane;
            this.line = pointOnLine.line;
            this.point = pointOnLine;
            this.pointerPoint = new PerpendicularLinePointerPoint(this.point);
        }

        getA(): PointOnLineFromPoint { return this.point; }
        set a(value: PointOnLineFromPoint) {
            if (value.line != this.line) throw new ImpossibleAssignementError("Cannot change point on line to a different line.")
            this.point = value;
            this.resetDependencies([this.point]);
            this.update();
        }

        getB(): PerpendicularLinePointerPoint { return this.pointerPoint };

        // Needed because of stupid set get behaviour
        get a(): PointOnLineFromPoint { return <PointOnLineFromPoint>super.a; }
    }
    export class LineFromRay extends Line {
        readonly plane: Plane;
        ray: Ray;
        constructor(ray: Ray) {
            super([ray]);
            this.plane = ray.plane;
            this.ray = ray;
        }
        getA(): Point {
            return this.ray.a;
        }
        getB(): Point {
            return this.ray.b
        }
    }
    /**
     * An abstract class representing any Ray
     */
    export abstract class Ray extends Base {

        /**
         * Getter for the end of the ray point
        */
        abstract getA(): Point;
        /**
         * Getter for the point defining the direction of the ray
         */
        abstract getB(): Point;

        protected cache: Map<string, Point> = new Map<string, Point>();
        get a(): Point {
            const ca = this.cache.get("a");
            if (ca) return ca;
            this.cache.set("a", this.getA());
            return <Point>this.cache.get("a");
        };
        get b(): Point {
            const cb = this.cache.get("b");
            if (cb) return cb;
            this.cache.set("b", this.getB());
            return <Point>this.cache.get("b");
        };

        public readonly analyticInterface: RayAnalyticInterface = new RayAnalyticInterface(this);

        /**
         * Difference of X coordinates of the points
         */
        get dx(): number {
            return this.a.x - this.b.x;
        }
        /**
         * Difference of Y coordinates of the points
         */
        get dy(): number {
            return this.a.y - this.b.y;
        }

        /**
         * Checks if two ray objects represent the same ray
         * @param other The other ray
         * @returns If the two rays match
         */
        equals(other: Ray): boolean {
            return this.a.equals(other.a) && equals(this.dx / this.dy, other.dx / other.dy);
        }
        /**
         * Creates a new line object this ray lays on
         */
        public createLine(): LineFromRay {
            return new LineFromRay(this);
        }
        dist(): number;
        dist(other: Line | Point | Ray): number;
        dist(other?: Line | Point | Ray): number {
            if (!other) return helpers.Distance.Ray(this);
            if (other instanceof Point) helpers.Distance.RayPoint(this, other);
            if (other instanceof Line) helpers.Distance.RayLine(this, other);
            throw new InvalidArgumentError("base", other);
        }
        intersects(other?: Line | Point | Ray): boolean {
            throw new NotImplementedError("Ray intersects");
        }

        deleteCache(): void {
            this.cache.clear();
        }
    }

    export class TwoPointRay extends Ray {
        readonly plane: Plane;
        private _a: Point;
        private _b: Point;
        constructor(a: Point, b: Point) {
            if (a.plane != b.plane) throw new PlaneError(a.plane, b.plane);
            super([a, b]);
            this.plane = a.plane;
            this._a = a;
            this._b = b;
        }
        getA(): Point {
            return this._a;
        }
        set a(point: Point) {
            this._a = point;
            this.resetDependencies([this._a, this._b]);
            this.update();
        }

        getB(): Point {
            return this._b;
        }
        set b(point: Point) {
            this._b = point;
            this.resetDependencies([this._a, this._b]);
            this.update();
        }


        // Needed because of stupid set get behaviour
        get a(): Point { return super.a; }
        get b(): Point { return super.b; }
    }

    export class ParallelLine extends Line {
        plane: Plane;
        pointerPoint: ParallelLinePointerPoint;
        line: Line;
        point: Point;
        constructor(point: Point, line: Line) {
            super([point, line]);
            if (point.plane != line.plane) throw new PlaneError(point.plane, line.plane);
            this.plane = point.plane;
            this.point = point;
            this.line = line;
            this.pointerPoint = new ParallelLinePointerPoint(this.line, point);
        }

        getA(): Point { return this.point; }
        set a(value: Point) {
            if (!(value instanceof Point)) throw new InvalidArgumentError("Point", value);
            if (value.plane != this.plane) throw new PlaneError(value.plane, this.plane);
            this.point = value;
            this.resetDependencies([this.point, this.line]);
            this.update();
        }
        getB(): ParallelLinePointerPoint { return this.pointerPoint; }

        // Needed because of stupid set get behaviour
        get a(): Point { return super.a; }

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
    export class SpecialAnalyticCaseError extends Error {
        property: string;
        constructor(property: string) {
            super(`Special analytic case encountred. This method or property is thus uncalculatable.`);
            this.property = property;
            if (DefaultError.captureStackTrace as any) {
                DefaultError.captureStackTrace(this, InvalidArgumentError);
            }
            this.name = "SpecialAnalyticCaseError";
        }
    }
    //! Analytic interfaces
    export abstract class AnalyticInterface<T extends Base> extends DependencyNode {
        readonly object: T;
        constructor(object: T) {
            super([object]);
            this.object = object;
        }
        abstract toString(): string;
    }
    export class PointAnalyticInterface extends AnalyticInterface<Point> {
        readonly point: Point;
        constructor(point: Point) {
            super(point);
            this.point = point;
        }
        /**
         * Gets the points X cooridnate
         */
        get x(): number {
            return this.object.x;
        }
        /**
         * Gets the points Y coordinate
         */
        get y(): number {
            return this.object.y;
        }
        /**
         * Return a string representation of the point
         * @returns The string in the form of "x = 1 && y = 1";
         */
        toString(): string {
            return `x = ${this.x} && y = ${this.y}`;
        }
        deleteCache(): void {

        }
    }
    /**
     * The analytic interface for a line in the form of an equation ay + bx = c   
     * NOTE: This should output the line in a normalized form, where *a*, the y coefficient, is either 1 or 0, but other implementors do not need to follow this standard and can output the equation in a arbitrary form (multiplied by any non-zero constant)
     */
    export class LineAnalyticInterface extends AnalyticInterface<Line> {
        readonly line: Line;
        protected cache: Map<string, number | undefined> = new Map<string, number | undefined>();

        constructor(line: Line) {
            super(line);
            this.line = line;
        }

        protected getA(): number {
            if (this.line.a.x == this.line.b.x) return 0; // If the line is vertical, the Y component is zero 
            return 1; // Normalized form of the equation requires the Y component to be either 0 or 1
        }
        protected getB(): number {
            if (this.line.a.x == this.line.b.x) return 1; // If the line is vertical, the Y component is required to be 1 
            return (this.a  * (this.line.a.y - this.line.b.y)) / (this.line.a.x - this.line.b.x); // b is calculated according to the slope NOTE: multiplied by this.a instead of 1 in case of a override to the getA method

        }
        protected getC(): number {
            if (this.line.a.y == this.line.b.y) return this.line.a.x / this.a; // NOTE: the division here is in case of a override of the getA or getB method
            if (this.line.a.x == this.line.b.x) return this.line.a.y / this.b; // NOTE: the division here is in case of a override of the getA or getB method
            return this.line.b.y * this.a + this.line.b.x * this.b; // Calculation according to the default equation
        }
        /**
         * Form of the equation: ay + bx = c
         * a is the Y component of the line
         */
        get a(): number {
            var a = this.cache.get("a");
            if (a === undefined) {
                a = this.getA();
                this.cache.set("a", a);
            }
            return a;
        }
        /**
         * Form of the equation: ay + bx = c
         * b is the X component of the line
         */
        get b(): number {
            var b = this.cache.get("b");
            if (b === undefined) {
                b = this.getB();
                this.cache.set("b", b);
            }
            return b;
        }
        /**
         * Form of the equation: ay + bx = c
         * c is the absolute component of the line
         */
        get c(): number {
            var c = this.cache.get("c");
            if (c === undefined) {
                c = this.getC();
                this.cache.set("c", c);
            }
            return c;
        }
        toString(): string {
            throw new NotImplementedError("Line analytic interface to string");
        }
        deleteCache(): void {
            this.cache.clear();
        }
    }
    export class RayAnalyticInterface extends AnalyticInterface<Ray> {
        readonly ray: Ray;
        constructor(ray: Ray) {
            super(ray);
            this.ray = ray;
        }
        toString(): string {
            throw new NotImplementedError("Ray analytic interface to string");
        }
    }
    //! Helpers
    export namespace helpers {
        export namespace Intersects {
            export function PointLine(point: Point, line: Line): boolean {
                return onOneLine(point.dist(line.a), point.dist(line.b), line.b.dist(line.a));
            }
            export function RayRay(ray1: Ray, ray2: Ray): number {
                const a = ray1.a; // Point A
                const b = ray1.b; // Point B
                const c = ray2.a; // Point C
                const d = ray2.b; // Point D

                throw new NotImplementedError("Ray Ray intersect")
            }
            export function RayLine(ray: Ray, line: Line): boolean {
                const blb = ray.b.dist(line.b); // |BBl| where Bl is the B point of the line
                const alb = ray.a.dist(line.b); // |ABl| where Bl is the B point of the line
                const ab = ray.a.dist(ray.b); // |AB| 
                const lalb = line.a.dist(line.b);
                const ala = ray.a.dist(line.a); // |AAl| where Al is the A point of the line
                const bla = ray.b.dist(line.a); // |BAl| where Al is the A point of the line

                const blba = cosineTheoremAngle(alb, blb, ab); // |BBlA|
                const lalba = cosineTheoremAngle(lalb, alb, ala); // |AlBlA|
                const lalbb = cosineTheoremAngle(lalb, blb, bla); // |AlBlB|

                return equals(blba, lalba + lalbb) || equals(Math.PI * 2 - blba, lalba + lalbb)
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
            export function Ray(ray: Ray): number {
                const az = ray.a.dist();
                const baz = cosineTheoremAngle(az, ray.a.dist(ray.b), ray.b.dist()); // |BAZ| where Z is the [0, 0]
                if (baz >= Math.PI / 2) return ray.a.dist();

                const dist = Math.sin(baz) * az; // The height of the BAZ triagle
                return dist;
            }
            export function RayPoint(ray: Ray, point: Point): number {
                const ap = ray.a.dist(point);
                const bap = cosineTheoremAngle(ap, ray.a.dist(ray.b), ray.b.dist(point)); // |BAP| where P is the point

                if (bap <= Math.PI / 2) return ray.a.dist(point);

                const dist = Math.sin(bap) * ap; // The height of the BAZ triagle
                return dist;
            }
            export function RayLine(ray: Ray, line: Line): number {
                const al = ray.a.dist(line); // |Al| where l is the line
                const bl = ray.b.dist(line); // |Bl| where l is the line

                if (helpers.Intersects.RayLine(ray, line)) return 0;

                if (equals(al, bl)) return al;
                if (bl < al) return 0;
                return al;
            }
            export function RayRay(ray1: Ray, ray2: Ray): number {
                const a = ray1.a; // Point A
                const b = ray1.b; // Point B
                const c = ray2.a; // Point C
                const d = ray2.b; // Point D

                throw new NotImplementedError("RayRay distance");
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