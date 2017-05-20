var tape = require("tape"),
    h = require("../");

var exampleHexJSON = {
	"layout":"odd-r",
	"hexes": {
		"C0R0":{"q":3,"r":-1},
		"C1R0":{"q":4,"r":-1},
		"C2R0":{"q":5,"r":-1},
		"C3R0":{"q":6,"r":-1},
		"C0R1":{"q":3,"r":0},
		"C1R1":{"q":4,"r":0},
		"C2R1":{"q":5,"r":0},
		"C3R1":{"q":6,"r":0},
		"C0R2":{"q":3,"r":1},
		"C1R2":{"q":4,"r":1},
		"C2R2":{"q":5,"r":1},
		"C3R2":{"q":6,"r":1},
		"C0R3":{"q":3,"r":2},
		"C1R3":{"q":4,"r":2},
		"C2R3":{"q":5,"r":2},
		"C3R3":{"q":6,"r":2}
	}
};

var exampleHexJSONOdd = {
	"layout":"odd-r",
	"hexes": {
		"C0R0":{"q":3,"r":-1},
		"C1R0":{"q":4,"r":-1},
		"C2R0":{"q":5,"r":-1},
		"C3R0":{"q":6,"r":-1},
		"C0R1":{"q":3,"r":0},
		"C1R1":{"q":4,"r":0},
		"C2R1":{"q":5,"r":0},
		"C3R1":{"q":6,"r":0},
		"C0R2":{"q":3,"r":1},
		"C1R2":{"q":4,"r":1},
		"C2R2":{"q":5,"r":1},
		"C3R2":{"q":6,"r":1}
	}
};

tape("renderHexJSON() takes data in HexJSON format and returns it as an array of hexes", function(test) {
	exampleHexJSON.layout = "odd-r";
	var hexes = h.renderHexJSON(exampleHexJSON, 500, 500);
	test.equal(Object.prototype.toString.call(hexes), "[object Array]");
	test.equal(hexes.length, 16);
	test.end();
});

tape("keys of the hexJSON have been added to each hex as key property", function(test) {
	exampleHexJSON.layout = "odd-r";
	var hexes = h.renderHexJSON(exampleHexJSON, 500, 500);
	test.equal(hexes[0].key, "C0R0");
	test.equal(hexes[8].key, "C0R2");
	test.equal(hexes[15].key, "C3R3");
	test.end();
});

tape("hexes have the expected absolute co-ordinates", function(test) {
	exampleHexJSON.layout = "odd-r";
	var hexes = h.renderHexJSON(exampleHexJSON, 500, 500);
	test.equal(hexes[0].qc, 0);
	test.equal(hexes[0].rc, 3);
	test.equal(hexes[15].qc, 3);
	test.equal(hexes[15].rc, 0);
	test.end();
});

tape("hexes have the expected x and y for odd-r layout", function(test) {
	exampleHexJSON.layout = "odd-r";
	var hexes = h.renderHexJSON(exampleHexJSON, 500, 500);
	test.equal(hexes[0].x, 111.1111111111111);
	test.equal(hexes[0].y, 352.82516450477135);
	test.end();
});

tape("hexes have the expected x and y for odd-r layout with an odd number of rows", function(test) {
	exampleHexJSONOdd.layout = "odd-r";
	var hexes = h.renderHexJSON(exampleHexJSONOdd, 500, 500);
	test.equal(hexes[0].x, 55.55555555555555);
	test.equal(hexes[0].y, 256.6001196398337);
	test.end();
});

tape("hexes have the expected x and y for even-r layout", function(test) {
	exampleHexJSON.layout = "even-r";
	var hexes = h.renderHexJSON(exampleHexJSON, 500, 500);
	test.equal(hexes[0].x, 55.55555555555555);
	test.equal(hexes[0].y, 352.82516450477135);
	test.end();
});

tape("hexes have the expected x and y for even-r layout with an odd number of rows", function(test) {
	exampleHexJSONOdd.layout = "even-r";
	var hexes = h.renderHexJSON(exampleHexJSONOdd, 500, 500);
	test.equal(hexes[0].x, 111.1111111111111);
	test.equal(hexes[0].y, 256.6001196398337);
	test.end();
});

tape("hexes have the expected x and y for odd-q layout", function(test) {
	exampleHexJSON.layout = "odd-q";
	var hexes = h.renderHexJSON(exampleHexJSON, 500, 500);
	test.equal(hexes[0].x, 64.15002990995842);
	test.equal(hexes[0].y, 388.88888888888886);
	test.end();
});

tape("hexes have the expected x and y for even-q layout", function(test) {
	exampleHexJSON.layout = "even-q";
	var hexes = h.renderHexJSON(exampleHexJSON, 500, 500);
	test.equal(hexes[0].x, 64.15002990995842);
	test.equal(hexes[0].y, 444.4444444444444);
	test.end();
});

tape("hexes have the expected vertices and points for row layouts", function(test) {
	exampleHexJSON.layout = "odd-r";
	var hexes = h.renderHexJSON(exampleHexJSON, 500, 500);
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

tape("hexes have the expected vertices and points for column layouts", function(test) {
	exampleHexJSON.layout = "odd-q";
	var hexes = h.renderHexJSON(exampleHexJSON, 500, 500);
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