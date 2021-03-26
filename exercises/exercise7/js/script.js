/**
Code Taker ++
created by Pippin Barrs

adapted by Jennifer Poohachoff

** UPDATES **
- Reworked the HTML and CSS
- Changed text and secret message
- Added an additional feature when user gets message correct they can view postcard
*/

"use strict";

// The secret answer we're looking for (including capitalization)
let secret = `MissYou`;
// testing purposes
// let secret = `M`;

// Turn the dialog div into an actual dialog
$(`#solved-dialog`).dialog({
  // Don't open it right away
  autoOpen: false,
  // Add a condescending button to close it
  buttons: {
    "CLOSE": function() {
      $(this).dialog(`close`);
    }
  }
});

// When the user mouses over secret letters, highlight them
$(`.secret`).on(`mouseover`, function(event) {
  $(this).addClass(`found`, 500);
});

// Let the user drag secret letters via a clone helper
$(`.secret`).draggable({
  helper: `clone`
});

// When the user drops a letter on the answer...
$(`#answer`).droppable({
  drop: function(event, ui) {
    // Get the letter in the dragged element
    let letter = ui.draggable.text();
    // Add it to the answer box
    $(this).append(letter);
    // Disable dragging for this letter
    ui.draggable.draggable(`disable`);
    // Remove the highlighting of this letter
    ui.draggable.removeClass(`found`, 500);
    // Disable mouseovers on this letter
    ui.draggable.off(`mouseover`);
    // Check if they got the answer right yet...
    if ($(`#answer`).text() === secret) {
      // If they did, display the dialog!
      $(`#solved-dialog`).dialog(`open`);

      $(document).ready(function(){
      	$('.togglebtn').click(function(){
         		$('.myimgdivtoggle').toggle();
      	});
      });
    }
  }
});
