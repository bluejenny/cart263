"use strict";

/**
Project 1: A Night at the Movies

In memory of 2004 Movie Eternal Sunshine of the Spotless Mind

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
      "I think it is *animal": guessAnimal,
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
    drawText();
  }
}

function title() {
  push();
  textAlign(LEFT, CENTER);
  textFont(f2, 100);
  textSize(13);
  fill(58, 66, 138, 200);
  // text(`Are memories reliable?`, width/12+5, height/4-60 )
text(`Selected memory removal is possible`, width/12+5, height/4-60 )
text(``, width/12+5, height/4-60 )
  textFont(f2, 100);
  textSize(47);
  // fill(0);
  // text("Change your Mind?", width-width/10+2, height/4+2);
  // fill(228, 162, 63);
  fill(199, 106, 43, 200);
  // text(`Clear your mind`, width-width/12, height/4);
  text(`Erase a Thought`, width/12, height/4);
  textSize(27);
  fill(35, 34, 32, 200);
  text(`clear you mind`, width/12+2, height/4+45);
  inputTextBox = createInput();
  inputTextBox.position(width/12, height/4+95);
  inputTextBox.size(500, 200);
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

// function mousePressed() {
//   if (state === `animation`) {
//     currentAnswer = "";
//     currentAnimal = random(ANIMALS);
//     saySomething(currentAnimal);
//   } else {
//     state = `animation`;
//   }
// }

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
