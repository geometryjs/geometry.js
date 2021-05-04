namespace GeometryJS {
    //! 2D
    /**
     * Class describing a 2D plane.
     */
    export class Plane {

    }

    //! Points
    /**
     * Default class describing a point
     */
    export class Point {
        private _x: number;
        private _y: number;
        public plane: Plane;
        constructor(plane: Plane, x: number, y: number) {
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