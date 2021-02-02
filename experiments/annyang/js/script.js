"use strict";

/**
Annyang Experiment
*/

function preload() {}

function setup() {
  createCanvas(200, 200);

  if (annyang) {
    var commands = {
      'Jello': function () {
        alert('Howdy');
      },
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
  }
}

function draw() {
  background(0, 0, 200);
}
//
// function mousePressed() {
//   responsiveVoice.speak("hello world", "UK English Female", {
//     pitch: 0.5,
//     rate: 0.5,
//     volume: 1
//   });
// }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
