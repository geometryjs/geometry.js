const GeometryJS = require("../build/index-module").default;

module.exports = [ // The tests
    /**
     * 
     * @param {(num1: number, num2: number, reason: string) => void} assert The assert function 
     */
    assert => { // The singular test
        const plane = new GeometryJS.Plane();
        const point = plane.createPoint(20, 10);
        assert(point.x, 20, "X stays same when point created.");
        assert(point.y, 10, "Y stays same when point created.");
    }   
]