"use strict";

/**
Responsive Voice Experiment
*/


function preload() {

}


function setup() {
  createCanvas(200, 200);

}


function draw() {
  background(0, 0, 200);
}

function mousePressed() {
  responsiveVoice.speak("hello world", "UK English Female", {
    pitch: 0.5,
    rate: 0.5,
    volume: 1
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
