// Gomoku
// 10/1/2020 - 

let cellSize;
const BOARDDIMENSION = 18; // visable grid displayed on the board
const PLAYDIMENSION = 19; // invisable grid to place pieces on

let centerBoardX;
let centerBoardY;
let centerPlayX;
let centerPlayY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (windowWidth <= windowHeight) {
    cellSize = windowWidth / 20;
  }
  else {
    cellSize = windowHeight / 20;
  }
  
  //determining the padding distance to center the grid
  centerBoardX = (windowWidth - cellSize * BOARDDIMENSION) /2;
  centerBoardY = (windowHeight - cellSize * BOARDDIMENSION) /2;

  // determining the padding distance is center the playing grid
  centerPlayX = (windowWidth - cellSize * PLAYDIMENSION) /2;
  centerPlayY = (windowHeight - cellSize * PLAYDIMENSION) /2;
}

function draw() {
  background(218, 184, 136); //Wooden board color
  displayBoard();
  // generatePlayBoard();
}

function displayBoard() {
  for (let x = 0; x < BOARDDIMENSION; x ++) {
    for (let y = 0; y < BOARDDIMENSION; y ++) {
      stroke(0);
      fill(218, 184, 136);
      square(cellSize * x + centerBoardX, cellSize * y + centerBoardY, cellSize);
    }
  }
}

// function generatePlayBoard() {
//   for (let x = 0; x < PLAYDIMENSION; x ++) {
//     for (let y = 0; y < PLAYDIMENSION; y ++) {
//       stroke(255);
//       fill(218, 184, 136);
//       square(cellSize * x + centerPlayX, cellSize * y + centerPlayY, cellSize);
//     }
//   }
// }