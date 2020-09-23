// Traffic light demo
// Victor Wu
// 9/23/2020

let currentLight = "red"; 
let switchTime = 1000;
let lastSwitch = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  lightOutline();
  lightCol();
  lightSwitch();
  waitTime();
}

function lightOutline() {
  //box
  rectMode(CENTER);
  fill("black");
  rect(width/2, height/2, 75, 200, 10);
  
  //lights
  fill("white");
  circle(width/2, height/2 - 65, 50);
  circle(width/2, height/2, 50);
  circle(width/2, height/2 + 65, 50);
}

function lightCol() {
  if (currentLight === "red") {
    fill ("red");
    circle(width/2, height/2 - 65, 50);
  }
  else if (currentLight === "yellow"){
    fill("yellow");
    circle(width/2, height/2, 50);
  }
  else if (currentLight === "green") {
    fill("green");
    circle(width/2, height/2 + 65, 50);
  }
}

function lightSwitch() {
  if (millis()> lastSwitch + switchTime) {
    if (currentLight === "red") {
      currentLight = "green";
      lastSwitch = millis();
    }
    else if (currentLight === "green") {
      currentLight = "yellow";
      lastSwitch = millis();
    }
    else if (currentLight === "yellow") {
      currentLight = "red";
      lastSwitch = millis();
    }
  }
}

function waitTime() {
  if (currentLight === "red" || currentLight === "green") {
    switchTime = 4000;
  }
  else {
    switchTime = 1000;
  }
}