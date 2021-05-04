namespace GeometryJS {
    //! 2D
    /**
     * Class describing a 2D plane.
     */
    export class Plane {

    }

    //! Points
    /**
     * Point base class
     */
    export abstract class PointBase {
        public abstract plane: Plane;

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
        dist(object?: Point): number {
            if (!object) return Math.sqrt(this.x * this.x + this.y * this.y);
            if (object instanceof GeometryJS.Point) {
                const dx = object.x - this.x;
                const dy = object.y - this.y;
                return Math.sqrt(dx*dx + dy*dy);
            }
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
}