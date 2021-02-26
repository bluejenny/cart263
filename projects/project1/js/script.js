/**

++++ We flippedVideo ++++

CART 263 # Project 1 - A Night at the Movies



*/

"use strict";

const NUM_POST_IMAGES = 7;
const NUM_POSTS = 30;

// Current state of program
let state = `loading`; // loading, running
// User's webcam
let video;
// The name of our model
let modelName = `CocoSsd`;
// ObjectDetector object (using the name of the model for clarify)
let cocossd;
// The current set of predictions made by CocoSsd once it's running
let predictions = [];

let postImages = [];
let posts = [];

let facePost;

// create a 16*9 canvas for webcam video
let w;
let h;

// range slider
let slider;

// do not load video until ready
let videoReady = false;

// font
let f;

// A timer to count the number of frames up to adding a circle
let newCircleTimer = 0;
// A variable to store how long to wait before adding a circle (in frames)
let newCircleDelay; // <1/2 second


// load the images
function preload() {
  for (let i = 0; i < NUM_POST_IMAGES; i++) {
    let postImage = loadImage(`assets/images/${i}.png`);
    postImages.push(postImage);
  }
  f = loadFont("assets/fonts/Flood.otf");
  facePost = loadImage(`assets/images/sunglasses.png`);
}

//Starts the webcam and the ObjectDetector
function setup() {
  createCanvas(windowWidth, windowHeight);
  w = windowWidth;
  h = (w * 9) / 16;

  // Start webcam and hide the resulting HTML element
  video = createCapture(VIDEO, function () {
    videoReady = true;
  });
  video.hide();


  // Start the CocoSsd model and when it's ready start detection
  // and switch to the running state
  cocossd = ml5.objectDetector("cocossd", {}, function () {
    // Ask CocoSsd to start detecting objects, calls gotResults
    // if it finds something
    cocossd.detect(video, gotResults);
    // Switch to the running state
    state = `running`;
  });

  slider = createSlider(0, 16, 1);
  slider.size(w - 100, 20);
  slider.position(50, height - 100);

  createPosts();
  newCircleDelay = random(0, 60);
}

// Called when CocoSsd has detected at least one object in the video feed
function gotResults(err, results) {
  // If there's an error, report it and exit
  if (err) {
    console.error(err);
    return;
  }

  // Otherwise, save the results into our predictions array
  predictions = results;
  // Ask CocoSsd to detect objects again so it's continuous
  cocossd.detect(video, gotResults);
}

// Handles the two states of the program: loading, running
function draw() {
if (state === `loading`) {
    loading();
  } else if (state === `running`) {
    running();
  }
}

/**
Displays a simple loading screen with the loading model's name
*/
function loading() {
  background(255);
  push();
  fill(0);
  textSize(22);
  textAlign(CENTER, CENTER);
  text(`Loading ${modelName}...`, width / 2, height / 2 - 100);
  pop();
}

/**
Displays the webcam.
If there are currently objects detected it outlines them and labels them
with the name and confidence value.
*/
function running() {
  background(0);

  if (slider.value() > 1 && slider.value() <6) {
    background(0, 110, 80);
  }

  if (videoReady) {
    // Display the webcam
    let flippedVideo = ml5.flipImage(video);
    image(flippedVideo, 50, 50, w - 100, h);

    let nmbr = slider.value();
    if (nmbr > 1) {
      filter(INVERT);
      drawPosts();
    }

    if (nmbr > 6) {
      filter(INVERT);
      filter(THRESHOLD, nmbr / 50);
    }

    if (nmbr === 16) {
      title();
    }
  }



  // Check if there currently predictions to display
  if (predictions) {
    // If so run through the array of predictions
    for (let i = 0; i < predictions.length; i++) {
      // Get the object predicted
      let object = predictions[i];
      // Highlight it on the canvas
      highlightObject(object);
    }
  }
}

function createPosts() {
  for (let i = 0; i < NUM_POSTS; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let postImage = random(postImages);
    let post = new Post(x, y, postImage);
    posts.push(post);
  }
}

function drawPosts() {
  for (let i = 0; i < posts.length; i++) {
    posts[i].transparency = slider.value()*5;
    posts[i].update();
  }
}

//Provided with a detected object it
function highlightObject(object) {
  // Display a box around it
  push();
  noFill();
  stroke(255, 255, 0);
  image(facePost, object.width/2, object.y+100);
  facePost.resize(250, 0);
  rect(object.x, object.y, object.width, object.height);

  pop();
  // Display the label and confidence in the center of the box
  push();
  textSize(18);
  fill(0, 255, 0);
  textAlign(CENTER, CENTER);
  text(`${object.label}, ${object.confidence.toFixed(2)}`, object.width/2, object.height/2);
  pop();
}


function title() {
  push();
  background(0);
  newCircleTimer++;
  if (newCircleTimer >= newCircleDelay) {
  background(255, 145, 175);
  newCircleTimer = random(0, 60);
}
  textFont(f, 100);
  fill(255);
  textSize(100);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES)
  rotate(3);
  text(`We`, width / 2, height / 2 - 150);
  text(`Live`, width / 2, height / 2 - 70);
  pop();
}


function windowResized() {
  w = windowWidth;
  h = (w * 9) / 16;
  resizeCanvas(w, h);
}
