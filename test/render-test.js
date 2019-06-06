var tape = require("tape"),
	array = require("d3-array"),
	h = require("../");

var exampleDataA = {
	"layout": "odd-r",
	"hexes": {
		"Q0R0": {"q": 3, "r": -1},
		"Q1R0": {"q": 4, "r": -1},
		"Q2R0": {"q": 5, "r": -1},
		"Q3R0": {"q": 6, "r": -1},
		"Q0R1": {"q": 3, "r": 0},
		"Q1R1": {"q": 4, "r": 0},
		"Q2R1": {"q": 5, "r": 0},
		"Q3R1": {"q": 6, "r": 0},
		"Q0R2": {"q": 3, "r": 1},
		"Q1R2": {"q": 4, "r": 1},
		"Q2R2": {"q": 5, "r": 1},
		"Q3R2": {"q": 6, "r": 1},
		"Q0R3": {"q": 3, "r": 2},
		"Q1R3": {"q": 4, "r": 2},
		"Q2R3": {"q": 5, "r": 2},
		"Q3R3": {"q": 6, "r": 2}
	}
};

var exampleDataB = {
	"layout": "odd-r",
	"hexes": {
		"Q0R0": {"q": 3, "r": -1},
		"Q1R0": {"q": 4, "r": -1},
		"Q2R0": {"q": 5, "r": -1},
		"Q3R0": {"q": 6, "r": -1},
		"Q0R1": {"q": 3, "r": 0},
		"Q1R1": {"q": 4, "r": 0},
		"Q2R1": {"q": 5, "r": 0},
		"Q3R1": {"q": 6, "r": 0},
		"Q0R2": {"q": 3, "r": 1},
		"Q1R2": {"q": 4, "r": 1},
		"Q2R2": {"q": 5, "r": 1},
		"Q3R2": {"q": 6, "r": 1}
	}
};

var exampleDataC = {
	"layout": "odd-r",
	"hexes": {
		"Q0R0": {"q": 0, "r": 0},
		"Q1R1": {"q": 1, "r": 1},
		"Q1R2": {"q": 1, "r": 2},
		"Q2R3": {"q": 2, "r": 3}
	}
};

var exampleDataD = {
	"layout":"odd-r",
	"hexes": {
		"Q0R0":{"q":0,"r":0,"prov":"QC"},
		"Q1R0":{"q":1,"r":0,"prov":"QC"},
		"Q2R0":{"q":2,"r":0,"prov":"QC"},
		"Q3R0":{"q":3,"r":0,"prov":"QC"},
		"Q0R1":{"q":0,"r":1,"prov":"QC"},
		"Q1R1":{"q":1,"r":1,"prov":"QC"},
		"Q2R1":{"q":2,"r":1,"prov":"ON"},
		"Q3R1":{"q":3,"r":1,"prov":"QC"},
		"Q0R2":{"q":0,"r":2,"prov":"QC"},
		"Q1R2":{"q":1,"r":2,"prov":"QC"},
		"Q2R2":{"q":2,"r":2,"prov":"ON"},
		"Q3R2":{"q":3,"r":2,"prov":"QC"},
		"Q0R3":{"q":0,"r":3,"prov":"ON"},
		"Q1R3":{"q":1,"r":3,"prov":"QC"},
		"Q2R3":{"q":2,"r":3,"prov":"QC"},
		"Q3R3":{"q":3,"r":3,"prov":"QC"}
	}
}

tape("renderHexJSON() takes data in HexJSON format and returns it as an array of hexes", function (test) {
	exampleDataA.layout = "odd-r";
	var hexes = h.renderHexJSON(exampleDataA, 500, 500);
	test.equal(Object.prototype.toString.call(hexes), "[object Array]");
	test.equal(hexes.length, 16);
	test.end();
});

tape("keys of the hexJSON have been added to each hex as key property", function (test) {
	exampleDataA.layout = "odd-r";
	var hexes = h.renderHexJSON(exampleDataA, 500, 500);
	test.equal(hexes[0].key, "Q0R0");
	test.equal(hexes[8].key, "Q0R2");
	test.equal(hexes[15].key, "Q3R3");
	test.end();
});

tape("hexes have the expected absolute co-ordinates", function (test) {
	exampleDataA.layout = "odd-r";
	var hexes = h.renderHexJSON(exampleDataA, 500, 500);
	test.equal(hexes[0].qc, 0);
	test.equal(hexes[0].rc, 3);
	test.equal(hexes[15].qc, 3);
	test.equal(hexes[15].rc, 0);
	test.end();
});

tape("hexes have the expected x and y for odd-r layout", function (test) {
	exampleDataA.layout = "odd-r";
	var hexes = h.renderHexJSON(exampleDataA, 500, 500);
	test.equal(hexes[0].x, 111.1111111111111);
	test.equal(hexes[0].y, 352.82516450477135);
	test.end();
});

tape("hexes have the expected x and y for odd-r layout with an odd number of rows", function (test) {
	exampleDataB.layout = "odd-r";
	var hexes = h.renderHexJSON(exampleDataB, 500, 500);
	test.equal(hexes[0].x, 55.55555555555555);
	test.equal(hexes[0].y, 256.6001196398337);
	test.end();
});

tape("hexes have the expected x and y for even-r layout", function (test) {
	exampleDataA.layout = "even-r";
	var hexes = h.renderHexJSON(exampleDataA, 500, 500);
	test.equal(hexes[0].x, 55.55555555555555);
	test.equal(hexes[0].y, 352.82516450477135);
	test.end();
});

tape("hexes have the expected x and y for even-r layout with an odd number of rows", function (test) {
	exampleDataB.layout = "even-r";
	var hexes = h.renderHexJSON(exampleDataB, 500, 500);
	test.equal(hexes[0].x, 111.1111111111111);
	test.equal(hexes[0].y, 256.6001196398337);
	test.end();
});

tape("hexes have the expected x and y for odd-q layout", function (test) {
	exampleDataA.layout = "odd-q";
	var hexes = h.renderHexJSON(exampleDataA, 500, 500);
	test.equal(hexes[0].x, 64.15002990995842);
	test.equal(hexes[0].y, 388.88888888888886);
	test.end();
});

tape("hexes have the expected x and y for even-q layout", function (test) {
	exampleDataA.layout = "even-q";
	var hexes = h.renderHexJSON(exampleDataA, 500, 500);
	test.equal(hexes[0].x, 64.15002990995842);
	test.equal(hexes[0].y, 444.4444444444444);
	test.end();
});

tape("hexes have the expected vertices and points for row layouts", function (test) {
	exampleDataA.layout = "odd-r";
	var hexes = h.renderHexJSON(exampleDataA, 500, 500);
	test.equal(hexes[0].vertices[0].x, 0);
	test.equal(hexes[0].vertices[0].y, -64.15002990995842);
	test.equal(hexes[0].vertices[1].x, 55.55555555555555);
	test.equal(hexes[0].vertices[1].y, -32.07501495497921);
	test.equal(hexes[0].vertices[2].x, 55.55555555555555);
	test.equal(hexes[0].vertices[2].y, 32.07501495497921);
	test.equal(hexes[0].vertices[3].x, 0);
	test.equal(hexes[0].vertices[3].y, 64.15002990995842);
	test.equal(hexes[0].vertices[4].x, -55.55555555555555);
	test.equal(hexes[0].vertices[4].y, 32.07501495497921);
	test.equal(hexes[0].vertices[5].x, -55.55555555555555);
	test.equal(hexes[0].vertices[5].y, -32.07501495497921);
	test.equal(hexes[0].points, "" +
		"0,-64.15002990995842 " +
		"55.55555555555555,-32.07501495497921 " +
		"55.55555555555555,32.07501495497921 " +
		"0,64.15002990995842 " +
		"-55.55555555555555,32.07501495497921 " +
		"-55.55555555555555,-32.07501495497921");
	test.end();
});

tape("hexes have the expected vertices and points for column layouts", function (test) {
	exampleDataA.layout = "odd-q";
	var hexes = h.renderHexJSON(exampleDataA, 500, 500);
	test.equal(hexes[0].vertices[0].x, -64.15002990995842);
	test.equal(hexes[0].vertices[0].y, 0);
	test.equal(hexes[0].vertices[1].x, -32.07501495497921);
	test.equal(hexes[0].vertices[1].y, -55.55555555555555);
	test.equal(hexes[0].vertices[2].x, 32.07501495497921);
	test.equal(hexes[0].vertices[2].y, -55.55555555555555);
	test.equal(hexes[0].vertices[3].x, 64.15002990995842);
	test.equal(hexes[0].vertices[3].y, 0);
	test.equal(hexes[0].vertices[4].x, 32.07501495497921);
	test.equal(hexes[0].vertices[4].y, 55.55555555555555);
	test.equal(hexes[0].vertices[5].x, -32.07501495497921);
	test.equal(hexes[0].vertices[5].y, 55.55555555555555);
	test.equal(hexes[0].points, "" +
		"-64.15002990995842,0 " +
		"-32.07501495497921,-55.55555555555555 " +
		"32.07501495497921,-55.55555555555555 " +
		"64.15002990995842,0 " +
		"32.07501495497921,55.55555555555555 " +
		"-32.07501495497921,55.55555555555555");
	test.end();
});

tape("grid hexjson has the same layout as source hexjson", function (test) {
	exampleDataA.layout = "odd-r";
	exampleDataA.layout = "even-r";
	exampleDataA.layout = "odd-q";
	var gridA = h.getGridForHexJSON(exampleDataA);
	var gridB = h.getGridForHexJSON(exampleDataB);
	var gridC = h.getGridForHexJSON(exampleDataC);
	test.equal(gridA.layout, exampleDataA.layout);
	test.equal(gridB.layout, exampleDataB.layout);
	test.equal(gridC.layout, exampleDataC.layout);
	test.end();
});

tape("grid hexjson has the expected number of hexes", function (test) {
	var gridA = h.getGridForHexJSON(exampleDataA);
	var gridB = h.getGridForHexJSON(exampleDataB);
	var gridC = h.getGridForHexJSON(exampleDataC);
	test.equal(Object.keys(gridA.hexes).length, 16);
	test.equal(Object.keys(gridB.hexes).length, 12);
	test.equal(Object.keys(gridC.hexes).length, 12);
	test.end();
});

tape("grid hexjson has the same number of rows and columns as source hexjson", function (test) {
	var grids = [
		{hexjson: h.getGridForHexJSON(exampleDataA), cols: 4, rows: 4},
		{hexjson: h.getGridForHexJSON(exampleDataB), cols: 4, rows: 3},
		{hexjson: h.getGridForHexJSON(exampleDataC), cols: 3, rows: 4}
	];
	grids.forEach(function (grid) {
		var hexes = [];
		Object.keys(grid.hexjson.hexes).forEach(function (key) {
			hexes.push(grid.hexjson.hexes[key]);
		});
		var qmax = array.max(hexes, function (d) { return +d.q }),
			qmin = array.min(hexes, function (d) { return +d.q }),
			rmax = array.max(hexes, function (d) { return +d.r }),
			rmin = array.min(hexes, function (d) { return +d.r }),
			qnum = qmax - qmin + 1,
			rnum = rmax - rmin + 1;
		test.equal(grid.cols, qnum);
		test.equal(grid.rows, rnum);
	});
	test.end();
});

tape("boundaries should come up with twelve separate boundary segments", function (test) {
 	var lines = h.getBoundarySegmentsForHexJSON(exampleDataD, 500, 500, "prov");
 	test.equal(lines.length, 12);
 	test.end();
});

tape("boundaries should come up with sixty boundary points", function (test) {
 	var points = h.getBoundaryDotsForHexJSON(exampleDataD, 500, 500, "prov");
 	test.equal(points.length, 60);
 	test.end();
});
