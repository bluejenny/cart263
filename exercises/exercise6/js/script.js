/**
Raving Redactionist ++
created by Pippin Barr
adapted by Jennifer Poohachoff

text from https://courses.lumenlearning.com/technicalwriting/chapter/memos_-purpose-and-format-2/

Updates:
- Find a different text to be redacted
- Added some Javascript animation - 'To:' fades out and text is replaced by random in an array
- Added CSS slidein animation - 'To: All ______' where _____  is emphasized
- Added Jquery fade out animation - destroy document button
*/

"use strict";

let employeesThesaurus = [
  `employees`,
  `agents`,
  `attendants`,
  `clerks`,
  `laborers`,
  `members`,
  `operators`,
  `representatives`,
  `staff members`,
  `workers`,
  `apprentices`,
  `assistants`,
  `breadwinners`,
  `cogs`,
  `domestic`,
  `hands`,
  `helps`,
  `hirelings`,
  `jobholders`,
  `plugs`,
  `salespersons`,
  `servants`,
  `slaves`,
  `blue collars`,
  `company persons`,
  `craftspersons`,
  `desk jockeys`,
  `hired guns`,
  `hired hands`,
  `pink collars`,
  `sales help`,
  `wage-earners`,
  `white collars`,
  `working stiffs`
];

let employeeText = document.getElementById(`employee`);

employeeText.innerText = random(employeesThesaurus);

employeeText.addEventListener(`click`, changeLine);

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
    element.innerText = random(employeesThesaurus);
}



$(`.top-secret`).on(`click`, redact);
setInterval(hackIt, 500);

function redact(event) {
  $(this).removeClass(`reveal`);
  $(this).addClass(`redacted`);
}

function hackIt() {
  $(`.redacted`).each(attemptReveal);
}

function attemptReveal() {
  let r = Math.random();
  if (r < 0.1) {
    $(this).removeClass(`redacted`);
    $(this).addClass(`reveal`);
  }
}

let datePicker = document.getElementById(`date-picker`);

// Alert the date chosen each time it's changed
datePicker.addEventListener(`change`, function(event) {
  let date = event.target.value;
  // alert(date);
});


// jquery fadeout document
$(document).ready(function(){
  $("button").click(function(){
    $("#destroy").fadeOut(1000);
  });
});



/**
A helper function that returns a random element from the provided array
*/
function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// repeat the css animation on click
$('#button').onClick(function(){
    $('.animateText').addClass('slidein');
});
