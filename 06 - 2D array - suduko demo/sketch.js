// sudoku demo - 2D array demo
// 10/1/2020

let sudoku = [[5,3,0,0,7,0,0,0,0],
              [6,0,0,1,9,5,0,0,0],
              [0,9,8,0,0,0,0,6,0],
              [8,0,0,0,6,0,0,0,3],
              [4,0,0,8,0,3,0,0,1],
              [7,0,0,0,2,0,0,0,6],
              [0,6,0,0,0,0,2,8,0],
              [0,0,0,4,1,9,0,0,5],
              [0,0,0,0,8,0,0,7,9]];

let initialState = 
              [[5,3,0,0,7,0,0,0,0],
              [6,0,0,1,9,5,0,0,0],
              [0,9,8,0,0,0,0,6,0],
              [8,0,0,0,6,0,0,0,3],
              [4,0,0,8,0,3,0,0,1],
              [7,0,0,0,2,0,0,0,6],
              [0,6,0,0,0,0,2,8,0],
              [0,0,0,4,1,9,0,0,5],
              [0,0,0,0,8,0,0,7,9]];

const GRIDESIZE = 9;
let sideLength;

function setup() {
  createCanvas(windowWidth, windowHeight);

  if (windowWidth < windowHeight) {
    sideLength = windowWidth/GRIDESIZE;
  }
  else {
    sideLength = windowHeight/GRIDESIZE;
  }
}

function draw() {
  background(220);
  generateGrid();
}

function generateGrid() {
  for (let y = 0; y < GRIDESIZE; y ++) {
    for (let x = 0; x < GRIDESIZE; x ++) {
      strokeWeight(1);
      fill("white");
      square(sideLength * x, sideLength * y, sideLength);
      //display sudoku value
      if (sudoku[y][x] !== 0) {

        if (sudoku[y][x] !== initialState[y][x]) {
          fill("grey");
        }
        else {
          fill("black");
        }
        textSize(sideLength * 0.75);
        textAlign(CENTER, CENTER);

        text(sudoku[y][x], sideLength * x + sideLength/2, sideLength * y + sideLength/2);
      }
    }
  }
  strokeWeight(6);
  line(sideLength * 3, 0, sideLength * 3, sideLength * 9);
  line(sideLength * 6, 0, sideLength * 6, sideLength * 9);
  line(0, sideLength * 3, sideLength * 9, sideLength * 3);
  line(0, sideLength * 6, sideLength * 9, sideLength * 6);
}

function mousePressed() {
  let corX = floor(mouseX/sideLength);
  let corY = floor(mouseY/sideLength);
  changeCell(corX, corY);
}

function changeCell(x, y) {
  if (sudoku[y][x] !== initialState[y][x] || sudoku[y][x] === 0) {
    // < 10
    sudoku[y][x] = (sudoku[y][x] + 1) % 10;
  }
}