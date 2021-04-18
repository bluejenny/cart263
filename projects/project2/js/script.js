/**
Mood Tracker Calendar
Jennifer Poohachoff

*/

"use strict";

// form inputs
// let datePicker = document.getElementById(`date-picker`);
let colorPicker = document.getElementById(`color-picker`);
let moodPicker = document.getElementById(`moods`);
let alignmentPicker = document.getElementById(`alignment-picker`);
let widthPicker = document.getElementById(`width-picker`);

// calendar blocks
let blocks = [];
let label = 1;

//moods

let moodDropdown = $("#moods");


let color;
let colorWidth;


// new date picker for experiment

var $datepicker = $('#datepicker');
$datepicker.datepicker();
$datepicker.datepicker('setDate', new Date());

// Add json file to <select> dropdown menu
// https://www.codebyamir.com/blog/populate-a-select-dropdown-list-with-json
moodDropdown.empty();
moodDropdown.append('<option selected="true" disabled>I am feeling:');
moodDropdown.prop("selectedIndex", 0);

const url = "../assets/json/moods.json";

$.getJSON(url, function (data) {
  for (let i = 0; i < data.moods.length; i++) {
    moodDropdown.append(
      $("<option></option>").attr("value", data.moods[i]).text(data.moods[i])
    );
  }
});


// // listen for date input
// datePicker.addEventListener(`change`, function (event) {
//   let date = event.target.value;
//   console.log(date);
//   // alert(date);
// });
//
// listen for colorpicker and change the background color when color is selected
colorPicker.addEventListener(`input`, function (event) {
  color = event.target.value;
  // document.body.style[`background-color`] = color;
  console.log(color);
});
//
// // listen for mood picker and store word
// moodPicker.addEventListener(`change`, function (event) {
//   let mood = event.target.value;
//   // alert(date);
//   console.log(mood);
// });
//
// listen for color width and store width
widthPicker.addEventListener(`change`, function (event) {
  colorWidth = event.target.value;
  // alert(date);
  console.log(colorWidth);
});
//
// // listen for  alignment
// alignmentPicker.addEventListener(`change`, function (event) {
//   let alignment = event.target.value;
//   // alert(date);
//   console.log(alignment);
// });
//
$(`#input-form`).dialog({
  resizable: false,
  modal: false,
  buttons: {
    Submit: function () {},
  },
});

$(`#add`).on(`click`, addBlock);

// Get timestamp
function addBlock() {
  let date = $(`#datepicker`).val();
  let timestamp = Date.parse(date);
  console.log(timestamp);
  console.log(date);

  // Create the block
  let $block = $(`<div id=${timestamp}></div>`);
  $block.css({
    width: `${colorWidth}%`,
    //height: `100px`,
    backgroundColor: `${color}`,
    display: `block`,
  });
  $block.text(label);
  label++;

  // Search for where to add the new block based on its timestamp
  let index = blocks.length;
  for (let i = 0; i < blocks.length; i++) {
    if (timestamp < blocks[i]) {
      index = i;
      break;
    }
  }

  // Add the block HTML element to the page in the right position
 if ($(`#${blocks[index]}`).length === 0) {
   $(`#calendar`).append($block)
 }
 else {
   $(`#${blocks[index]}`).before($block);
 }

 // Adding the new timestamp to the array
 blocks.splice(index,0,timestamp);
}

$(".prison").draggable();
// $( "#prison" ).draggable({ containment: "parent" });

/**
create form button to open and close

*/
// $(document).ready(function() {
//   $("#formButton").click(function() {
//     $("#input-form").toggle();
//   });
// });
