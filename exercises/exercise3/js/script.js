"use strict";

/*****************

Spy Profile Generator ++ created by Pippin Barr

adapted by Jennifer Poohachoff

- added another category to the profile to generate a better Alias, color appends to instrument
- added the ability to delete the current profile data with a keyboard command
- added a gif graphic when escape key is pressed
- improved the visual display of the profile

Uses:

Darius Kazemi's corpora project:
https://github.com/dariusk/corpora/



******************/

// URLs to JSON data
const TAROT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`;
const OBJECT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`;
const INSTRUMENT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`;
const COLORS_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/colors/web_colors.json`;

// The key used to save and load the data for this program
const PROFILE_DATA_KEY = `spy-profile-data`;

// The spy profile data while the program is running
let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  secretColor: ``,
  password: `**REDACTED**`
};
// Variables to store JSON data for generating the profile
let tarotData;
let objectsData;
let instrumentsData;
let colorsData;

let bg;
let bomb;
let imageDisplay = false;

/**
Loads the JSON data used to generate the profile
*/
function preload() {
  tarotData = loadJSON(TAROT_DATA_URL);
  objectsData = loadJSON(OBJECT_DATA_URL);
  instrumentsData = loadJSON(INSTRUMENT_DATA_URL);
  colorsData = loadJSON(COLORS_DATA_URL);
  bomb = loadImage('assets/images/bomb.gif');
  // bomb_gif = createImg('assets/images/da-bomb.gif');
}

/**
Creates a canvas then handles loading profile data, checking password,
and generating a profile as necessary.
*/
function setup() {
  // Create the canvas
  createCanvas(windowWidth, windowHeight);
  // Try to load the data
  let data = JSON.parse(localStorage.getItem(PROFILE_DATA_KEY));
  // Check if there was data to load
  if (data) {
    // If so, ask for the password
    let password = prompt(`What is your top secret password?`);
    // Check if the password is correct
    if (password === data.password) {
      // If is is, then setup the spy profile with the data
      setupSpyProfile(data);
    }
  }
  else {
    // If there is no data, generate a spy profile for the user
    generateSpyProfile();
  }

    bg = loadImage('assets/images/topsecretbckgrnd.jpg');
}

/**
Assigns across the profile properties from the data to the current profile
*/
function setupSpyProfile(data) {
  spyProfile.name = data.name;
  spyProfile.alias = data.alias;
  spyProfile.secretWeapon = data.secretWeapon;
  spyProfile.secretColor = data.secretColor;
  spyProfile.password = data.password;
}

/**
Generates a spy profile from JSON data
*/
function generateSpyProfile() {
  // Ask for the user's name and store it
  spyProfile.name = prompt(`What is your name?`);
  // Generate an alias from a random instrument
  spyProfile.alias = random(instrumentsData.instruments)
  // Generate a color name from a random color
  let card1 = random(colorsData.colors);
  spyProfile.secretColor = card1.color.toLowerCase();
  // Generate a secret weapon from a random object
  spyProfile.secretWeapon = random(objectsData.objects);
  // Generate a password from a random keyword for a random tarot card
  let card2 = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card2.keywords);
  // Save the resulting profile to local storage
  localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(spyProfile));
}

/**
Displays the current spy profile.
*/
function draw() {
  background(bg);

  // Generate the profile as a string using the data
  let spyText = `** TOP SECRET SPY PROFILE **

Name: ${spyProfile.name}
Alias: ${spyProfile.secretColor} ${spyProfile.alias}
Secret Weapon: ${spyProfile.secretWeapon}
Password: ${spyProfile.password}`;

  // Display the profile
  push();
  fill(255, 159);
  rect(width/5, height/3.5, width/5+500, 350, 20);
  textSize(29);
  textAlign(LEFT, CENTER);
  textFont(`Courier, monospace`);
  fill(0);
  text(spyText, width/4, height/2);
  textSize(16);
  textAlign(RIGHT, CENTER);
  text('to delete profile press escape', width-30, height-30);
  if (imageDisplay) {
    image(bomb, width/3, height/9);
  }
  pop();
}

function keyPressed() {
  if (keyCode === 27) {
    localStorage.removeItem(PROFILE_DATA_KEY);
    imageDisplay = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
