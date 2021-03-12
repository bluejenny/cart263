/**
Haiku Generator ++
with Pippin Barr

enhanced version by Jennifer Poohachoff

- improve the HTML and CSS presentation of the haiku
- Added a randomly generated title to the poem by using a random word from each line
- Add another DOM event into the user interaction that changes the color of the text when mouse over
*/

"use strict";

// Our pre-made haiku lines
let haikuLines = {
  fiveSyllables: [
    `O, to be a tree`,
    `The cat does not know`,
    `We are all forests`,
    `You have done your best`,
    `They are all gone now`
  ],
  sevenSyllables: [
    `Say the things left unsaid`,
    `Never believe the wind's lies`,
    `The autumn stretches its legs`,
    `Nothing can satisfy you`,
    `They will not come back again`
  ]
};

// Our three elements on the page that contain each line of the poem
let line1 = document.getElementById(`line-1`);
let line2 = document.getElementById(`line-2`);
let line3 = document.getElementById(`line-3`);

let span1 = document.getElementById(`span-1`);
let span2 = document.getElementById(`span-2`);
let span3 = document.getElementById(`span-3`);




// Set up the starting lines
setupLines();

addListeners();



/**
Puts a randomly chosen haiku line in each line of the poem in HTML
*/
function setupLines() {


  line1.innerText = random(haikuLines.fiveSyllables);
  line2.innerText = random(haikuLines.sevenSyllables);
  line3.innerText = random(haikuLines.fiveSyllables);

  setupTitle();

}

function setupTitle() {
  let sp1 = line1.innerText.split(" ");
  let sp2 = line2.innerText.split(" ");
  let sp3 = line3.innerText.split(" ");

  span1.innerText = random(sp1);
  span2.innerText = random(sp2);
  span3.innerText = random(sp3);
}

/**
Adds event listeners for changing each line of the poem
*/
function addListeners() {
  line1.addEventListener(`click`, changeLine);
  line2.addEventListener(`click`, changeLine);
  line3.addEventListener(`click`, changeLine);

  line1.addEventListener(`mouseenter`, mouseEnterWord);
  line2.addEventListener(`mouseenter`, mouseEnterWord);
  line3.addEventListener(`mouseenter`, mouseEnterWord);
}

/**
Randomly changes the color of the moused over word and sets a timer to revert
it to black (to give the appearance of a moving trail)
*/
function mouseEnterWord(event) {
  // From: https://dev.to/akhil_001/generating-random-color-with-single-line-of-js-code-fhj
  // So create a random hexadecimal color we can use
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  let highlightColor = '#ff0';
  // Set the element's color to the random color
  event.target.style[`color`] = highlightColor;
  // Set a timeout to revert the color to black after 1500 milliseconds
  setTimeout(function() {
    event.target.style[`color`] = `#000000`;
  }, 1500);
}

/**
Triggers a fade out when a line is clicked
*/
function changeLine(event) {
  fadeOut(event.target, 1);
}

/**
Reduces the opacity of the provided element until it reaches zero
then changes its line and triggers a fade in
*/
function fadeOut(element, opacity) {
  // Change the opacity of the line
  opacity -= 0.01;
  element.style[`opacity`] = opacity;
  // Check if the opacity is greater than 0...
  if (opacity > 0) {
    // If so, keep fading on the next frame
    // Note the use of an anonymous function here so we can pass
    // arguments to fadeOut()
    requestAnimationFrame(function() {
      fadeOut(element, opacity);
    });
  }
  else {
    // If not, we can switch lines and fade in...
    // Set a new line of poem for the element
    setNewLine(element);
    // Trigger a fade in
    fadeIn(element, 0);
  }
}

/**
Increases the opacity of the provided element until it reaches
1 and then stops.
*/
function fadeIn(element, opacity) {
  // Increase the opacity
  opacity += 0.01;
  element.style[`opacity`] = opacity;
  // Check if opacity is still less than 1
  if (opacity < 1) {
    // Keep fading. Note the use of an anonymous function here so we
    // can pass arguments to fadeIn()
    requestAnimationFrame(function() {
      fadeIn(element, opacity);
    });
  }
  else {
    // Do nothing - we're done!
  }
}


/**
Sets the text of the element to a randomly chosen haiku line, accounting for
syllables
*/
function setNewLine(element) {
  if (element === line1 || element === line3) {
    // If the element is line1 or line3, use five syllables
    element.innerText = random(haikuLines.fiveSyllables);
  }
  else {
    // If the element is line2 use seven
    element.innerText = random(haikuLines.sevenSyllables);
  }
    setupTitle();
}

/**
A helper function that returns a random element from the provided array
*/
function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}
