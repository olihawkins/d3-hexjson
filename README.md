# d3-hexjson

This module makes it easy to generate hexmaps from data that uses the Open Data Institute's [HexJSON format](https://odileeds.org/projects/hexmaps/hexjson.html). The module provides a single function that takes a HexJSON object and adds the properties needed to render it as a hexmap of a given size. The module calculates the hex size necessary to render the hexmap within an svg of the specified dimensions and generates the position and the points for each hex. This data is returned as an array of hexes that you can render directly with D3 as polygons, by using the x and y coordinates to position each hex and the *points* property as the *points* attribute of its polygon. Hex coordinates are rendered according to the [coordinate system](http://www.redblobgames.com/grids/hexagons/#coordinates) specified by the *layout* property of the HexJSON provided.

## Installing

If you use NPM, `npm install d3-hexjson`. Otherwise, download the [latest release](https://github.com/olihawkins/d3-hexjson/releases/latest). The module is designed to be used in conjunction with the core [D3 library](https://github.com/d3/d3) (see the [example usage](#example-usage) below).

## API Reference

<a name="renderHexJSON" href="#renderHexJSON">#</a> d3.<b>renderHexJSON</b>(<i>hexjson</i>, <i>width</i>, <i>height</i>)

Returns an array of hexes from a HexJSON object, adding to each hex the properties needed to render them as a hexmap with D3. The function calculates the appropriate size to render the hexes within an svg of the given width and height. The central coordinates of each hex are stored in *x* and *y* properties, while the *vertices* property holds an array of coordinate pairs, which specify the position of each vertex relative to x and y. The *points* property contains the vertex coordinates as a string that can be inserted directly into the *points* attribute of a polygon. The key used to reference each hex within the HexJSON object is stored within each hex in the *key* property. As these properties are added to the hexes stored in the source HexJSON, they can be accessed either through the returned array or through the original HexJSON object (if you need to merge additional data based on the key, for example).

The full list of properties that the function adds to each hex is as follows:

* **key** - The key against which the hex is stored in the source HexJSON
* **qc** - The absolute column number of the hex, measured left to right from zero 
* **rc** - The absolute row number of the hex, measured bottom to top from zero 
* **x** - The pixel coordinate of the centre of the hex within the svg on the x-axis
* **y** - The pixel coordinate of the centre of the hex within the svg on the y-axis
* **vertices** - The pixel coordinates of the vertices **relative to x and y**
* **points** - The vertex positions represented as a string for use in an svg polygon

## Example Usage

Given the following HexJSON stored in the file *example.hexjson*:

```javascript
{
	"layout":"odd-r",
	"hexes":{
		"C0R0":{"q":0,"r":0},
		"C1R0":{"q":1,"r":0},
		"C2R0":{"q":2,"r":0},
		"C3R0":{"q":3,"r":0},
		"C0R1":{"q":0,"r":1},
		"C1R1":{"q":1,"r":1},
		"C2R1":{"q":2,"r":1},
		"C3R1":{"q":3,"r":1},
		"C0R2":{"q":0,"r":2},
		"C1R2":{"q":1,"r":2},
		"C2R2":{"q":2,"r":2},
		"C3R2":{"q":3,"r":2},
		"C0R3":{"q":0,"r":3},
		"C1R3":{"q":1,"r":3},
		"C2R3":{"q":2,"r":3},
		"C3R3":{"q":3,"r":3}
	}
}
```

A hexmap of the data can be rendered in the following way:

```html
<html>
<head>
<style>
#vis {
	margin: 0;
	padding: 0;
	text-align: center;
	font-family: sans-serif;
	font-size: 10pt;
}
</style>
</head>
<body>
<div id="vis"></div>
<script src="d3.min.js"></script>
<script src="d3-hexjson.min.js"></script>
<script>

d3.json("example.hexjson", function(error, hexjson) {

	// Set the size and margins of the svg
	var margin = {top: 10, right: 10, bottom: 10, left: 10},
		width = 500 - margin.left - margin.right,
		height = 420 - margin.top - margin.bottom;

	// Create the svg element
	var svg = d3
		.select("#vis")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Render the hexes
	var hexes = d3.renderHexJSON(hexjson, width, height);

	// Bind the hexes to g elements of the svg and position them
	var hexmap = svg
		.selectAll("g")
		.data(hexes)
		.enter()
		.append("g")
		.attr("transform", function(hex) {
			return "translate(" + hex.x + "," + hex.y + ")";
		});

	// Draw the polygons around each hex's centre
	hexmap
		.append("polygon")
		.attr("points", function(hex) {return hex.points;})
		.attr("stroke", "white")
		.attr("stroke-width", "2")
		.attr("fill", "#b0e8f0");

	// Add the hex codes as labels
	hexmap
		.append("text")
		.append("tspan")
		.attr("text-anchor", "middle")
		.text(function(hex) {return hex.key;});
});

</script>
</body>
</html>
```