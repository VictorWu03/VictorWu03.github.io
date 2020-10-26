// Project Title
// Date

let object;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  object = new drawing(width/2, height/2, "cyan", 5);
}

function draw() {
  object.move();
  object.display();
}

class drawing {
  constructor(x, y, color, diameter) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.diameter = diameter;
  }

  move() {
    let choice = random(100)
    if (choice < 25) {
      this.x += 5;
    }
    else if (choice < 50) {
      this.x -= 5;
    }
    else if (choice < 75) {
      this.y += 5;
    }
    else {
      this.y -= 5;
    }
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.diameter);
  }
}
