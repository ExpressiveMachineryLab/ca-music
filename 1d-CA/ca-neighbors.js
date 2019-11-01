
// inlets and outlets
inlets = 1;
outlets = 4;

// We arbitrarily start with just the middle cell having a state of "1"
var generation = 0;
var neighbors = 1;
var population = 0;
var alive = 0;
var mem_count=0;
var memory = zeros([6,16]);
var cells = Array(16);

for (var i = 0; i < cells.length; i++) {
    cells[i] = 0;
 }

function rule(n) {
	n = arrayfromargs(arguments);
    neighbors = n[0];
	population = n[1];
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
  post(cells + "\n");
  for (i = 0; i < cells.length; i++) {
	var index=0;
	alive = 0;
	
	// loop in neighbor window and pick up all alive neighbors
	for (j = i - Math.floor(neighbors/2) + (neighbors %2); j <= i + Math.floor(neighbors/2); j++) {
		
		if ( j < 0 ) {
			index = cells.length - Math.abs(j);
			alive = alive + cells[index];
		}
		else if ( j == i) {continue;}
		else if (j>=cells.length) {
			index = 0 + j%cells.length;
			alive = alive + cells[index];
		}
		else {
			index = j;
			alive = alive + cells[index];
		}
		
	}																
	// Compute next generation state based on ruleset
	//post(alive,population, i ,cells[i] + "\n");
	if (alive < population) nextgen[i] = 1;
	else nextgen[i] = 0;
	post("nextgen")
	//post(alive,population, i ,nextgen[i] + "\n");
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

