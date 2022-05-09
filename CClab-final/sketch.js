let petalLength = 50;
let petalWidth = 12;
let stemLength = 30;
let money = 0;
let flower;
let rainButton;
let shopButton;
let raindrops = [];
let clouds = [];
let flowerColor = "yellow";

//flower colors
centerColor = '#322413';
petalColor = '#FBA914';
stemColor = '#7B8235';

//rain sound
//leaves on sunflower moving
//buy fertilizer

function setup() {
  let canvas = createCanvas(600, 500);
  canvas.parent("container");

  angleMode(DEGREES);
  flower = new Plant(360, 350);
  rainButton = createButton('Summon Rain');
  rainButton.position(13, 320);
  rainButton.mousePressed(summonRain);
  shopButton = createButton('Upgrade flower: $20');
  shopButton.position(13, 195);
  shopButton.mousePressed(upgradePlant)
}

function draw() {
  background(color('#70B879'));
  //background
  noStroke();
  fill(color('#1E4735'))
  rect(130, 0, 470, 500);
  
  //cash button
  fill(color('#9cd4e0'))
  ellipse(63, 120, 100, 100);
  fill(0);
  textSize(18);
  textFont('Primetime');
  textStyle(BOLD);
  text("Cash: $" + money, 27, 128);
  
  //objects
  flower.display();
  push();
  translate(290, 10);
  cloud();
  pop();
  push();
  translate(330, 55);
  for (let raindrop of raindrops) {
    raindrop.display();
    raindrop.fall();
  }
  pop();
  // console.log(raindrops.length);
  
  //clouds
  for (i = 0; i < clouds.length; i++) {
    let loc = clouds[i];
		loc.xpos += 1.5;
        loc.ypos += random(-0.7, 0.7);
		cloud(loc.xpos, loc.ypos);
  }
}

function cloud(x, y) {
	fill(100);
	noStroke();
    ellipse(x, y, 50, 40);
    ellipse(x + 20, y, 40, 30);
    ellipse(x + 10, y - 15, 40, 20);
}

class Plant {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  update() {
    petalLength = petalLength + 10;
    petalWidth = petalWidth + 3;
    stemLength = stemLength + 12;
  }
  display() {
    push();
    translate(this.x, this.y);
    sunflower();
    pop();
  }
}

class Rain {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.ySpeed = random(1, 6);
  }
  fall() {
    let yAcc = map(this.ySpeed, 1, 15, 0.1, 0.01);
    this.y += this.ySpeed;
    this.ySpeed += yAcc;
  }
  display() {
    let length = map(this.ySpeed, 1, 15, 5, 30);
    stroke(180, 220, 240);
    line(this.x, this.y, this.x, this.y + length);
  }
}

function summonRain() {
  for (let i = 0; i < 30; i++) {
    let x = random(60);
    let y = 0;
    raindrops.push(new Rain(x, y));
    if (raindrops.length > 140) {
      raindrops = [];
    }
  }
  
  flower.update();
  if (petalLength > 140) {
    petalLength = 50;
    petalWidth = 12;
   stemLength = 30;
  }
  
  let addCloud = {
    xpos: 330,
	ypos: 50,	
  };
	clouds.push(addCloud);
  
  if (flowerColor == "yellow") {
    money = money + 1;
  } else if (flowerColor == "blue") {
    money = money + 2;
  }
}

function sunflower() {
  noStroke();
  fill(stemColor);
  rect(-5, 10, 10, stemLength);
  for(let petals = 0; petals < 6; petals++){
    fill(petalColor);
    rotate(30);
    ellipse(0, 0, petalWidth, petalLength);
  }
    fill(centerColor);
    circle(0, 0, petalLength/2);
}


function upgradePlant() {
  if (money >= 20) {
    money = money - 20;
    petalColor = '#C9EBEF';
    flowerColor = "blue";
  }
}