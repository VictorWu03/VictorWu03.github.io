// Gomoku
// 10/1/2020 - 

let cellSize;
const BOARDDIMENSION = 18; // visable grid displayed on the board
const PLAYDIMENSION = 19; // invisable grid to place pieces on

let centerBoardX;
let centerBoardY;
let centerPlayX;
let centerPlayY;

let board = [];

let currentMove = "white";

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(218, 184, 136); //Wooden board color

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
  
  generatePlayBoard();

}

function draw() {
  displayBoard();
}

function displayBoard() {
  for (let x = 0; x < BOARDDIMENSION; x ++) {
    for (let y = 0; y < BOARDDIMENSION; y ++) {
      stroke(0);
      noFill();
      square(cellSize * x + centerBoardX, cellSize * y + centerBoardY, cellSize);
    }
  }
}

function generatePlayBoard() {
  for (let x = 0; x < PLAYDIMENSION; x ++) {
    board.push([]);
    for (let y = 0; y < PLAYDIMENSION; y ++) {
      stroke(255);
      noFill();
      square(cellSize * x + centerPlayX, cellSize * y + centerPlayY, cellSize);
      board[x].push(0);
    }
  }
  return board;
}

function mousePressed() {
  // corX and corY adjusting for the centered grid
  let corX = floor(mouseX/cellSize - centerPlayX/cellSize); 
  let corY = floor(mouseY/cellSize - centerPlayY/cellSize);
  placeMarker(corX, corY);
  console.log(corX, corY);
}

function placeMarker(x, y) {
  if (board[x][y] === 0) {
    if (currentMove === "white") {
      board[x][y] = 1;
      fill(currentMove);
      circle(cellSize * x + centerPlayX + cellSize/2, cellSize * y + centerPlayY + cellSize/2, cellSize * 0.85);
      currentMove = "black";
    }
    else {
      board[x][y] = -1;
      fill(currentMove);
      circle(cellSize * x + centerPlayX + cellSize/2, cellSize * y + centerPlayY + cellSize/2, cellSize * 0.85);
      currentMove = "white";
    }
  }
  return board;
}

function checkWin() {

  //vertical
  for(let x = 0; x < board.length - 4; x ++) {
    for (let y = 0; y < board.length; y ++) {
      if(board[x][y] === board[x + 1][y] && board[x + 1][y] === board[x + 2][y] && board[x + 2][y] === board[x + 3][y] && board[x + 3][y] === board[x + 4][y]) {
        if (board === "white") {
          text("Whitewin")
        }
      }
    }

  }
}
