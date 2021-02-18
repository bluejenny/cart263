"use strict";

/**
bubble popper ++
updates by Jen Poohachoff

- Added multiple bubbles to the simulation
- Improve the audiovisual presentation, added sound effects
- Counts how many bubbles the user has popped over time

original code by Pippin Barr; Handpose Framework, Bubble Popper,
Make Some Noise 

*/

// Current state of program
let state = `loading`; // loading, running
// User's webcam
let video;
// The name of our model
let modelName = `Handpose`;
// Handpose object (using the name of the model for clarity)
let handpose;
// The current set of predictions made by Handpose once it's running
let predictions = [];


// floating bubble to pop
let bubble = undefined;
let counter = 0;

// The Balls when clicked
let balls = [];

// F-minor
let notes = [`F3`, `G3`, `Ab4`, `Bb4`, `C4`, `Db4`, `Eb4`, `F4`];

/**
Starts the webcam and the Handpose
*/
function setup() {
  createCanvas(640, 480);

  // Start webcam and hide the resulting HTML element
  video = createCapture(VIDEO);
  video.hide();

  // Start the Handpose model and switch to our running state when it loads
  handpose = ml5.handpose(video, {
    flipHorizontal: true
  }, function() {
    // Switch to the running state
    state = `running`;
  });

  // Listen for prediction events from Handpose and store the results in our
  // predictions array when they occur
  handpose.on(`predict`, function(results) {
    predictions = results;
  });

  // create random bubble to pop
  bubble = {
  x: random(width),
  y: height,
  size: 100,
  vx: 0,
  vy: -20
}
}

/**
Handles the two states of the program: loading, running
*/
function draw() {
  if (state === `loading`) {
    loading();
  }
  else if (state === `running`) {
    running();
  }
}

/**
Displays a loading screen with the loading model's name
*/
function loading() {
  background(255);

  push();
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Loading ${modelName}...`, width / 2, height / 2-50);
  pop();
}

/**
Displays the webcam.
If there is a hand it outlines it and highlights the tip of the index finger
*/
function running() {
  // Display the webcam with reveresd image so it's a mirror
  let flippedVideo = ml5.flipImage(video);
  image(flippedVideo, 0, 0, width, height);

  // Check if there currently predictions to display
  if (predictions.length > 0) {
    // Get the hand predicted
    let hand = predictions[0];
    // Highlight it on the canvas
    highlightHand(hand);
  }
  //move bubble on screen
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;

  //move bubble to bottom of screen when it reached top
  if (bubble.y < 0) {
    bubble.x = random(width);
    bubble.y = height;
}

// draw bubble
push();
fill(0, 100, 200, 125);
noStroke();
ellipse(bubble.x, bubble.y, bubble.size);
pop();

// draw counter
push();
textSize(132);
fill(255, 200);
textStyle(BOLD);
textAlign(RIGHT, BOTTOM);
text(`${counter}`, width -50, height -20);
pop();

// draw balls when mouse clicked
for (let i = 0; i < balls.length; i++) {
  let ball = balls[i];
  ball.move();
  ball.bounce();
  ball.display();
}
}

/**
Provided with a detected hand it highlights the tip of the index finger
*/
function highlightHand(hand) {
  // Display a circle at the tip of the index finger
  let index = hand.annotations.indexFinger[3];
  let indexX = index[0];
  let indexY = index[1];

  push();
  fill(255, 255, 0, 150);
  noStroke();
  ellipse(indexX, indexY, 100);
  pop();

  // check bubble popping
    let d = dist(indexX, indexY, bubble.x, bubble.y);
    if (d < bubble.size/2) {
      bubble.x = random(width);
      bubble.y = height;
      counter++;
      console.log(counter);
    }
}

function mousePressed() {
  createBall(mouseX, mouseY);
}

function createBall(x, y) {
  let note = random(notes);
  let ball = new Ball(x, y, note);
  balls.push(ball);
}
