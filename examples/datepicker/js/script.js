/**
datePicker

moods.json from: https://github.com/dariusk/corpora/blob/master/data/humans/moods.json
*/

"use strict";

let datePicker = document.getElementById(`date-picker`);
let colorPicker = document.getElementById(`color-picker`);

// Alert the date chosen each time it's changed
datePicker.addEventListener(`change`, function(event) {
  let date = event.target.value;
  // alert(date);
});

// Set the background color of the document when the color
// picker is used
colorPicker.addEventListener(`input`, function(event) {
  let color = event.target.value;
  document.body.style[`background-color`] = color;

  // if (color !== #ffffff) {
  //   $("#box").style({background: #ffffff});
  // }
});

// jquery animate happy sad line
$(document).ready(function(){
  $("#btn1").click(function(){
    $("#line").animate({width: "100%"});
  });
  $("#btn2").click(function(){
    $("#line").animate({width: "50%"});
  });
  $("#btn3").click(function(){
    $("#line").animate({width: "0"});
  });
});
