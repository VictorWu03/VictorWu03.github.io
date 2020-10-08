// Ball objects demo and object interaction
// 10/8/2020

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);


  //spawn balls into the array
  for (let i = 0; i < 25; i ++) {
    ballArray.push(new Ball(random(100, width - 100), random(100, height - 100)));
  }
}

function draw() {
  background(0);

  for (let i = 0; i < ballArray.length; i ++) {
    ballArray[i].move();

    for (let j = 0; j < ballArray.length; j ++) {
      if (i !== j) {
        ballArray[i].collisionCheck(ballArray[j]);
      }
    }
    ballArray[i].display();
  }
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.radius = random(10, 20);
    this.fillColor = "white";
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    //bounce off edge
    if(this.x + this.dx <= 0 + this.radius || this.x + this.dx >= width - this.radius){
      this.dx = this.dx *-1;
    }
    if(this.y + this.dy <= 0 + this.radius || this.y + this.dy >= height - this.radius){
      this.dy = this.dy *-1;
    }
  }

  display() {
    fill(this.fillColor);
    circle(this.x, this.y, this.radius * 2);
  }

  collisionCheck(otherBall) {
    let distanceApart = dist(this.x, this.y, otherBall.x, otherBall.y);
    let radiSum = this.radius + otherBall.radius;
    if (distanceApart <= radiSum) {
      this.fillColor = "cyan";

      let tempDx = this.dx;
      let tempDy = this.dy;

      this.dx = otherBall.dx;
      this.dy = otherBall.dy;

      otherBall.dx = tempDx;
      otherBall.dy = tempDy;
    }
  }
}