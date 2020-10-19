// local storage demo
// 10/19/2020

let numberOfClicks = 0;
let highScore = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  highScore = getItem("maxClicks");
}

function draw() {
  background(0);
  displayClick();
  largestClickScore();
}

function mousePressed() {
  numberOfClicks += 1;
  if (numberOfClicks > highScore) {
    storeItem("maxClicks", numberOfClicks);
  }
}

function displayClick() {
  fill("white");
  textSize(60);
  textAlign(CENTER, CENTER);
  text(numberOfClicks, width/2, height/2);
}

function largestClickScore() {
  fill("gold");
  textSize(40);
  textAlign(CENTER, CENTER);
  text(highScore, width/2, height/2 + 150);
}
