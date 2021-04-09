/**
Mood Tracker Calendar
Jennifer Poohachoff

*/

"use strict";

let datePicker = document.getElementById(`date-picker`);
let colorPicker = document.getElementById(`color-picker`);
let moodPicker = document.getElementById(`moods`);
let alignmentPicker = document.getElementById(`alignment-picker`);
let widthPicker = document.getElementById(`width-picker`);

// Alert the date chosen each time it's changed
datePicker.addEventListener(`change`, function(event) {
  let date = event.target.value;
  console.log(date);
  // alert(date);
});

// Set the background color of the document when the color
// picker is used
colorPicker.addEventListener(`input`, function(event) {
  let color = event.target.value;
  document.body.style[`background-color`] = color;
  console.log(color);
});

// Alert the date chosen each time it's changed
moodPicker.addEventListener(`change`, function(event) {
  let mood = event.target.value;
  // alert(date);
  console.log(mood);
});

// Alert the date chosen each time it's changed
widthPicker.addEventListener(`change`, function(event) {
  let colorWidth = event.target.value;
  // alert(date);
  console.log(colorWidth);
});

// Alert the date chosen each time it's changed
alignmentPicker.addEventListener(`change`, function(event) {
  let alignment = event.target.value;
  // alert(date);
  console.log(alignment);
});




$(`#input-form`).dialog({
  resizable: false,
  modal: false,
  buttons: {
    "Submit": function() {

    }
  }
});

$( ".prison" ).draggable();
// $( "#prison" ).draggable({ containment: "parent" });




/**
Add json file to <select> dropdown menu
https://www.codebyamir.com/blog/populate-a-select-dropdown-list-with-json

*/

let dropdown = $('#moods');

dropdown.empty();

dropdown.append('<option selected="true" disabled>I am feeling:');
dropdown.prop('selectedIndex', 0);

const url = '../assets/json/moods.json';

$.getJSON(url, function (data) {
  for (let i = 0; i < data.moods.length; i++) {
     dropdown.append($('<option></option>').attr('value', data.moods[i]).text(data.moods[i]));
  }
});


/**
create form button to open and close

*/
// $(document).ready(function() {
//   $("#formButton").click(function() {
//     $("#input-form").toggle();
//   });
// });
