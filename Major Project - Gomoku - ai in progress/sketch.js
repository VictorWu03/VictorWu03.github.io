// Gomoku
// 10/1/2020 - 

let state = "menu";
let turnState = "human";

let cellSize;
const BOARDDIMENSION = 18; // visable grid displayed on the board
const PLAYDIMENSION = 19; // invisable grid to place pieces on

let centerBoardX;
let centerBoardY;
let centerPlayX;
let centerPlayY;

let board = [];

let currentMove = "white";
let winner;

let whitePoints = 0;
let blackPoints = 0;
let score;
let bestXYMap = new Map();


function setup() {
  createCanvas(windowWidth, windowHeight);
  // background(218, 184, 136); //Wooden board color

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
  displayMenu();

  restart();
  returnToMenu();
  playerTurnBar();

  checkWin();
  displayWin();
  computerMove();
}

//menu interface - switching between the states of menu and game
function keyPressed() {
  if (key === "s") {
    gameSetup();
    state = "play";
  }
}

function gameSetup() {
  background(218, 184, 136);
  displayBoard();
  generatePlayBoard();
  currentMove = "black";
  turnState = "human";
  state = "play";
}

function displayWin() {
  if (state === "win") {
    if (winner === "W"){
      //winner message - white
      fill(255, 255, 255, 10);
      // rectMode(CENTER);
      rect(width/2 - width * 0.3, height/2 - height * 0.25/2, width * 0.6, height * 0.25);
      fill("black");
      textSize(width * 0.05);
      textAlign(CENTER, CENTER);
      text("White Wins", width/2, height/2);
    }
    else if (winner === "B") {
      //winner message - black
      fill(0, 0, 0, 10);
      // rectMode(CENTER);
      rect(width/2 - width * 0.3, height/2 - height * 0.25/2, width * 0.6, height * 0.25);
      fill("white");
      textSize(width * 0.05);
      textAlign(CENTER, CENTER);
      text("Black Wins", width/2, height/2);
    }
  }
}

//restart button
function restart() {
  if (state === "win" || state === "play") {
    fill("black");
    rect(width * 0.8, height * 0.8, width*0.15, height * 0.1);
    fill("white");
    textSize(width * 0.02);
    text("Restart", width * 0.8 + width*0.15/2, height * 0.8 + height * 0.1/2);
    if (mouseX > width * 0.8 && mouseX < width * 0.8 + width*0.15 && mouseY >  height * 0.8 && mouseY <  height * 0.8 + height * 0.1) {
      fill("white");
      rect(width * 0.8, height * 0.8, width*0.15, height * 0.1);
      fill("black");
      text("Restart", width * 0.8 + width*0.15/2, height * 0.8 + height * 0.1/2);
      if(mouseIsPressed) {
        gameSetup();
      }
    }
  }
}

function returnToMenu() {
  if (state === "win" || state === "play") {
    fill("black");
    rect(width * 0.8, height * 0.7, width*0.15, height * 0.1);
    fill("white");
    textSize(width * 0.02);
    text("Home", width * 0.8 + width*0.15/2, height * 0.7 + height * 0.1/2);
    if (mouseX > width * 0.8 && mouseX < width * 0.8 + width*0.15 && mouseY >  height * 0.7 && mouseY <  height * 0.7 + height * 0.1) {
      fill("white");
      rect(width * 0.8, height * 0.7, width*0.15, height * 0.1);
      fill("black");
      text("Home", width * 0.8 + width*0.15/2, height * 0.7 + height * 0.1/2);
      if(mouseIsPressed) {
        state = "menu";
      }
    }
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//game elements
function displayMenu() {
  if (state === "menu") {
    background(0);
    fill("white");
    textSize(width * 0.02);
    textAlign(CENTER, CENTER);
    text("GOMOKU", width/2, height/3);
    text("press 's' to start a game", width/2, height/2);
  }
}

function playerTurnBar() {
  if (state === "play" || state === "win") {
    fill(currentMove);
    rect(centerBoardX, height * 0.98, cellSize * BOARDDIMENSION, height * 0.01);
  }
}

//displaying the playing board
function displayBoard() {
  background(218, 184, 136);
  for (let x = 0; x < BOARDDIMENSION; x ++) {
    for (let y = 0; y < BOARDDIMENSION; y ++) {
      stroke(0);
      noFill();
      square(cellSize * x + centerBoardX, cellSize * y + centerBoardY, cellSize);
    }
  }
}

//generating board for play pieces to appear on
function generatePlayBoard() {
  board = [];
  for (let x = 0; x < PLAYDIMENSION; x ++) {
    board.push([]);
    for (let y = 0; y < PLAYDIMENSION; y ++) {
      noStroke();
      noFill();
      square(cellSize * x + centerPlayX, cellSize * y + centerPlayY, cellSize);
      board[x].push(null);
    }
  }
  return board;
}

//placing playing pieces
function mousePressed() {
  if (state === "play" && turnState === "human") {
    // corX and corY adjusting for the centered grid
    let corX = floor(mouseX/cellSize - centerPlayX/cellSize); 
    let corY = floor(mouseY/cellSize - centerPlayY/cellSize);
    placeMarker(corX, corY);
    console.log(corX, corY);
  }
  evaluateBoardState();

}

//saving information of current cell i.e. black, white, and null into the 2D-array
function placeMarker(x, y) {
  if (board[y][x] === null) {
    if (currentMove === "white") {
      board[y][x] = "W";
      fill(currentMove);
      circle(cellSize * x + centerPlayX + cellSize/2, cellSize * y + centerPlayY + cellSize/2, cellSize * 0.85);
      currentMove = "black";
    }
    else {
      board[y][x] = "B";
      fill(currentMove);
      circle(cellSize * x + centerPlayX + cellSize/2, cellSize * y + centerPlayY + cellSize/2, cellSize * 0.85);
      currentMove = "white";
    }
    turnState = "computer";
    return board;
  }
}

//Checking for 5 in a row;
function checkWin() {
  if (state === "play") {
    //horozontal
    for(let x = 0; x < board.length; x ++) {
      for (let y = 0; y < board.length; y ++) {
        if (board[y][x] !== null) {
          //horozontal
          if (x < board.length - 4) { //checking boundaries 
            if ((board[y][x] === board[y][x + 1]) && (board[y][x] === board[y][x + 2]) && (board[y][x] === board[y][x + 3]) && (board[y][x] === board[y][x + 4])) {
              winner = board[y][x];
              state = "win";
              return winner;
            }
          }
          //vertical
          if (y < board.length - 4) {
            if ((board[y][x] === board[y + 1][x]) && (board[y][x] === board[y + 2][x]) && (board[y][x] === board[y + 3][x]) && (board[y][x] === board[y + 4][x])) {
              winner = board[y][x];
              state = "win";
              return winner;
            }
          }
          //diagonal down-right
          if (y < board.length - 4 && x < board.length - 4) {
            if ((board[y][x] === board[y + 1][x + 1]) && (board[y][x] === board[y + 2][x + 2]) && (board[y][x] === board[y + 3][x + 3]) && (board[y][x] === board[y + 4][x + 4])) {
              winner = board[y][x];
              state = "win";
              return winner;
            }
          }
          //diagonal up-right
          if (x < board.length - 4 && y > 3) {
            if ((board[y][x] === board[y - 1][x + 1]) && (board[y][x] === board[y - 2][x + 2]) && (board[y][x] === board[y - 3][x + 3]) && (board[y][x] === board[y - 4][x + 4])) {
              winner = board[y][x];
              state = "win";
              return winner;
            }
          }
        }
      }
    }
  }
}

function evaluateBoardState() {
  //consecutive
  blackPoints = 0;
  whitePoints = 0;

  if (state === "play") {
    //horozontal
    for(let x = 0; x < board.length; x ++) {
      for (let y = 0; y < board.length; y ++) {
        if (board[y][x] === "W") {
          //horozontal
          if (x < board.length - 4) { //checking boundaries 
            if (board[y][x] === board[y][x + 1]) {
              if (board[y][x] === board[y][x + 2]) {
                if (board[y][x] === board[y][x + 3]) {
                  if (board[y][x] === board[y][x + 4]) {
                    whitePoints += 3125;
                  }
                  else{
                    whitePoints += 625;
                  }
                }
                else {
                  whitePoints += 125;
                }
              }
              else {
                whitePoints += 25;
              }
            }
            else {
              whitePoints += 5;
            }
          }
          // Vertical
          if (y < board.length - 4) { //checking boundaries 
            if (board[y][x] === board[y + 1][x]) {
              if (board[y][x] === board[y + 2][x]) {
                if (board[y][x] === board[y + 3][x]) {
                  if (board[y][x] === board[y + 4][x]) {
                    whitePoints += 3125;
                  }
                  else{
                    whitePoints += 625;
                  }
                }
                else {
                  whitePoints += 125;
                }
              }
              else {
                whitePoints += 25;
              }
            }
            else {
              whitePoints += 5;
            }
          }
          //diagonal down-right
          if (y < board.length - 4 && x < board.length - 4) { //checking boundaries 
            if (board[y][x] === board[y + 1][x + 1]) {
              if (board[y][x] === board[y + 2][x + 2]) {
                if (board[y][x] === board[y + 3][x + 3]) {
                  if (board[y][x] === board[y + 4][x + 4]) {
                    whitePoints += 3125;
                  }
                  else{
                    whitePoints += 625;
                  }
                }
                else {
                  whitePoints += 125;
                }
              }
              else {
                whitePoints += 25;
              }
            }
            else {
              whitePoints += 5;
            }
          }
          //diagonal up-right
          if (x < board.length - 4 && y > 3) { //checking boundaries 
            if (board[y][x] === board[y - 1][x + 1]) {
              if (board[y][x] === board[y - 2][x + 2]) {
                if (board[y][x] === board[y - 3][x + 3]) {
                  if (board[y][x] === board[y - 4][x + 4]) {
                    whitePoints += 3125;
                  }
                  else{
                    whitePoints += 625;
                  }
                }
                else {
                  whitePoints += 125;
                }
              }
              else {
                whitePoints += 25;
              }
            }
            else {
              whitePoints += 5;
            }
          }
          // acounting for openSpaces
          if (x > 4 && x < board.length - 4 && y > 4 && y < board.length - 4) {
            let openSpace = 0;
            for (let i = -4; i < 5; i ++) {
              for (let j = -4; j < 5; j ++) {
                if (board[y + j][i + x] === null) {
                  openSpace += 1;
                }
              }
            }
            if (openSpace >= 80) {
              whitePoints += 16;
            }
            else if (openSpace >= 50) {
              whitePoints += 8;
            }
            else if (openSpace >= 20) {
              whitePoints += 4;
            }
            else {
              whitePoints += 2;
            }
          }
        }
      }
    }


    for(let x = 0; x < board.length; x ++) {
      for (let y = 0; y < board.length; y ++) {
        if (board[y][x] === "B") {
          //horozontal
          if (x < board.length - 4) { //checking boundaries 
            if (board[y][x] === board[y][x + 1]) {
              if (board[y][x] === board[y][x + 2]) {
                if (board[y][x] === board[y][x + 3]) {
                  if (board[y][x] === board[y][x + 4]) {
                    blackPoints -= 3125;
                  }
                  else{
                    blackPoints -= 625;
                  }
                }
                else {
                  blackPoints -= 125;
                }
              }
              else {
                blackPoints -= 25;
              }
            }
            else {
              blackPoints -= 5;
            }
          }
          // Vertical
          if (y < board.length - 4) { //checking boundaries 
            if (board[y][x] === board[y + 1][x]) {
              if (board[y][x] === board[y + 2][x]) {
                if (board[y][x] === board[y + 3][x]) {
                  if (board[y][x] === board[y + 4][x]) {
                    blackPoints -= 3125;
                  }
                  else{
                    blackPoints -= 625;
                  }
                }
                else {
                  blackPoints -= 125;
                }
              }
              else {
                blackPoints -= 25;
              }
            }
            else {
              blackPoints -= 5;
            }
          }
          //diagonal down-right
          if (y < board.length - 4 && x < board.length - 4) { //checking boundaries 
            if (board[y][x] === board[y + 1][x + 1]) {
              if (board[y][x] === board[y + 2][x + 2]) {
                if (board[y][x] === board[y + 3][x + 3]) {
                  if (board[y][x] === board[y + 4][x + 4]) {
                    blackPoints -= 3125;
                  }
                  else{
                    blackPoints -= 625;
                  }
                }
                else {
                  blackPoints -= 125;
                }
              }
              else {
                blackPoints -= 25;
              }
            }
            else {
              blackPoints -= 5;
            }
          }
          //diagonal up-right
          if (x < board.length - 4 && y > 3) { //checking boundaries 
            if (board[y][x] === board[y - 1][x + 1]) {
              if (board[y][x] === board[y - 2][x + 2]) {
                if (board[y][x] === board[y - 3][x + 3]) {
                  if (board[y][x] === board[y - 4][x + 4]) {
                    blackPoints -= 3125;
                  }
                  else{
                    blackPoints -= 625;
                  }
                }
                else {
                  blackPoints -= 125;
                }
              }
              else {
                blackPoints -= 25;
              }
            }
            else {
              blackPoints -= 5;
            }
          }
          if (x > 4 && x < board.length - 4 && y > 4 && y < board.length - 4) {
            let openSpace = 0;
            for (let i = -4; i < 5; i ++) {
              for (let j = -4; j < 5; j ++) {
                if (board[y + j][i + x] === null) {
                  openSpace += 1;
                }
              }
            }
            if (openSpace >= 80) {
              blackPoints -= 16;
            }
            else if (openSpace >= 50) {
              blackPoints -= 8;
            }
            else if (openSpace >= 20) {
              blackPoints -= 4;
            }
            else {
              blackPoints -= 2;
            }
          }
        }
      }
    }
    score = whitePoints + blackPoints;
    console.log(whitePoints);
    console.log(blackPoints);
    console.log(score);
    return score;
  }
}

function bestMove() {
  if (currentMove === "black") {
    let highScore = Infinity;
  
    for(let x = 0; x < board.length; x ++) {
      for (let y = 0; y < board.length; y ++) {
        if(board[y][x] === null) {
          board[y][x] = "B";
          evaluateBoardState();
          if (score < highScore) {
            bestXYMap.set("x", x);
            bestXYMap.set("y", y);
            highScore = score;
          }
          board[y][x] = null;
        }
      }
    }
    console.log(bestXYMap);
    console.log(highScore);
  }
  else if (currentMove === "white") {
    let highScore = -Infinity;
  
    for(let x = 0; x < board.length; x ++) {
      for (let y = 0; y < board.length; y ++) {
        if(board[y][x] === null) {
          board[y][x] = "W";
          evaluateBoardState();
          if (score > highScore) {
            bestXYMap.set("x", x);
            bestXYMap.set("y", y);
            highScore = score;
          }
          board[y][x] = null;
        }
      }
    }
    console.log(bestXYMap);
    console.log(highScore);
  }
}

function computerMove() {
  if (state === "play" && turnState === "computer") {

    bestMove();
    let bestX = bestXYMap.get("x");
    let bestY = bestXYMap.get("y");

    if (currentMove === "black") {

      board[bestY][bestX] = "B";
      fill(currentMove);
      circle(cellSize * bestX + centerPlayX + cellSize/2, cellSize * bestY + centerPlayY + cellSize/2, cellSize * 0.85);
      currentMove = "white";
      turnState = "human";
      return board;

    }
    else if (currentMove === "white") {

      board[bestY][bestX] = "W";
      fill(currentMove);
      circle(cellSize * bestX + centerPlayX + cellSize/2, cellSize * bestY + centerPlayY + cellSize/2, cellSize * 0.85);
      currentMove = "black";
      turnState = "human";
      return board;
    }
  }
}
