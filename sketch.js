let drawing_left_margin;
let drawing_right_margin;
let drawing_top_margin;
let drawing_bottom_margin;
let drawing_width;
let drawing_height;
let w, h;
let goal_sum;
let current_sum;
let coin;
let vis;
function setup() {
  w = 540;
  h = 960;
  createCanvas(w, h);
  vis = createGraphics(w, h);
  drawing_left_margin = 40;
  drawing_right_margin = 40;
  drawing_top_margin = 100;
  drawing_bottom_margin = 160;
  drawing_width = w - drawing_left_margin - drawing_right_margin;
  drawing_height = h - drawing_top_margin - drawing_bottom_margin;
  vis.noLoop()
  noLoop();
  goal_sum = createInput();
  goal_sum.position(20, 65);
  goal_sum.size(100);
  goal_sum.value(2000000);
  goal_sum_label = createElement('h2', 'Ciljna suma:');
  goal_sum_label.position(20, 5);
  current_sum = createInput();
  current_sum.position(20, 165);
  current_sum.size(100);
  current_sum.value(156000);
  current_sum_label = createElement('h2', 'Trenutna suma:');
  current_sum_label.position(20, 105);
  button = createButton('nacrtaj');
  button.position(20, 200);
  button.mousePressed(visualize);
  coin = loadImage('data/coin.png');
}

function draw() { 

}
function getGoalSum() {
  console.log(goal_sum.value());
  return goal_sum.value();
}
function getCurrentSum() {
  console.log(goal_sum.value());
  return current_sum.value();
}
function getDonatedSum() {
  return 4000;
}
function toCurrency(num) {
  let cur = new Intl.NumberFormat('sr-SR', { style: 'currency', currency: 'RSD' }).format(num);
  return cur;
}
function box_filled(x, y, bw, bh) {
  let r = random(255);
  let g = random(255);
  let b = random(255);
  vis.fill(r, g, b, 50);
  vis.stroke(r, g, b, 50);
  vis.rect(x, y, bw, -bh);
  let circle_radius = 0.5 * min(bw, bh);
  vis.fill(255, 255, 255, 50);
  vis.stroke(255, 255, 255, 50);
  vis.circle(x + 0.5 * bw, y - 0.5 * bh, circle_radius);
}
function box_filled1(x, y, bw, bh) {
//draw png image from data/coin.png
 // vis.image(coin, x, y, bw, -bh);
//draw circle
  let circle_radius = 0.9 * min(bw, bh);
  //dark yellow
  vis.fill(242, 160, 7);
  vis.stroke(255, 255, 255, 50);
  vis.circle(x + 0.5 * bw, y - 0.5 * bh, circle_radius);
}
function box_empty(x, y, bw, bh) {
    let circle_radius = 0.9 * min(bw, bh);
    //light grey
    vis.fill(242, 242, 242);
    vis.stroke(255, 255, 255, 50);
    vis.circle(x + 0.5 * bw, y - 0.5 * bh, circle_radius);
}
function visualize() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let current_date = `${day}-${month}-${year}`
  vis.clear();
  vis.smooth();
  vis.background(250, 250, 250);
  vis.rectMode(CORNER);
  vis.stroke(0, 0, 0, 150);
  vis.fill(0, 0, 0, 150);
  vis.push();
  vis.translate(drawing_left_margin, h - drawing_bottom_margin);
  vis.noFill()
  vis.stroke(0, 0, 0, 150);
  vis.rectMode(CORNER);
  vis.rect(-5, 5, drawing_width+10, -drawing_height-10-0.45*drawing_top_margin,10,10,10,10);
  vis.stroke(250, 250, 250);
  vis.strokeWeight(3)
  vis.line(75, -drawing_height-5-0.45*drawing_top_margin, drawing_width - 75, -drawing_height-5-0.45*drawing_top_margin);
  let n = 34;
  let m = 60;
  let last_row = 0;
  let box_price = getGoalSum() / (n * m);
  let rect_width = drawing_width / n;
  let rect_height = drawing_height / m;
  coin.resize(rect_width, rect_height)
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++){
      let count = i * n + j;
      let x = j * rect_width;
      let y = -i * rect_height;
      if (count*box_price < getCurrentSum()) {
        box_filled1(x, y, rect_width, rect_height);
        last_row = i;
      } else {
        box_empty(x, y, rect_width, rect_height);
      }
    }
  }
  vis.pop();
  vis.fill(0, 0, 0, 150);
  vis.noStroke()
  vis.textFont('Courier New');  
  vis.textSize(drawing_top_margin / 3.5);
  vis.rectMode(CENTER);
  vis.textAlign(CENTER, CENTER);
  vis.textSize(32);
  vis.text(toCurrency(getGoalSum()), w / 2, drawing_top_margin / 2);
  vis.textSize(drawing_top_margin / 3.5);
  vis.text(current_date, w / 2, h - drawing_bottom_margin / 4);vis.text(toCurrency(getCurrentSum()), w / 2, h - drawing_bottom_margin - last_row*rect_height - drawing_top_margin / 3.5);
  
  saveCanvas(vis, current_date, 'jpg')
}