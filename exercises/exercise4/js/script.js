"use strict";

/**
bubble popper ++
updates by Jen Poohachoff

- Added multiple bubbles to the simulation
- Improve the audiovisual presentation, added sound effects
- Counts how many bubbles were added and subtracts how many
the user has popped over time

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

let counter = 0;

// The Array of Balls
let balls = [];

// F-minor
let notes = [`F3`, `G3`, `Ab4`, `Bb4`, `C4`, `Db4`, `Eb4`, `F4`];

// A timer to count the number of frames up to adding a circle
let newCircleTimer = 0;
// A variable to store how long to wait before adding a circle (in frames)
let newCircleDelay = 7; // <1/4 seconds

/**
Starts the webcam and the Handpose
*/
function setup() {
  createCanvas(640, 480);

  // Start webcam and hide the resulting HTML element
  video = createCapture(VIDEO);
  video.hide();

  // Start the Handpose model and switch to our running state when it loads
  handpose = ml5.handpose(
    video,
    {
      flipHorizontal: true,
    },
    function () {
      // Switch to the running state
      state = `running`;
    }
  );

  // Listen for prediction events from Handpose and store the results in our
  // predictions array when they occur
  handpose.on(`predict`, function (results) {
    predictions = results;
  });
}

/**
Handles the two states of the program: loading, running
*/
function draw() {
  if (state === `loading`) {
    loading();
  } else if (state === `running`) {
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
  text(`Loading ${modelName}...`, width / 2, height / 2 - 50);
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

  // draw counter
  push();
  textSize(132);
  fill(255, 175);
  textStyle(BOLD);
  textAlign(RIGHT, BOTTOM);
  text(`${counter}`, width - 50, height - 20);
  pop();

  // draw balls
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
  ellipse(indexX, indexY, random(20, 80));
  pop();

  for (let i = balls.length - 1; i >= 0; i--) {
    let ball = balls[i];
    let d = dist(indexX, indexY, ball.x, ball.y);
    if (d < ball.size / 2) {
      balls.splice(i, 1);
      counter--;
    }
  }

  // NEW! Increase the new circle timer by one frame
  newCircleTimer++;
  // NEW! Check if we have reached the end of our timer
  if (newCircleTimer >= newCircleDelay) {
    createBall(random(50, width-50), random(50, height-50));
    // And reset the timer so it counts back up again
    newCircleTimer = 0;
  }
}

function createBall(x, y) {
  let note = random(notes);
  let ball = new Ball(x, y, note);
  balls.push(ball);
  counter++;
}
