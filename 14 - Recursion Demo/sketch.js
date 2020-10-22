// sierpinski triangle
// Date

let triCor = [
  {x: 600, y: 50},
  {x: 100, y: 750},
  {x: 1100, y: 750}
];

let levelsDeep = 1;

function mousePressed() {
  levelsDeep += 1;
  if (levelsDeep > 7) {
    levelsDeep = 1;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  sierpinski(triCor, levelsDeep);
  
}

function sierpinski(points, depth) {
  let theColors = ["red", "pink", "purple", "blue", "white", "cyan"];
  fill(theColors[depth % theColors.length]);
  noStroke();
  
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);

  if (depth > 0) {
    sierpinski([points[0], getMidPoint(points[0], points[1]), getMidPoint(points[0], points[2])], depth - 1);

    sierpinski([points[1], getMidPoint(points[0], points[1]), getMidPoint(points[1], points[2])], depth - 1);

    sierpinski([points[2], getMidPoint(points[1], points[2]), getMidPoint(points[0], points[2])], depth - 1);
  }
}

function getMidPoint(point1, point2) {
  let xDiff = point1.x + point2.x;
  let yDiff = point1.y + point2.y;
  let midPoint = {x: xDiff/2, y: yDiff/2};
  return midPoint;
}