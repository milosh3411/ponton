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
let font;
let brand;
let qr;
function preload() {
  font = loadFont("data/Alice-Regular.ttf");
  brand = loadImage("data/150.png");
  qr = loadImage("data/qr.png");
}
function setup() {
  w = 540;
  h = 1200;
  createCanvas(w, h);
  vis = createGraphics(w, h);
  drawing_left_margin = 40;
  drawing_right_margin = 40;
  drawing_top_margin = 100;
  drawing_bottom_margin = 200;
  drawing_width = w - drawing_left_margin - drawing_right_margin;
  drawing_height = h - drawing_top_margin - drawing_bottom_margin;
  vis.textFont(font);
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
  let cur = new Intl.NumberFormat('sr-SR').format(num);
  return cur.toString().replace(/\./g, " ") + " дин. ";
}
function box_filled1(x, y, bw, bh) {
//draw circle
  let circle_radius = 0.9 * min(bw, bh);
  //dark yellow
  vis.fill(242, 160, 7);
  vis.stroke(255, 255, 255, 50);
  vis.circle(x + 0.5 * bw, y - 0.5 * bh, circle_radius);
  //light yellow
  vis.fill(242, 242, 7);
  //small circle inside
  vis.circle(x + 0.55 * bw, y - 0.55 * bh, 0.2 * circle_radius);
}
function box_empty(x, y, bw, bh) {
    let circle_radius = 0.9 * min(bw, bh);
    //light grey
    vis.fill(242, 242, 242);
    vis.stroke(255, 255, 255, 50);
    vis.circle(x + 0.5 * bw, y - 0.5 * bh, circle_radius);
}
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  vis.beginShape();
  for (let a = -PI/16; a < TWO_PI - PI/16; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vis.vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vis.vertex(sx, sy);
  }
  vis.endShape(CLOSE);
}
function visualize() {
  let n = 24;
  let m = 42;
  let rect_width = drawing_width / n;
  let rect_height = drawing_height / m;
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let current_date = `${day}-${month}-${year}`
  //brand.resize(0.17 * drawing_width, 0.17 * drawing_width)
  //brand.resize(.8*drawing_width,0.8*drawing_width)
  vis.clear();
  vis.smooth();
  vis.background(250, 250, 250);
  //vis.image(brand, drawing_left_margin - 15, 5)
  vis.rectMode(CORNER);
  vis.stroke(0, 0, 0, 150);
  vis.fill(0, 0, 0, 150);
  vis.push();
  vis.translate(drawing_left_margin, h - drawing_bottom_margin);
  //vis.image(brand, 0.1*drawing_width, -0.5*drawing_height)
  vis.noFill()
  vis.stroke(0, 0, 0, 150);
  vis.rectMode(CORNER);
  vis.strokeWeight(3)
  vis.rect(-10, 10, drawing_width+20, -m * rect_height,10,10,10,10);
  vis.stroke(250, 250, 250);
  vis.strokeWeight(5)
  vis.line(60, -m * rect_height + 10, drawing_width - 60, -m * rect_height + 10);
  let last_row = 0;
  let count = 0;
  let box_price = getGoalSum() / 1000;
  let lx = 0*rect_width;
  let ly = 2*rect_height;
  vis.fill(255,69,0);
  vis.stroke(255, 255, 255, 50);
  star(lx + 0.5 * rect_width, ly - 0.5 * rect_height, 0.25 * rect_width, .5*rect_width, 5);
  vis.textSize(16)
  vis.text(toCurrency(box_price),lx + 0.5 * rect_width + 10, ly - 0.5 * rect_height + 5);

  coin.resize(rect_width, rect_height)
  for (let i = 0; i < m - 1; i++) {
    for (let j = 0; j < n; j++){
      count++;
      let x = j * rect_width;
      let y = -i * rect_height;
      if (count*box_price <= getCurrentSum()) {
        vis.fill(255,69,0);
        vis.stroke(255, 255, 255, 50);
        star(x + 0.5 * rect_width, y - 0.5 * rect_height, 0.25 * rect_width, .5*rect_width, 5);
        last_row = i;
      } else {
        vis.fill(232, 232, 232);
        vis.stroke(255, 255, 255, 50);
        star(x + 0.5 * rect_width, y - 0.5 * rect_height, 0.25 * rect_width, .5*rect_width, 5);
      }
    }
  }
  i = m - 1;
  for (let j = 4; j < n - 4; j++){
    count++;
    let x = j * rect_width;
    let y = -i * rect_height;
    if (count*box_price <= getCurrentSum()) {
      vis.fill(255,69,0);
      vis.stroke(255, 255, 255, 50);
      star(x + 0.5 * rect_width, y - 0.5 * rect_height, 0.25 * rect_width, .5*rect_width, 5);
      last_row = i;
    } else {
      vis.fill(232, 232, 232);
      vis.stroke(255, 255, 255, 50);
      star(x + 0.5 * rect_width, y - 0.5 * rect_height, 0.25 * rect_width, .5*rect_width, 5);
    }
  }

  vis.pop();
  vis.fill(0, 0, 0, 100);
  vis.textSize(drawing_top_margin / 3.5);
  vis.rectMode(CENTER);
  vis.textAlign(CENTER, CENTER);
  vis.textSize(42);
  vis.text("1000    за...", w / 2, 20);
  vis.textSize(32);
  vis.text("нови понтон!", w / 2, 50);
  vis.fill(255,69,0);
  vis.stroke(255, 255, 255, 50);
  star(w/2 + 10, 30, 0.4 * rect_width, .8*rect_width, 5);
  vis.textSize(24);
  vis.noStroke()  
  vis.fill(0, 0, 0, 150);
  vis.text(toCurrency(getCurrentSum()) + current_date, w / 2, h - drawing_bottom_margin - last_row*rect_height - 1.5 * rect_height);
  vis.textSize(12);
  vis.text("studio@microcloud.rs", w / 2, h - drawing_bottom_margin / 8);
  vis.textAlign(LEFT, CENTER);
  vis.textSize(16);
  vis.text("145-0000000026223-70", drawing_left_margin, h - drawing_bottom_margin + 60);
  vis.text("Веслачки клуб Црвена Звезда", drawing_left_margin, h - drawing_bottom_margin + 80);
  vis.text("Ада Циганлија 5", drawing_left_margin, h - drawing_bottom_margin + 100);
  vis.text("11030 Београд", drawing_left_margin, h - drawing_bottom_margin + 120);
  vis.tint(255, 255, 255, 150);
  vis.image(qr, w - drawing_right_margin - 120, h - drawing_bottom_margin + 30, 130, 130);
  saveCanvas(vis, current_date, 'jpg')
}