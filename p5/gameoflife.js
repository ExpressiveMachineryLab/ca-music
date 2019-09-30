let w;
let columns;
let rows;
let board;
let next;
var xebraState;
let init_shape_x, init_shape_y;
let paused = false;

//var xebraState;
function preload(){
  faces = loadImage('https://static.wixstatic.com/media/ca28c0_b5f5ae31a56d4d61ad5328c34118a607~mv2.png/v1/fill/w_26,h_26/bug6.png');
  sadfaces = loadImage("https://static.wixstatic.com/media/ca28c0_571a6b3ba2434952a8ff0dfc4b886af3~mv2.png/v1/fill/w_26,h_26/bug2.png");

}

function setup() {
  emptiness = 135;
  paused = false;

  var canvas = createCanvas(800, 600);
  canvas.parent('grid');
  w = 25;
  //connectXebra();
  // Adjust frameRate to change speed of generation/tempo of music
  frameRate(2);

  // Calculate columns and rows
  columns = floor(width / w);
  rows = floor(height / w);
  console.log('Grid Size:',rows,columns);

  // Wacky way to make a 2D array is JS
  board = new Array(columns);
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  }

  // Going to use multiple 2D arrays and swap them
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  init();
}


function draw() {
  background(0,0,0,0);
  for ( let i = 0; i < columns;i++) {
    for ( let j = 0; j < rows;j++) {
      if ((board[i][j] == 1)) {
        image(faces,(i * w), (j * w),w);
        //fill(46,230,237);
      }
      else {
        image(sadfaces,(i * w), (j * w),w);
      //stroke(emptiness);
      //image(faces,(i * w)+w/2, (j * w)+w/2,w);
      //fill(0);
      //ellipse((i * w)+w/2, (j * w)+w/2, w, w);
      }
   }
  }
  if (!paused) {
  //  console.log(paused); // isnt this logging paused when it is not paused?
  generate();
  }
}

// Fill board randomly
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      /*// Lining the edges with 0s
      if (i == 0 || j == 0 || i == columns-1 || j == rows-1) board[i][j] = 0;
      // Filling the rest randomly
      else {*/
      board[i][j] = 0;
      next[i][j] = 0;
      
    }
  }
}
function randInit() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Lining the edges with 0s
      if (i == 0 || j == 0 || i == columns-1 || j == rows-1) board[i][j] = 0;
      // Filling the rest randomly
      else {
      board[i][j] = floor(random(2));
      next[i][j] = 0;}
    }
  }
}

function initblock() {
  console.log('block init');
  console.log(init_shape_x, init_shape_y)
  /*for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0;
      next[i][j] = 0;
    }
  }*/
  board[init_shape_x][init_shape_y] = 1;
  board[init_shape_x+1][init_shape_y+1] = 1;
  board[init_shape_x][init_shape_y+1] = 1;
  board[init_shape_x+1][init_shape_y] = 1;
  //paused=false;
}


function initblinker() {
  console.log('blinker init');
  console.log(init_shape_x, init_shape_y)
  /*for ( i = 0; i < columns; i++) {
    for ( j = 0; j < rows; j++) {
      board[i][j] = 0;
      next[i][j] = 0;
    }
  }*/
  board[init_shape_x][init_shape_y] = 1;
  board[init_shape_x-1][init_shape_y] = 1;
  board[init_shape_x+1][init_shape_y] = 1;
  //paused=false;
}

function inittoad() {
  console.log('toad init');
  console.log(init_shape_x, init_shape_y)
 /* for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0;
      next[i][j] = 0;
    }
  }*/
  board[init_shape_x][init_shape_y] = 1;
  board[init_shape_x+1][init_shape_y] = 1;
  board[init_shape_x+2][init_shape_y] = 1;

  board[init_shape_x-1][init_shape_y+1] = 1;
  board[init_shape_x][init_shape_y+1] = 1;
  board[init_shape_x+1][init_shape_y+1] = 1;
  //paused=false;
}

function initbeacon() {
  console.log('beacon init');
  console.log(init_shape_x, init_shape_y)
  /*for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0;
      next[i][j] = 0;
    }
  }*/
  board[init_shape_x][init_shape_y] = 1;
  board[init_shape_x+1][init_shape_y+1] = 1;
  board[init_shape_x][init_shape_y+1] = 1;
  board[init_shape_x+1][init_shape_y] = 1; 

  board[init_shape_x-1][init_shape_y-1] = 1; 
  board[init_shape_x-2][init_shape_y-1] = 1;
  board[init_shape_x-2][init_shape_y-2] = 1;
  board[init_shape_x-1][init_shape_y-2] = 1;
  //paused=false;
  
}

function initglider() {
  console.log('glider init');
  console.log(init_shape_x, init_shape_y)
  /*for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0;
      next[i][j] = 0;
    }
  }*/
  board[init_shape_x-1][init_shape_y+1] = 1; 
  board[init_shape_x][init_shape_y+1] = 1;
  board[init_shape_x+1][init_shape_y+1] = 1;
  board[init_shape_x+1][init_shape_y] = 1;
  board[init_shape_x][init_shape_y-1] = 1;
 // paused=false;
}

function initspaceship() {
  console.log('spaceship init');
  console.log(init_shape_x, init_shape_y);
  /*for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0;
      next[i][j] = 0;
    }
  }*/

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

  //paused=false;
}

// The process of creating the new generation
function generate() {
  //console.log('Generating')
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
      //console.log(neighbors);
      // Rules of Life
      if ((board[x][y] == 1) && (neighbors <  2)) {                           // Loneliness
        next[x][y] = 0; 
      }            
      else if ((board[x][y] == 1) && (neighbors >  3)) {                          // Overpopulation
        next[x][y] = 0;
      }        
      else if ((board[x][y] == 0) && (neighbors == 3)) {                          // Reproduction 
        next[x][y] = 1;
        //xebraState.sendMessageToChannel("fromp5_born", ['hi',x,y]);
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
  /*if (paused == false) {paused=true;}
  else (paused = false);*/
  let i = round((mouseX-(w/2))/w);
  let j = round((mouseY-(w/2))/w);
  

  if ( i > columns -4 || j > rows -3 || i < 3 || j <3) {
    console.log('skipping corner shapes',i,j);
  }
  else
  {
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
  if (keyCode === DOWN_ARROW){
    randInit();  
  }
  else if (keyCode === ENTER) {
  paused = !paused;
  // init();
  } else if (keyCode === UP_ARROW) {
    init();
}

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
