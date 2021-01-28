"use strict";

/**
Find the Sausage Dog
Activity with Pippin Bar

**my version**
*/

const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 100;

let animalImages = [];
let animals = [];


function preload() {
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }
}



function setup() {
  createCanvas(windowWidth, windowHeight);

  //create the animals
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let animalImage = random(animalImages);
    let animal = new Animal(x, y, animalImage);
    animals.push(animal);
  }

}



function draw() {
  background(255, 255, 0);
  for (let i = 0; i < animals.length; i++) {
    animals[i].update();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
