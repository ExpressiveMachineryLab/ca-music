inlets = 1;
outlets = 1;


function list(val) {
	drawrow = arrayfromargs(arguments);
	for (var i = 0; i < drawrow.length; ++i) {
		outlet(0,i,drawrow[i]);
	}
}