let drawing_left_margin;
let drawing_right_margin;
let drawing_top_margin;
let drawing_bottom_margin;
let drawing_width;
let drawing_height;
let w, h;
function setup() {
  w = 540;
  h = 960;
  createCanvas(w, h);
//  noFill();
  smooth();
  //stroke(0, 0, 0, 0);
  //light blue background
  background(0, 0, 255, 50);
  //define drawing area
  drawing_left_margin = 40;
  drawing_right_margin = 40;
  drawing_top_margin = 100;
  drawing_bottom_margin = 160;
  drawing_width = w - drawing_left_margin - drawing_right_margin;
  drawing_height = h - drawing_top_margin - drawing_bottom_margin;
  noLoop()
}

function draw() {
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(drawing_top_margin / 2.7);
  textFont('Courier New');  
  fill(0, 0, 0, 150);
  noStroke()
  text(toCurrency(getGoalSum()), w / 2, drawing_top_margin / 2);
  rectMode(CORNER);
  textSize(drawing_top_margin / 3.5);
  textAlign(RIGHT, BOTTOM);
  text(toCurrency(getCurrentSum()), w / 2, h - 3 * drawing_bottom_margin / 4);
  fill(0, 0, 0, 220);
  text("+" + toCurrency(getDonatedSum()), w / 2, h - drawing_bottom_margin / 2);
  stroke(0, 0, 0, 150);
  fill(0, 0, 0, 150);
  line(drawing_left_margin, h - drawing_bottom_margin/2, drawing_left_margin + drawing_width/2, h - drawing_bottom_margin/2); 
  noStroke()
  let result = getCurrentSum() + getDonatedSum(); 
  text(toCurrency(result), w / 2, h - drawing_bottom_margin/4);
  stroke(0, 0, 0, 150);
  line(1.4*drawing_left_margin, 3*drawing_top_margin/4, w - 1.4*drawing_right_margin, 3*drawing_top_margin/4);
  translate(drawing_left_margin, h - drawing_bottom_margin);
  //draw rectangle
  noFill()
  stroke(0, 0, 0, 150);
  rectMode(CORNER);
  rect(0, 0, drawing_width, -drawing_height);
  //draw n x m grid of rectangles in drawing area
  let n = 34;
  let m = 60;
  let rect_width = drawing_width / n;
  let rect_height = drawing_height / m;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++){
      let x = i * rect_width;
      let y = -j * rect_height;
      let r = random(255);
      let g = random(255);
      let b = random(255);
      fill(r, g, b, 50);
      stroke(r, g, b, 50);
      rect(x, y, rect_width, -rect_height);
      //draw a circle at x, y
      let circle_radius = 0.5 * min(rect_width, rect_height);
      fill(255, 255, 255, 50);
      stroke(255, 255, 255, 50);
      circle(x + 0.5 * rect_width, y - 0.5 * rect_height, circle_radius);
    }
  }
}
//function that gets the goal sum
function getGoalSum() {
  //let goalSum = document.getElementById("goalSum").value;
  return 2000000;
}
function getCurrentSum() {
  return 150000;
}
function getDonatedSum() {
  return 4000;
}
function toCurrency(num) {
  let cur = new Intl.NumberFormat('sr-SR', { style: 'currency', currency: 'RSD' }).format(num);
  return cur;
}