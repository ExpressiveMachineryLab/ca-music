let w;
let columns;
let rows;
let board;
let next;
let notes;
var xebraState;
let init_shape_x, init_shape_y;
let comp ;
let note_colors = {
  2:[48,255,1],
  3:[0,128,255],
  4:[105,1,229],
  5:[59,0,52],
  6:[224,0,2],
  7:[255,89,0],
  8:[200,255,13]
};
let paused= true;

//var xebraState;
function preload(){
  faces = loadImage('https://static.wixstatic.com/media/ca28c0_482d94bf038c4625bdfa5e21a7e40b86~mv2.png/v1/fill/w_26,h_26/happyface.png');
  sadfaces = loadImage("https://static.wixstatic.com/media/ca28c0_97ee922c85e141179b65d6dea6dea3bf~mv2.png/v1/fill/w_26,h_26/dead4.png");
}

function setup() {
  emptiness = 135;
  paused = true;

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
  comp = new Array(columns);
  next = new Array(columns); 
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows);
    notes[i] = new Array(rows);
    comp[i] = new Array(rows);
    next[i] = new Array(rows);
  }

  init();
}


function draw() {
  background(0,0,0,0);
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
  if (!paused) {
    generate();
    find_components(1);
    paused=true;
  }
}

//init board with empty character and set of notes
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0;
      notes[i][j] = 0;
      comp[i][j] = 0;
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
  board[init_shape_x][init_shape_y] = 1;
  board[init_shape_x+1][init_shape_y+1] = 1;
  board[init_shape_x][init_shape_y+1] = 1;
  board[init_shape_x+1][init_shape_y] = 1;
  paused=true;
}


function initblinker() {
  console.log('blinker init');
  board[init_shape_x][init_shape_y] = 1;
  board[init_shape_x-1][init_shape_y] = 1;
  board[init_shape_x+1][init_shape_y] = 1;
  paused=true;
}

function inittoad() {
  console.log('toad init');
  board[init_shape_x][init_shape_y] = 1;
  board[init_shape_x+1][init_shape_y] = 1;
  board[init_shape_x+2][init_shape_y] = 1;

  board[init_shape_x-1][init_shape_y+1] = 1;
  board[init_shape_x][init_shape_y+1] = 1;
  board[init_shape_x+1][init_shape_y+1] = 1;
  paused=true;
}

function initbeacon() {
  console.log('beacon init');
  console.log(init_shape_x, init_shape_y)
  board[init_shape_x][init_shape_y] = 1;
  board[init_shape_x+1][init_shape_y+1] = 1;
  board[init_shape_x][init_shape_y+1] = 1;
  board[init_shape_x+1][init_shape_y] = 1; 

  board[init_shape_x-1][init_shape_y-1] = 1; 
  board[init_shape_x-2][init_shape_y-1] = 1;
  board[init_shape_x-2][init_shape_y-2] = 1;
  board[init_shape_x-1][init_shape_y-2] = 1;

  paused=true;
  
}

function initglider() {
  console.log('glider init');
  console.log(init_shape_x, init_shape_y)
  board[init_shape_x-1][init_shape_y+1] = 1; 
  board[init_shape_x][init_shape_y+1] = 1;
  board[init_shape_x+1][init_shape_y+1] = 1;
  board[init_shape_x+1][init_shape_y] = 1;
  board[init_shape_x][init_shape_y-1] = 1;

  paused=true;
}

function initspaceship() {
  console.log('spaceship init');
  console.log(init_shape_x, init_shape_y);
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

  paused=true;
}


// The process of creating the new generation
function generate() {
  for (let x = 1; x < columns -1; x++) {
    for (let y = 1; y < rows -1; y++) {
      
      //find_neighbors
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          neighbors += board[x+i][y+j];
        }
      }
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

  let temp = board;
  board = next;
  next = temp;

}

function find_components(offset) {
  var array = board,
    default_value = 0,
    result_object = {}

  function test_connection(array, i, j) {
    if (array[i] && array[i][j] === -1) {
      if (!result_object[default_value]) result_object[default_value] = [];

      result_object[default_value].push([j, i]);
      
      array[i][j] = 1;
      for (var k = offset; k > 0; k--) {
        test_connection(array, i + k, j); // right
        test_connection(array, i, j + k); // bottom
        test_connection(array, i - k, j); // left
        test_connection(array, i, j - k); // top

        test_connection(array, i + k, j + k); // bottom right
        test_connection(array, i + k, j - k); // top right
        test_connection(array, i - k, j - k); // top left 
        test_connection(array, i - k, j + k); // bottom left
      }
      return true
    }
  }
  array.forEach(function(a) {
    a.forEach(function(b, i, bb) {
      bb[i] = -b
    })
  });
  array.forEach(function(a, i, aa) {
    a.forEach(function(b, j, bb) {
      test_connection(aa, i, j) && default_value++
    })
  })

  for k in result_object {
    console.log()

  }
  // return result_object;
}

function mousePressed() {
  let i = round((mouseX-(w/2))/w);
  let j = round((mouseY-(w/2))/w);
  
  if (i > columns -3 || j > rows -3 || i < 2 || j < 2) {
    console.log('skipping corners',i,j,rows,columns);
   }
  else
  { 
    init_shape_x = i;
    init_shape_y = j;
  }
}

function keyPressed(){
  if (keyCode === CONTROL) {
    paused = !paused;
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
