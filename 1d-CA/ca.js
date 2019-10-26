
// inlets and outlets
inlets = 1;
outlets = 4;

// We arbitrarily start with just the middle cell having a state of "1"
var generation = 0;
var ruleset = Array(8);
var mem_count=0;
var memory = zeros([6,16]);
var cells = Array(16);

for (var i = 0; i < cells.length; i++) {
    cells[i] = 0;
 }

function rule(r) {
    var binaryStr = r.toString(2);
	while(binaryStr.length < 8) {
    	binaryStr = "0" + binaryStr;
	}
	ruleset = binaryStr.split("").map(function(x){return parseInt(x)});
}


// Implementing the Wolfram rules
// Could be improved and made more concise, but here we can explicitly see what is going on for each case
function rules(a, b, c) {
  if (a == 1 && b == 1 && c == 1) { return ruleset[0]; }
  else if (a == 1 && b == 1 && c == 0) { return ruleset[1] ; }
  else if (a == 1 && b == 0 && c == 1) { return ruleset[2] ; }
  else if (a == 1 && b == 0 && c == 0) { return ruleset[3] ; }
  else if (a == 0 && b == 1 && c == 1) { return ruleset[4] ; }
  else if (a == 0 && b == 1 && c == 0) { return ruleset[5] ;}
  else if (a == 0 && b == 0 && c == 1) { return ruleset[6] ;}
  else if (a == 0 && b == 0 && c == 0) { return ruleset[7] ;}
  else post("what is happening!");
}


function list(val) {
	cells = arrayfromargs(arguments);
	generate(cells);
}


// The process of creating the new generation
function generate() {
  // First we create an empty array for the new values
  var nextgen = Array(16);
  // For every spot, determine new state by examing current state, and neighbor states
  // Ignore edges that only have one neighor
  var i = 1;
  memory[0] = cells;
  for (i = 0; i < cells.length; i++) {
	
	if (i==0) var left   = cells[cells.length -1]; else var left = cells[i-1]   		// Left neighbor state
    var me     = cells[i];     															// Current state
    if (i==cells.length -1) var right  = cells[0]; else var right = cells[i+1]   		// Right neighbor state
    nextgen[i] = rules(left, me, right); 												// Compute next generation state based on ruleset

  }
  // The current generation is the new generation
  memory[5] = memory[4];
  memory[4] = memory[3];
  memory[3] = memory[2];
  memory[2] = memory[1];
  memory[1] = memory[0];
  memory[0] = nextgen;
  sendrows(memory);
  cells = nextgen;

  generation++;
}

//outlet to Max
function sendrows(memory) {
	for (var i = 0; i < memory.length; ++i) {
 		for (var j = 0; j < memory[i].length; ++j)
			if (i+1  == 6)
				outlet(1, j+1, 1,memory[i][j]);
			else
				outlet(0,j+1,i+1,memory[i][j]);
	}

}


function zeros(dimensions) {
    var array = [];

    for (var i = 0; i < dimensions[0]; ++i) {
        array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
    }

    return array;
}

function clear()
{
	memory = zeros([5,16]);
	outlet(1, "memory cleared");
}

function msg_int(v)
{
	post("received int " + v + "\n");
	myval = v;
	bang();
}

function msg_float(v)
{
	post("received float " + v + "\n");
	myval = v;
	bang();
}



function anything()
{
	var a = arrayfromargs(messagename, arguments);
	post("received message " + a + "\n");
	myval = a;
	bang();
}

