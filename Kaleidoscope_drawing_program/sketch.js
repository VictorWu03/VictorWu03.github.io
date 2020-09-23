//Kaleidoscope drawing program
//22/09/2020
//Victor Wu
//Comp-sci 30
//
//Program information: 
//This kaleidoscope drawing program mirrors your drawing however many times depending on the symmetry that you set. CONTROLS: leftmouse: draw, mousewheel: change color, "r": reload drawing, "c": clear screen, "h": help screen, "s": start drawing
//
//fulfilled reqiurements:
// Mouse interaction is achieved through the drawing function. Keyboard interaction is achieved through the different keys used to clear screen, reload, etc. Color change is incoporated. Extra for experts has been fulfilled through its role in changing color
//////////////////////////////////////////////////////////

let lineCor = [];
let state = "help";
let r, g, b;
let symmetry = 8;
let angle = 360 / symmetry;

///////

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  r = 50;
  g = 0;
  b = 0;
}

function draw() {
  helpScreen();
  copyDrawing();
}

//function to copy user drawing based on symmetry selected

function copyDrawing() {
  if (state === "draw") {
    
    push();
    angleMode(DEGREES);
    translate(windowWidth / 2, windowHeight / 2);
    displayImg();
    pop();
    
    if (mouseIsPressed) {
      let linePos = {
        //changing the mouseX and mouseY coordinates to x and y coordinates where the origin is the center of the screen
        x: mouseX - windowWidth / 2,
        y: mouseY - windowHeight / 2,
        px: pmouseX - windowWidth / 2,
        py: pmouseY - windowHeight / 2,
      };
      lineCor.push(linePos);
    }
  }
}

function displayImg() {
  stroke(r, g, b);
  //duplicating stroke and rotating the angle upon which it is replicated
  for (let i = 0; i < symmetry; i++) {

    for (let n = 0; n < lineCor.length; n++) {
      rotate(angle);
      line(lineCor[n].x, lineCor[n].y, lineCor[n].px, lineCor[n].py);
      push();
      scale(1, -1);
      line(lineCor[n].x, lineCor[n].y, lineCor[n].px, lineCor[n].py);
      pop();
    }
  }
}

// Changing color of the stroke with the mousewheel - This is one of the extra for experts reqiurements that I included
function mouseWheel() {
  if (event.deltaY > 0) {
    if (r < 255) {
      r += 10;
    } else if (g < 255) {
      g += 10;
    } else if (b < 255) {
      b += 10;
    }

  } else {
    if (r > 0) {
      r -= 10;
    } else if (g > 0) {
      g -= 10;
    } else if (b > 0) {
      b -= 10;
    }
  }
}

// helpscreen with instructions and keybinds

function helpScreen() {
  if (state === "help") {
    background(160);
    textAlign(CENTER, CENTER);
    textSize(windowWidth * 0.04);
    text("Welcome to this kaleidiscope drawing program", windowWidth / 2, windowHeight / 3);
    textSize(windowWidth * 0.015);
    text("To change color, scroll the mousewheel. Press 's' to start drawing. Press 'c' to clear the screen. Press 'h' to return to return to this help screen.", windowWidth / 2, 1.5 * windowHeight / 3);
  }
}

//commands for the keybinds
function keyTyped() {
  if (key === "c") {
    setup();
    lineCor = [];
  }

  if (key === "h") {
    setup();
    state = "help";
  }

  if (key === "s") {
    setup();
    state = "draw";  
  }

}