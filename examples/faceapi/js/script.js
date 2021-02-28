/**

++++ They Live We Sleep ++++

CART 263 # Project 1 - A Night at the Movies

*/

"use strict";

// create the 16*9 canvas for webcam video
let w;
let h;

// Current state of program
let state = `loading`; // loading, running

let faceapi;
let video;
let detections;

// by default all options are set to true
const detection_options = {
  withLandmarks: true,
  withDescriptors: false,
};

const NUM_POST_IMAGES = 7;
const NUM_POSTS = 30;

// range slider
let slider;

// The name of our model
let modelName = `Face Scan`;

let postImages = [];
let posts = [];

// font
let f;

// load the images
function preload() {
  for (let i = 0; i < NUM_POST_IMAGES; i++) {
    let postImage = loadImage(`assets/images/${i}.png`);
    postImages.push(postImage);
  }
  // f = loadFont("assets/fonts/Flood.otf");
  // facePost = loadImage(`assets/images/sunglasses.png`);
}

function setup() {
  w = windowWidth;
  h = (w * 9) / 13;
  createCanvas(windowWidth, h);

  // load up your video
  video = createCapture(VIDEO);
  video.size(width, h);
  video.hide(); // Hide the video element, and just show the canvas
  faceapi = ml5.faceApi(video, detection_options, modelReady);
  textAlign(RIGHT);

  slider = createSlider(0, 16, 1);
  slider.size(w - 100, 20);
  slider.position(50, height - 100);

  createPosts();
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

function running() {
  // background(0);
  drawPosts();
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

function modelReady() {
  console.log("ready!");
  console.log(faceapi);
  faceapi.detect(gotResults);
  state = `running`;
}

function gotResults(err, result) {
  if (err) {
    console.log(err);
    return;
  }
  // console.log(result)
  detections = result;

  // background(220);
  background(255);
  image(video, 0, 0, width, height);
  if (detections) {
    if (detections.length > 0) {
      // console.log(detections)
      drawBox(detections);
      drawLandmarks(detections);
    }
  }
  faceapi.detect(gotResults);
}

function drawBox(detections) {
  for (let i = 0; i < detections.length; i++) {
    const alignedRect = detections[i].alignedRect;
    const x = alignedRect._box._x;
    const y = alignedRect._box._y;
    const boxWidth = alignedRect._box._width;
    const boxHeight = alignedRect._box._height;

    noFill();
    stroke(161, 95, 251);
    strokeWeight(2);
    rect(x, y, boxWidth, boxHeight);
  }
}

function drawLandmarks(detections) {
  noFill();
  stroke(161, 95, 251);
  strokeWeight(2);

  for (let i = 0; i < detections.length; i++) {
    const mouth = detections[i].parts.mouth;
    const nose = detections[i].parts.nose;
    const leftEye = detections[i].parts.leftEye;
    const rightEye = detections[i].parts.rightEye;
    const rightEyeBrow = detections[i].parts.rightEyeBrow;
    const leftEyeBrow = detections[i].parts.leftEyeBrow;

    drawPart(mouth, true);
    drawPart(nose, false);
    drawPart(leftEye, true);
    drawPart(leftEyeBrow, false);
    drawPart(rightEye, true);
    drawPart(rightEyeBrow, false);
  }
}

function drawPart(feature, closed) {
  beginShape();
  for (let i = 0; i < feature.length; i++) {
    const x = feature[i]._x;
    const y = feature[i]._y;
    vertex(x, y);
  }

  if (closed === true) {
    endShape(CLOSE);
  } else {
    endShape();
  }
}
