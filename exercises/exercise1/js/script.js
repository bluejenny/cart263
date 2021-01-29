"use strict";

/**
Exercise: 1 Where’s Sausage Dog? New Game+
Find the Sausage Dog Activity by Pippin Bar
adapted by Jen Poohachoff

**my version**

Find the flower in the bunch!

- Flowers replace animals (images free from shutterstock)
- Using p5 functions shuffle() and pop() so that a random image selected each time
- Intro screen added to tell user which image to search for
- sound effect added when flower is found, animation stops when sound is no longer playing
*/


const NUM_FLOWER_IMAGES = 14;
const NUM_FLOWERS = 150;

//background
let bg = {
  r: 0,
  g: 0,
  b: 0
}

let state = `intro`; // possible states are intro and animation


let cheerSFX;

let flowerImages = [];
let flowers = [];

//variables for the featured imagess
let featuredFlowerImage = undefined;
let featuredFlower = undefined;


function preload() {
  for (let i = 0; i < NUM_FLOWER_IMAGES; i++) {
    let flowerImage = loadImage(`assets/images/flower${i}.png`);
    flowerImages.push(flowerImage);
  }

  //sound when found
  cheerSFX = loadSound(`assets/sounds/cheer.mp3`);
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  // create random color background
  bg.r = random(20, 255);
  bg.g = random(20, 255);
  bg.b = random(20, 255);

  // shuffle the array so random image is on top of stack
  flowerImages = shuffle(flowerImages);

  // remove the last image of array and place in variable
  featuredFlowerImage = flowerImages.pop();

  createFlowers();
  createFeaturedFlower();

}


function draw() {
  background(bg.r, bg.g, bg.b);

  if (state === `intro`) {

  title();
  featureFlower();
  // keyPressed();

  }
  else if (state === `animation`) {
  drawFlowers();
  drawFeatureFlower();
  }
}

function createFlowers() {
  for (let i = 0; i < NUM_FLOWERS; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let flowerImage = random(flowerImages);
    let flower = new Flower(x, y, flowerImage);
    flowers.push(flower);
  }
}

function createFeaturedFlower() {
  let x = random(0, width);
  let y = random(0, height);
  featuredFlower = new FeatureFlower(x, y, featuredFlowerImage);
}

function drawFlowers() {
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].update();
  }
}

function drawFeatureFlower() {
  featuredFlower.update();
}

function featureFlower() {

  // is this an anonymous function?
  // function offered by Samuel(TA) to make image appear to blink
  if(floor(frameCount/30)%2==0);

  //center along the x axis
  image(featuredFlowerImage, width/2-featuredFlowerImage.width/2, height/2-featuredFlowerImage.height/2);
}

function title() {
  push();
  textSize(42);
  textAlign(CENTER, TOP);
  text('Pick Me', width/2, height/3);
  textAlign(CENTER, BOTTOM)
  textSize(22);
  text('press any key to start', width/2, height/3*2);
  pop();
}

function mousePressed() {
  featuredFlower.mousePressed();
}

function keyPressed() {
  if (state === `intro`) {
    state = `animation`;
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
