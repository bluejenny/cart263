"use strict";

/**
Find the Sausage Dog Activity with Pippin Bar

**my version**

Find a randomly selected image from the top of a shuffled Array of *Animal Images*

- added sound when user find *Sausage Dog* for emphasis
- added an intro screen to show the selected image to find

*/

const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 100;

//to create a random colored screen on each load
let bg = {
  r: 0,
  g: 0,
  b: 0
}

let animalImages = [];
let animals = [];

let sausageDogImage = undefined;
let sausageDog = undefined;


function preload() {
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }

  //  = loadImage(`assets/images/sausage-dog.png`)
}



function setup() {
  createCanvas(windowWidth, windowHeight);

  bg.r = random(0, 255);
  bg.g = random(0, 255);
  bg.b = random(0, 255);


  animalImages = shuffle(animalImages);
  sausageDogImage = animalImages.pop();

  createAnimals();
  createSausageDog();



}


function draw() {
  background(bg.r, bg.g, bg.b);
  for (let i = 0; i < animals.length; i++) {
    animals[i].update();
  }


  // sausageDog.update();
  drawSausageDog();
}

function createAnimals() {
  for (let i = 0; i < NUM_ANIMALS; i++) {
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

function drawSausageDog() {

    sausageDog.update();

if(floor(frameCount/30)%2==0)
    image(sausageDogImage, 0,0);
}

function mousePressed() {
  sausageDog.mousePressed();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
