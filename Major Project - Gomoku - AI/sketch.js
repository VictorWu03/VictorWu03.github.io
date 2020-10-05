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
let winner = null;

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
  checkWin();
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
  if (board[y][x] === 0) {
    if (currentMove === "white") {
      board[y][x] = 1;
      fill(currentMove);
      circle(cellSize * x + centerPlayX + cellSize/2, cellSize * y + centerPlayY + cellSize/2, cellSize * 0.85);
      currentMove = "black";
    }
    else {
      board[y][x] = -1;
      fill(currentMove);
      circle(cellSize * x + centerPlayX + cellSize/2, cellSize * y + centerPlayY + cellSize/2, cellSize * 0.85);
      currentMove = "white";
    }
  }
  return board;
}

function checkWin() {
  let consecutive = 0;
  let currentState = null;
  //vertical
  for(let x = 0; x < board.length - 4; x ++) {
    for (let y = 0; y < board.length; y ++) {
      if (currentState === null) {
        currentState = board[y][x];
      }
      else if (currentState === board[y][x]) {
        consecutive += 1;
      }
      else {
        currentState = board[x][y];
        consecutive = 0;
      }
    }
  }

}
