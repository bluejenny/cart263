"use strict";

/**
Exercise: 1 Where’s Sausage Dog? New Game+
Find the Sausage Dog Activity by Pippin Bar
adapted by Jen Poohachoff

**my version**

Find the flower in the bunch!

- Replaced animals with flowers
- Randomly selects animal from array of shuffled images
- Has an intro screen to tell user which flower to search for
- adds a sound effect when flower is found
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

let animalImages = [];
let animals = [];

//variables for the featured imagess
let sausageDogImage = undefined;
let sausageDog = undefined;


function preload() {
  for (let i = 0; i < NUM_FLOWER_IMAGES; i++) {
    let animalImage = loadImage(`assets/images/flower${i}.png`);
    animalImages.push(animalImage);
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
  animalImages = shuffle(animalImages);

  // remove the last image of array and place in variable
  sausageDogImage = animalImages.pop();

  createAnimals();
  createSausageDog();

}


function draw() {
  background(bg.r, bg.g, bg.b);

  if (state === `intro`) {

  title();
  featuredSausageDog();
  // keyPressed();

  }
  else if (state === `animation`) {
  drawAnimals();
  drawSausageDog();
  }
}

function createAnimals() {
  for (let i = 0; i < NUM_FLOWERS; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let animalImage = random(animalImages);
    let animal = new Animal(x, y, animalImage);
    animals.push(animal);
  }
}

function createSausageDog() {
  let x = random(0, width);
  let y = random(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

function drawAnimals() {
  for (let i = 0; i < animals.length; i++) {
    animals[i].update();
  }
}

function drawSausageDog() {
  sausageDog.update();
}

function featuredSausageDog() {

  // equation from TA to make image blink ??
  if(floor(frameCount/30)%2==0)

  //center along the x axis
  image(sausageDogImage, width/2-sausageDogImage.width/2, height/2-sausageDogImage.height/2);
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
  sausageDog.mousePressed();
}

function keyPressed() {
  if (state === `intro`) {
    state = `animation`;
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
