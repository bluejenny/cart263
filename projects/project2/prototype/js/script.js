/**
Mood Tracker Calendar
Jennifer Poohachoff


*/

"use strict";

$(`#input-form`).dialog({
  resizable: false,
  modal: true,
  buttons: {
    "Submit": function() {

    }
  }
});

$( ".prison" ).draggable();
// $( "#prison" ).draggable({ containment: "parent" });


// $(`#escape-tunnel`).droppable({
//   drop: function(event, ui) {
//     $(`#prisoner`).remove();
//   }
// });
