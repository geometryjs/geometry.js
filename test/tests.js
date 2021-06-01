const GeometryJS = require("../build/index-module").default;
/**
 * @type {Array<(assert: (num1: number, num2: number, reason: string) => void) => void>}
*/
module.exports = [ // The tests
    assert => { // The singular test
        const plane = new GeometryJS.Plane();
        const point = plane.createPoint(20, 10);
        assert(point.x, 20, "X stays same when point created.");
        assert(point.y, 10, "Y stays same when point created.");
    },
    assert => { // The checks for point line intersects
        const plane = new GeometryJS.Plane();
        const x = plane.createPoint(0, 0);
        const y = plane.createPoint(100, 100);
        const a = plane.createPoint(50, 50);
        const b = plane.createPoint(50, 0);
        const a2 = plane.createPoint(200, 200);
        const b2 = plane.createPoint(0, 50);

        const line = plane.createLine(x, y);
        assert(line.intersects(x) && line.intersects(y), true, "Creator point lays on line");
        assert(line.intersects(a), true, "Point between creator points lays on line");
        assert(line.intersects(a2), true, "Point on line outside of segment lays on line.");
        assert(line.intersects(b) || line.intersects(b2), false, "Point not on line does not intersect the line");
    },
    assert => {
        const plane = new GeometryJS.Plane();

        const x = plane.createPoint(0, 0);
        const y = plane.createPoint(100, 100);
        const z = plane.createPoint(100, 0);
        const line = plane.createLine(x, y);
        const pLine = line.createPerpendicular(z);


        const a = plane.createPoint(0, 100);
        const b = plane.createPoint(200, -100);
        assert(pLine.intersects(a), true, "Correct perpendicular line created");
        assert(pLine.intersects(b), true, "Correct perpendicular line created");
        assert(pLine.isParallel(line), false, "Checks, if perpendicular line is not parallel.");
    },
    assert => {
        const plane = new GeometryJS.Plane();

        const x = plane.createPoint(0, 0);
        const y = plane.createPoint(100, 100);
        const z = plane.createPoint(100, 0);
        const line = plane.createLine(x, y);
        const pLine = line.createParallel(z);

        const ps = [-1000000000, -999800, - 10, 0, 50, 1e5, 1e8, 1e10].map(v => plane.createPoint(100 + v, v));
        for (const p of ps) {
            assert(pLine.intersects(p), true, "Point on the line: " + p.y);
        }
        const pns = [[10, 554], [599, 654], [561, -651], [236, -12]].map(v => plane.createPoint(...v));
        for (const p of pns) {
            assert(pLine.intersects(p), false, "Point non the line: " + p.xRounded);
        }
        assert(pLine.isParallel(line), true, "Parallel line check.");
    },
    assert => {
        const plane = new GeometryJS.Plane();

        const origin = plane.createPoint(0, 0);
        /**
         * @type {Array<[number, number, number, number, number]>} The numbers are: Ax, Ay, Bx, By, expected distance
         */
        const points = [[1, 1, 2, 2, Math.SQRT2], [1, 1, 1, -1, 1], [1, 1, -1, 1, 1], [1, 1, -1, -1, 0]];

        for (const [Ax, Ay, Bx, By, dist] of points) {
            const a = plane.createPoint(Ax, Ay);
            const b = plane.createPoint(Bx, By);

            const ray = plane
        }
    }
]
module.exports[0].testName = "Value retainment";
module.exports[1].testName = "Intersect check";
module.exports[2].testName = "Perpendicular line check";
module.exports[2].testName = "Parallel line check";