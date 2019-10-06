// import oscP5.*;
// import netP5.*;
let canvas;
let w;
let columns;
let rows;
let board;
let next;
let paused;
let emptiness;
let send_message;
let step=0;
let board_sent = false;
let save_send_num;
let nSteps;
let init_shape_x, init_shape_y;
let play_dir=0;
//var faces;
//var shapes;

// OscP5 osc;
// NetAddress sonic_pi;

////var xebraState;
//function preload(){
//    faces = loadImage('images/happyface.png');

//}

function setup() {
  emptiness = 155;
  paused = false;
  send_message = true;
  // osc = new OscP5(this, 12000);
  // sonic_pi = new NetAddress("127.0.0.1", 4559);
  canvas = createCanvas(500,650);
  canvas.parent('grid');
  // size(500, 500);
  w = 31;
 // connectXebra();
  // Adjust frameRate to change speed of generation/tempo of music
  frameRate(1.5);
  // Calculate columns and rows
  columns = floor(width / w);
  rows = floor(height / w);
  console.log('Grid size:',rows,columns);
  cellWidth = width / columns;
  cellHeight = height/rows;
  nSteps = columns;

  board = new Array(columns);
  next = new Array(columns); 
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows);
    next[i] = new Array(rows);
  }

  init();
  draw_board(board);
}

function draw() {

  let num_ones = 0;
  if (play_dir == 'forward'){
   
   forward();
  }
  else if (play_dir == 'backward'){
    backward();
  }

  function forward() {
    for (let j = 0; j < rows; j++) {
      if (board[step][j] == 1) {
        num_ones += 1;
        fill(255,0,0);
        ellipse((step * w)+w/2, (j * w)+w/2, w, w);
      }
      else {
        // let highlight = (step)% nSteps;
        let highlight_color = color(169, 169, 169);
        highlight_color.setAlpha(8);
        fill(highlight_color);
        noStroke();
        rect((step % nSteps)*w, 0, w, height)
        // ellipse((step * w)+w/2, (j * w)+w/2, w, w);
      }
    }
    
    if (step > 0) {
      // OscMessage msg1 = new OscMessage("/trigger/notes");
      // msg1.add(save_send_num);
      // osc.send(msg1, sonic_pi);
      for (let j = 0; j < rows; j++) {
        if (board[step][j] == 1) {
          fill(127, 255, 0);
          ellipse(((step) * w)+w/2, (j * w)+w/2, w, w);
        }
        // else {
        //   var highlight = (step - 1 )% nSteps;
        //   fill(200, 60);
        //   noStroke();
        //   rect(highlight*27, 0,27, height)
        //   ellipse((step * w)+w/2, (j * w)+w/2, w, w);
        // }
      }
    }

  let send_num = new Array(num_ones);
  let counter = 0;
  for (let j = 0; j < rows; j++) {
    if (board[step][j] == 1) {
      send_num[counter] = j;
      counter += 1;
    }
  } 
  save_send_num = send_num;
  // setTimeout(draw,00);
  step += 1;
  if (step == columns ) {
    step = 0;
    board_sent = true;
    }
  }
  
  function backward() {
    for (let j = rows-1; j>=0 ; j--) {
      if (board[step][j] == 1) {
        num_ones += 1;
        fill(255,0,0);
        ellipse((step * w)+w/2, (j * w)+w/2, w, w);
      }
      else {
        let highlight_color = color(169, 169, 169);
        highlight_color.setAlpha(8);
        fill(highlight_color);
        noStroke();
        rect((step % nSteps)*w, 0, w, height)
        // ellipse((step * w)+w/2, (j * w)+w/2, w, w);
      }
    }
    
    if (step > 0) {
      // OscMessage msg1 = new OscMessage("/trigger/notes");
      // msg1.add(save_send_num);
      // osc.send(msg1, sonic_pi);
      for (let j = columns-1; j >=0; j--) {
        if (board[step-1][j] == 1) {
          fill(127, 255, 0);
          ellipse(((step-1) * w)+w/2, (j * w)+w/2, w, w);
        }
        // else {
        //   var highlight = (step - 1 )% nSteps;
        //   fill(200, 60);
        //   noStroke();
        //   rect(highlight*27, 0,27, height)
        //   ellipse((step * w)+w/2, (j * w)+w/2, w, w);
        // }
      }
    }
    let send_num = new Array(num_ones);
    let counter = 0;
    for (let j = 0; j < rows; j++) {
      if (board[step][j] == 1) {
        send_num[counter] = j;
        counter += 1;
      }
    } 
    save_send_num = send_num;
    // setTimeout(draw,00);
    step = step - 1;
    if (step < 0) {
      step = columns-1;
      board_sent = true;
    }
  }

  if (paused===false && board_sent==true) {
    console.log('Generating!')
    generate();
  }
  
  if (board_sent) { 
    board_sent = false;
    background(emptiness);
    draw_board(board);
  } 
}

function play_direction(dir) {
  play_dir = dir;
}

function rotation(dir) {
  console.log(dir);
  let temp = board;
  let radians = (Math.PI / 180) * 90, cos = Math.cos(radians), sin = Math.sin(radians);
  let nx, ny;
  if (dir == "clockwise"){
    for ( let i = 0; i < columns; i++) {
      for ( let j = 0; j < rows; j++) {
        nx = (cos * (i - 8)) + (sin * (j - 10)) + 8;
        ny = (cos * (j - 10)) - (sin * (i - 8)) + 10;
        temp[nx][ny] = board[i][j];
      }
    }
    console.log('clockwise');
  }
  else if (dir == "anticlockwise"){
    for ( let i = 0; i < columns; i++) {
      for ( let j = 0; j < rows; j++) {
      
      }
    }
  }
  board = temp;
}

function draw_board(board) {
  for ( let i = 0; i < columns; i++) {
    for ( let j = 0; j < rows; j++) {
      if (board[i][j] == 1) {
        fill(46,230,237);
        ellipse((i * w)+w/2, (j * w)+w/2, w, w);
      }
      else {
        stroke(emptiness);
        //image(faces,(i * w)+w/2, (j * w)+w/2,w);
        fill(5);
        ellipse((i * w)+w/2, (j * w)+w/2, w, w);
      }
   }
  }
}


// Fill board randomly
function init(rand) {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Padding adds complexity, Lining the edges with 0s
      // if (i == 0 || j == 0 || i == columns-1 || j == rows-1){
      //    board[i][j] = 0;
      //  }
      // Filling the rest randomly   
      if (rand === "true") {
        board[i][j] = floor(random(2));
      }
      else {
        board[i][j] = 0;
      }
    }
  }
}

function initblock() {
  console.log('block init');
  board[init_shape_x][init_shape_y] = 1;
  board[init_shape_x+1][init_shape_y+1] = 1;
  board[init_shape_x][init_shape_y+1] = 1;
  board[init_shape_x+1][init_shape_y] = 1;
}


function initblinker() {
  console.log('blinker init');
  board[init_shape_x][init_shape_y] = 1;
  board[init_shape_x-1][init_shape_y] = 1;
  board[init_shape_x+1][init_shape_y] = 1;
}

function inittoad() {
  console.log('toad init');
  board[init_shape_x][init_shape_y] = 1;
  board[init_shape_x+1][init_shape_y] = 1;
  board[init_shape_x+2][init_shape_y] = 1;

  board[init_shape_x-1][init_shape_y+1] = 1;
  board[init_shape_x][init_shape_y+1] = 1;
  board[init_shape_x+1][init_shape_y+1] = 1;
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
  
}

function initglider() {
  console.log('glider init');
  console.log(init_shape_x, init_shape_y)
  board[init_shape_x-1][init_shape_y+1] = 1; 
  board[init_shape_x][init_shape_y+1] = 1;
  board[init_shape_x+1][init_shape_y+1] = 1;
  board[init_shape_x+1][init_shape_y] = 1;
  board[init_shape_x][init_shape_y-1] = 1;

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

}

// The process of creating the new generation
function generate() {
  // Loop through every spot in our 2D array and check spots neighbors
  for (let x = 1; x < columns - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
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
      if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;            // Loneliness
      else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;            // Overpopulation
      else if ((board[x][y] == 0) && (neighbors == 3)) {                          // Reproduction 
        next[x][y] = 1;
      } 
      else next[x][y] = board[x][y];                                              // Stasis
    }
  }
  // Swap! do we really need to store next here?
  temp = board;
  board = next;
  next = temp;
 }


function mousePressed() {
  // paused= true;

  let i = round((mouseX-(w/2))/w);
  let j = round((mouseY-(w/2))/w);
  
  // Continue if click is outside the grid space
  if (i > columns -3 || j > rows -3 || i < 2 || j < 2) {
    console.log('skipping corners',i,j,rows,columns);
   }
   // initialize the last clicked space in this coordinate of the grid
  else
  { 
    init_shape_x = i;
    init_shape_y = j;
  }
  // Painting board with clicks
  // if (board[i][j] == 0){
  //   board[i][j] = 1;
  // } else {
  //    board[i][j]= 0;
  // }
}

function keyPressed(){
  if (keyCode == DOWN){
      paused = false;
  }
  if (key == ENTER || key == RETURN) {
    paused = false;
    init();
  }
}