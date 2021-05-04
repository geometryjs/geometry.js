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
    export abstract class PointBase {
        public abstract plane: Plane;

        abstract get x(): number;
        abstract set x(value: number);

        abstract get y(): number;
        abstract set y(value: number);
    }

}