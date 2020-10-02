// sudoku demo - 2D array demo
// 10/1/2020

let sudoku;
let initialState;

const GRIDESIZE = 9;
let sideLength;

function preload() {
  sudoku = loadStrings("assets/2.txt");
  initialState = loadStrings("assets/2.txt");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //convert sudoku text file into 2d array
  for (let i = 0; i < sudoku.length; i ++) {
    sudoku[i] = sudoku[i].split(",");
    initialState[i] = initialState[i].split(",");
  }

  //loop through array to change to num data type
  for (let y = 0; y < GRIDESIZE; y ++) {
    for(let x = 0; x < GRIDESIZE; x ++) {
      sudoku[y][x] = int(sudoku[y][x]);
      initialState[y][x] = int(initialState[y][x]);
    }
  }


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