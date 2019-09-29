let w;
let columns;
let rows;
let board;
let next;
let notes;
var xebraState;
let init_shape_x, init_shape_y;
let note_colors = {
  2:[48,255,1],
  3:[0,128,255],
  4:[105,1,229],
  5:[59,0,52],
  6:[224,0,2],
  7:[255,89,0],
  8:[200,255,13]
};
let paused= false;

//var xebraState;
function preload(){
  faces = loadImage('https://static.wixstatic.com/media/ca28c0_482d94bf038c4625bdfa5e21a7e40b86~mv2.png/v1/fill/w_26,h_26/happyface.png');
  sadfaces = loadImage("https://static.wixstatic.com/media/ca28c0_97ee922c85e141179b65d6dea6dea3bf~mv2.png/v1/fill/w_26,h_26/dead4.png");
}

function setup() {
  emptiness = 135;
  paused = false;

  var canvas = createCanvas(900, 700);
  pg = createGraphics(900, 700);
  canvas.parent('grid');
  w = 25;
  // connectXebra();
  // Adjust frameRate to change speed of generation/tempo of music
  frameRate(2);

  // Calculate columns and rows
  columns = floor(width / w);
  rows = floor(height / w);
  console.log('Grid Size:',rows,columns);

  // Wacky way to make a 2D array is JS
  board = new Array(columns);
  notes = new Array(columns);
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows);
    notes[i] = new Array(rows);
  }

  // Going to use multiple 2D arrays and swap them
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  init();
}


function draw() {
  background(emptiness);
  for ( let i = 0; i < columns;i++) {
    for ( let j = 0; j < rows;j++) {
      if (board[i][j] == 1) {
        image(faces,(i * w), (j * w),w);
        // fill(46,230,237);
        // ellipse((i * w), (j * w), w);
      }
      else {
        image(sadfaces,(i * w), (j * w),w);
        // stroke(emptiness);
        // fill(0);
        // ellipse((i * w), (j * w), w);
        // ellipse((i * w)+w/2, (j * w)+w/2, w, w);
      } 
      //image(faces,(i * w)+w/2, (j * w)+w/2,w);
      if (notes[i][j] !=0) {
        image(pg,0,0);
      }
   }
  }
  if (!paused) {generate();}
}

//init board with empty character and set of notes
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0;
      notes[i][j] = 0;
    }
  }
  initnote(3,4,2);
  initnote(15,10,3);
  initnote(20,17,4);
  initnote(10,3,5);
  initnote(8,8,6);
  initnote(8,19,6);
  initnote(11,11,7);

}
function initnote(i,j,val){
  notes[i][j] = val;
  pg.fill(note_colors[notes[i][j]][0], note_colors[notes[i][j]][1], note_colors[notes[i][j]][2]);
  pg.ellipse((i * w) +w/2, (j * w)+w/2, w);
}

function initblock() {
  console.log('block init');
  console.log(init_shape_x, init_shape_y)
  board[init_shape_x][init_shape_y] = 1;
  board[init_shape_x+1][init_shape_y+1] = 1;
  board[init_shape_x][init_shape_y+1] = 1;
  board[init_shape_x+1][init_shape_y] = 1;
  paused=false;
}


function initblinker() {
  console.log('blinker init');
  console.log(init_shape_x, init_shape_y)
  // for (let i = 0; i < columns; i++) {
  //   for (let j = 0; j < rows; j++) {
  //     board[i][j] = 0;
  //     next[i][j] = 0;
  //   }
  // }
  board[init_shape_x][init_shape_y] = 1;
  board[init_shape_x-1][init_shape_y] = 1;
  board[init_shape_x+1][init_shape_y] = 1;
  paused=false;
}

function inittoad() {
  console.log('toad init');
  console.log(init_shape_x, init_shape_y)
  // for (let i = 0; i < columns; i++) {
  //   for (let j = 0; j < rows; j++) {
  //     board[i][j] = 0;
  //     next[i][j] = 0;
  //   }
  // }
  board[init_shape_x][init_shape_y] = 1;
  board[init_shape_x+1][init_shape_y] = 1;
  board[init_shape_x+2][init_shape_y] = 1;

  board[init_shape_x-1][init_shape_y+1] = 1;
  board[init_shape_x][init_shape_y+1] = 1;
  board[init_shape_x+1][init_shape_y+1] = 1;
  paused=false;
}

function initbeacon() {
  console.log('beacon init');
  console.log(init_shape_x, init_shape_y)
  // for (let i = 0; i < columns; i++) {
  //   for (let j = 0; j < rows; j++) {
  //     board[i][j] = 0;
  //     next[i][j] = 0;
  //   }
  // }
  board[init_shape_x][init_shape_y] = 1;
  board[init_shape_x+1][init_shape_y+1] = 1;
  board[init_shape_x][init_shape_y+1] = 1;
  board[init_shape_x+1][init_shape_y] = 1; 

  board[init_shape_x-1][init_shape_y-1] = 1; 
  board[init_shape_x-2][init_shape_y-1] = 1;
  board[init_shape_x-2][init_shape_y-2] = 1;
  board[init_shape_x-1][init_shape_y-2] = 1;
  paused=false;
  
}

function initglider() {
  console.log('glider init');
  console.log(init_shape_x, init_shape_y)
  // for (let i = 0; i < columns; i++) {
  //   for (let j = 0; j < rows; j++) {
  //     board[i][j] = 0;
  //     next[i][j] = 0;
  //   }
  // }
  board[init_shape_x-1][init_shape_y+1] = 1; 
  board[init_shape_x][init_shape_y+1] = 1;
  board[init_shape_x+1][init_shape_y+1] = 1;
  board[init_shape_x+1][init_shape_y] = 1;
  board[init_shape_x][init_shape_y-1] = 1;
  paused=false;
}

function initspaceship() {
  console.log('spaceship init');
  console.log(init_shape_x, init_shape_y);
  // for (let i = 0; i < columns; i++) {
  //   for (let j = 0; j < rows; j++) {
  //     board[i][j] = 0;
  //     next[i][j] = 0;
  //   }
  // }

  board[init_shape_x][init_shape_y-1] = 1; 
  board[init_shape_x+1][init_shape_y-1] = 1; 

  board[init_shape_x-1][init_shape_y] = 1; 
  board[init_shape_x-2][init_shape_y] = 1; 
  board[init_shape_x+1][init_shape_y] = 1;
  board[init_shape_x+2][init_shape_y] = 1;

  board[init_shape_x-1][init_shape_y+1] = 1; 
  board[init_shape_x-2][init_shape_y+1] = 1; 
  board[init_shape_x][init_shape_y+1] = 1;
  board[init_shape_x+1][init_shape_y+1] = 1;

  board[init_shape_x][init_shape_y+2] = 1;
  board[init_shape_x-1][init_shape_y+2] = 1;

  paused=false;
}

// The process of creating the new generation
function generate() {
  // Loop through every spot in our 2D array and check spots neighbors
  for (let x = 1; x < columns -1; x++) {
    for (let y = 1; y < rows -1; y++) {
      // Add up all the states in a 3x3 surrounding grid
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          neighbors += board[x+i][y+j];
        }
      }

      // A little trick to subtract the current cell's state since
      // we added it in the above loop
      neighbors -= board[x][y];
      // Rules of Life
      if ((board[x][y] == 1) && (neighbors <  2)) {                               // Loneliness
        next[x][y] = 0; 
      }            
      else if ((board[x][y] == 1) && (neighbors >  3)) {                          // Overpopulation
        next[x][y] = 0;
      }        
      else if ((board[x][y] == 0) && (neighbors == 3)) {                          // Reproduction 
        next[x][y] = 1;
        // xebraState.sendMessageToChannel("fromp5_born", ['hi',x,y]);
      } 
      else next[x][y] = board[x][y];                                              // Stasis
    }
  }
  // Swap!
  let temp = board;
  board = next;
  next = temp;
 }


function mousePressed() {
  if (paused == false) {paused=true;}
  else (paused = false);
  let i = round((mouseX-(w/2))/w);
  let j = round((mouseY-(w/2))/w);
  

  if (i > columns -3 || j > rows -3 || i < 2 || j < 2) {
    console.log('skipping corners',i,j,rows,columns);
   }
  else
  { 
    console.log(i,j);
    init_shape_x = i;
    init_shape_y = j;
  }
  // if (board[i][j] == 0){
  //   board[i][j] = 1;
  // } else{
  //    board[i][j]= 0;
  //   }
}

function keyPressed(){

}

function connectXebra() {
  var options = {
    hostname : "127.0.0.1", // localhost
    port : 8086,
    supported_objects : Xebra.SUPPORTED_OBJECTS
  };

  xebraState = new Xebra.State(options);

  xebraState.connect();
}
