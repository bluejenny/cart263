"use strict";

/**
Project 1: A Night at the Movies

In memory of 2004 Movie Eternal Sunshine of the Spotless Mind, RIP

*/

const ANIMALS = [
    "amazing",
    "awesome",
    "beautiful",
    "brilliant",
    "breathtaking",
    "cool",
    "dazzling",
    "delightful",
    "electrifying",
    "elegant",
    "enchanting",
    "excellent",
    "exciting",
    "fabulous",
    "fantastic",
    "fun",
    "genius",
    "groundbreaking",
    "heavenly",
    "impressive",
    "innovative",
    "inventive",
    "kind",
    "legendary",
    "lovely",
    "magical",
    "marvelous",
    "masterful",
    "miraculous",
    "original",
    "perfect",
    "phenomenal",
    "powerful",
    "remarkable",
    "rejuvenating",
    "resounding",
    "skillful",
    "stupendous",
    "stunning",
    "sweet",
    "terrific",
    "thoughtful",
    "thrilling",
    "wonderful",
    "wondrous"
];

let currentAnimal = ``;
let currentAnswer = ``;

// to hold the random voices
let voicelist;

// font
let f;
let f2;
let f3;

let inputTextBox;

let rows = 20;
let columns = 20;

let correctSFX;
let wrongSFX;

let state = `intro`; // possible states are intro and animation

function preload() {
  f = loadFont("assets/fonts/KabinaSemibold-A132.otf");
  f2 = loadFont("assets/fonts/Futura-Bold-03.ttf");
  f3 = loadFont("assets/fonts/Futura-Medium-01.ttf");

  correctSFX = loadSound("assets/sounds/Ethereal-Accents.mp3");
  wrongSFX = loadSound("assets/sounds/Hockey-Buzzer.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // function of responsiveVoice
  voicelist = responsiveVoice.getVoices();
  console.log(voicelist); // list of voices available on yr computer

  if (annyang) {
    let commands = {
      "I feel *animal": guessAnimal,
    };
    annyang.addCommands(commands);
    annyang.start();
  }
}

function draw() {
  background(228, 234, 245);

  if (state === `intro`) {
    title();
  } else if (state === `animation`) {
    title();
    drawText();
  }
}

function title() {
  push();
  textAlign(LEFT, CENTER);
  textFont(f2, 100);
  textSize(25);
  fill(58, 66, 138, 200);
  // text(`How are you right now?`, width/12+5, height/4-78 )
  // text(`can we edit our thoughts.`, width/12+5, height/4-100 )
  text(`ça va?`, width/12+5, height/4-100 )
  text(``, width/12+5, height/4-60 )
  textFont(f2, 100);
  textSize(168);
  fill(199, 106, 43, 200);
  text(`I Feel`, width/12, height/4);
  textSize(32);
  fill(35, 34, 32, 200);
  text(``, width/12+2, height/4+55);
  rect(width/10, height/3*2, width/1.5, 2, 3);
  // inputTextBox = createInput();
  // inputTextBox.position(width/12, height/4+95);
  // inputTextBox.size(500, 200);
  pop();
}

// draw the user's guess to the screen
function drawText() {
  if (currentAnswer === currentAnimal) {
    fill(255);
  } else {
    fill(0);
  }
  text(currentAnswer, 0, 0);
}

function mousePressed() {
  if (state === `animation`) {
    currentAnswer = "";
    currentAnimal = random(ANIMALS);
    saySomething(currentAnimal);
  } else {
    state = `animation`;
  }
}

// speak in a random voice with random parameters
function saySomething(thingToSay) {
  let pick = random(voicelist);

  console.log(pick);
  responsiveVoice.speak(`I feel ${thingToSay}`, pick.name, {
    pitch: random(0, 2),
    rate: random(0, 1.5),
    volume: random(.4, 1),
  });
}

function guessAnimal(animal) {
  currentAnswer = animal.toLowerCase();
  console.log(currentAnswer);

  //play sounds depending on if guess is correct
  if (currentAnswer === currentAnimal) {
    correctSFX.play();
  } else {
    wrongSFX.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
