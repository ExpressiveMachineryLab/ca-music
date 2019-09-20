inlets = 1;
outlets = 2;


function jit_matrix(mname) {
	var matrix = new JitterMatrix(mname);
	var blob = [];
	for(x=0; x<50; x++) {
		for(y=0; y<50; y++) {
			if (matrix.getcell(y,x) == 255) {
				blob = [y, 49-x]
				outlet(0, blob);
			}
		}
	}		
}

function bang() {

	var matrix = new JitterMatrix("noisemat");	// defined in max patch
	for(i=0; i<10; i++) {
		for(j=0; j<10; j++) {
			var val = matrix.getcell(j, i);
			matrix.setcell(j,i,"val",val[0],val[1]-100,val[2]-100,val[3]-100);
		}
	}
	outlet(1,"jit_matrix",matrix.name);	
}