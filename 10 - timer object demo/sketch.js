// timer object demo
// 10/7/2020

let blinkTime;

function setup() {
  createCanvas(windowWidth, windowHeight);
  blinkTime = new Timer(1000);
}

function draw() {
  if (blinkTime.isDone()) {
    background("red");
    blinkTime.setWaitTime(2000);
    blinkTime.reset();
  }
  else{
    background(220);
  }
  
}

class Timer {
  constructor(waitTime) {
    this.waitTime = waitTime;
    this.startTime = millis();
    this.endTime = this.startTime + this.waitTime;
  }

  isDone() {
    return millis() >= this.endTime;
  }

  reset() {
    this.startTime = millis();
    this.endTime = this.startTime + this.waitTime;
  }

  setWaitTime(waitTIme) {
    this.waitTime = waitTIme;
  }
}
