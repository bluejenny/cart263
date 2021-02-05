"use strict";

/**
Exercise 2: Slamina by Pippin Barr, the NEW game
adapted by Jen Poohachoff

**** Slamina Backwards ****
Guess the random animal not reversed but spoken in a variety of voice dialects with random pitches, rates and volumes

- added a start screen
- added more visual flair when you answer is reveled
- added sound for correct and incorrect answers
- transformed the answers in a different way than reversing them

*/

const ANIMALS = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra",
];

let currentAnimal = ``;
let currentAnswer = ``;

// to hold the random voices
let voicelist;

// font
let f;

let rows = 20;
let columns = 20;

let correctSFX;
let wrongSFX;

let state = `intro`; // possible states are intro and animation

function preload() {
  f = loadFont("assets/fonts/KabinaSemibold-A132.otf");
  correctSFX = loadSound("assets/sounds/Ethereal-Accents.mp3");
  wrongSFX = loadSound("assets/sounds/Hockey-Buzzer.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // function of responsiveVoice
  voicelist = responsiveVoice.getVoices();
  console.log(voicelist); // list of voices available on yr computer

  if (annyang) {
    let commands = {
      "I think it is *animal": guessAnimal,
    };
    annyang.addCommands(commands);
    annyang.start();

    textFont(f, 100);
    textSize(152);
    textAlign(CENTER, CENTER);
  }
}

function draw() {
  background(112, 99, 89, 200);

  if (state === `intro`) {
    title();
  } else if (state === `animation`) {
    drawText();
  }
}

function title() {
  push();
  fill(255);
  textSize(72);
  textAlign(CENTER, TOP);
  text("Guess the Animal", 0, -200);
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(62);
  text("~ I think it is *animal* ~", 0, -80);
  textAlign(CENTER, BOTTOM);
  fill(255);
  textSize(42);
  text("(press mouse to play)", 0, 30);
  pop();
}

// draw the user's guess to the screen
function drawText() {
  if (currentAnswer === currentAnimal) {
    fill(255);
  } else {
    fill(0);
  }
  let time = millis();
  rotateX(time / 1000);
  rotateZ(time / 1234);
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
  responsiveVoice.speak(thingToSay, pick.name, {
    pitch: random(0, 2),
    rate: random(0, 1.5),
    volume: random(0, 1),
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
