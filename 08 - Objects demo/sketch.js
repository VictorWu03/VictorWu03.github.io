// Objects demo
// 10/5/2020

let myWalker;
let myWalker1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  myWalker = new Walker(width/2, height/2, "cyan");
  myWalker1 = new Walker(200, 100, "pink");
}

function draw() {
  myWalker.display();
  myWalker.move();
  myWalker1.display();
  myWalker1.move();
}

class Walker {
  constructor(x, y, theColor) { // everything in a class is a function - no need to type function
    this.x = x;
    this.y = y;
    this.color = theColor;
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      //left
      this.x -= 5;
    }
    else if (choice < 50) {
      this.x += 5;
    }
    else if (choice < 75) {
      this.y -= 5;
    }
    else {
      this.y += 5;
    }
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, 10);
  }
}