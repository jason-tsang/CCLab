//credits: the class slides and the example sketch: https://editor.p5js.org/MOQN/sketches/XJCII6BVu

let ripples = [];
let outerDia = 0;
let planetAura;
let asteroids = [];

let pg;

function setup() {
  let canvas = createCanvas(450, 450);
  canvas.parent("container");

  angleMode(DEGREES);

  planetAura = new Aura();
  
  pg = createGraphics(windowWidth, windowHeight);
}

function mouseClicked() {
  asteroids.push(new Asteroid(mouseX, mouseY));
}

function draw() {
  background(18, 18, 10);

  //stars
  for (let i = 0; i < asteroids.length; i++) {
    asteroids[i].move();
    asteroids[i].display();
  }
  while (asteroids.length > 3) {
    asteroids.splice(0, 1);
  }

  //planet aura
  planetAura.update();
  planetAura.display();

  //planet ripples
  ripples.push(new Ripple(width / 2, height / 2));
  outerDia = outerDia + 2;
  for (let i = 0; i < ripples.length; i++) {
    let innerDia = outerDia - 50 * i;
    if (innerDia > 0 && innerDia < 275) {
      let r = ripples[i];
      r.expand();
      r.display();
    }
  }
  while (ripples.length > 500) {
    ripples.splice(0, 1);
  }
  
  image(pg, 0, 0);
  
  // fill(220);
  // textSize(14);
  // text("Click to generate asteroid", 11, 28);
}

// asteroid class
class Asteroid {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vel = random(0.010, 0.030); 
  }
  move() {
    // target - curr pos => direction
    let xSpd = (width/2 - this.x) * this.vel;
    let ySpd = (height/2 - this.y) * this.vel;
    this.x += xSpd;
    this.y += ySpd;
  }
  display() {
    fill(60, 60, 60);
    noStroke();
    ellipse(this.x, this.y, 14, 16);
  }
}

// planet ripple class
class Ripple {
  constructor(x, y) {
    this.dia = 0;
  }
  expand() {
    let freq = frameCount * 0.5; 
    this.dia = map(sin(freq), -1, 1, 0, 275); 
  }
  display() {
    pg.push();
    pg.noFill();
    pg.stroke(random(0, 122), random(10), random(10), 50);
    pg.circle(width / 2, height / 2, this.dia);
    pg.pop();
  }
}
// planet aura class
class Aura {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rotate = 0;
  }
  update() {
    if (frameCount % 2 == 0) {
      this.rotate = degrees(random(10));
    }
  }
  display() {
    pg.push();
    pg.translate(width / 2, height / 2);
    //aura display
    pg.noFill();

    let freq;

    freq = frameCount * 0.2;
    let blue = map(sin(freq), -1, 1, 255, 0);

    pg.stroke(random(100, 250), random(100), blue, 3);
    pg.strokeWeight(10);
    pg.rotate(this.rotate);

    freq = frameCount * 0.5;
    let dia = map(sin(freq), -1, 1, 200, 405);
    pg.ellipse(0, 0, dia, 35);
    
    pg.pop();
  }
}
