"use strict";

/**
Random Voice with Samuel

adapted by Jen Poohachoff
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
let voicelist;

// font
let f;

let rows = 20;
let columns = 20;


let correctSFX;
let wrongSFX;


function preload() {
  f = loadFont('assets/fonts/KabinaSemibold-A132.otf');
  correctSFX = loadSound('assets/sounds/Ethereal-Accents.mp3');
  wrongSFX = loadSound('assets/sounds/Hockey-Buzzer.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  voicelist = responsiveVoice.getVoices();
  console.log(voicelist);

  if (annyang) {
    let commands = {
      "I think it is *animal": guessAnimal,
    };
    annyang.addCommands(commands);
    annyang.start();


    textFont(f, 100);
    textSize(172);
    textAlign(CENTER, CENTER);
  }
}

function draw() {
  background(112, 99, 89);


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
  currentAnswer = "";
  currentAnimal = random(ANIMALS);
  saySomething(currentAnimal);
}

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

  if (currentAnswer === currentAnimal) {
    correctSFX.play();
  } else {
    wrongSFX.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
