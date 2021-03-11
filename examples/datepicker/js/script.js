/**
datePicker
*/

"use strict";

let datePicker = document.getElementById(`date-picker`);
let colorPicker = document.getElementById(`color-picker`);

// Alert the date chosen each time it's changed
datePicker.addEventListener(`change`, function(event) {
  let date = event.target.value;
  alert(date);
});

// Set the background color of the document when the color
// picker is used
colorPicker.addEventListener(`input`, function(event) {
  let color = event.target.value;
  document.body.style[`background-color`] = color;
});
