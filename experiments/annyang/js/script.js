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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
