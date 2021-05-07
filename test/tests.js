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
    }
]