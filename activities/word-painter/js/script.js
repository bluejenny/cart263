/**
Word Painter
Pippin Barr

A text effect that leaves a trail of colored words when the mouse
passes over them. Over time the trail erases itself back to the
default coloor.
*/

"use strict";

// Lorem ipsum in an array to generate the page content
// We're doing this because we need to wrap every word in a <span>
// tag so that we can manipulate every word separately.
let loremIpsumStrings = {
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

// Add the lorem ipsum to the page (complete with event listeners)
addHaiku();
setupLines();


function setupLines() {
  line1.innerText = random(haikuLines.fiveSyllables);
  line2.innerText = random(haikuLines.sevenSyllables);
  line3.innerText = random(haikuLines.fiveSyllables);

}
/**
Goes through the lorem ipsum array and takes each word, wrapping it in a span
that responds to mouse over events in order to change color.
*/
function addHaiku() {
  // Gets the section we will put the page content into
  let section = document.getElementById(`haiku`);
  // Loop through the array of strings
  let line1=random(haikuLines.fiveSyllables);
  for (let i = 0; i < line1.length; i++) {
    // Create a <p> element
    let paragraph = document.createElement(`p`);
    // Get an array of individual words from the current string of lorem ipsum
    // by splitting it at every space character
    let words = line1[i].split(``);
    // Go through every word
    for (let j = 0; j < words.length; j++) {
      // Create a <span> element
      let span = document.createElement(`span`);
      // Add the "word" class to the span (not really doing much right now)
      span.classList.add(`word`);
      // Set the text of the span to the current word so it will display
      span.innerText = `${words[j]} `;
      // Add a mouse enter listener so we can change the span's color
      span.addEventListener(`mouseenter`, mouseEnterWord);
      // Add the current span (word) the current paragraph
      paragraph.appendChild(span);
    }
    // Add the current paragraph to the main section on the webpage
    section.appendChild(paragraph);
  }
}

/**
Randomly changes the color of the moused over word and sets a timer to revert
it to black (to give the appearance of a moving trail)
*/
function mouseEnterWord(event) {
  // From: https://dev.to/akhil_001/generating-random-color-with-single-line-of-js-code-fhj
  // So create a random hexadecimal color we can use
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  // Set the element's color to the random color
  event.target.style[`color`] = randomColor;
  // Set a timeout to revert the color to black after 1500 milliseconds
  setTimeout(function() {
    event.target.style[`color`] = `#000000`;
  }, 1500);
}

/**
A helper function that returns a random element from the provided array
*/
function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}
