/**
Mood Tracker Calendar
Jennifer Poohachoff

*/

"use strict";

// let blockObject?????

// form inputs
let datePicker;
let colorPicker;
let moodPicker;
let alignment;
let widthPicker;

// calendar blocks
let blocks = [];
let label = 1;

//for dropdown of moods
let moodDropdown = $("#moods");

// The key used to save and load the data for this program
const MOOD_DATA_KEY = `mood-block-data`;

//fill in datetime-local with current/default time
let now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
let string = now.toISOString();
$(`#date-picker`).val(string.slice(0,16));

// Try to load the data
// let dataBlocks = JSON.parse(localStorage.getItem(MOOD_DATA_KEY));

// if (dataBlocks) {
// // If so setup the block with the data
// for (let i = 0; i < blocks.length; i++) {
//     setupColorBlocks(dataBlocks);
//     }
// }

/**
Assigns across the profile properties from the data to the current profile
*/
// function setupColorBlocks(data) {
// for (let i = 0; i < blocks.length; i++) {
//   blocks[i].datePicker = data.date;
//   blocks[i].colorPicker = data.color;
//   blocks[i].moodPicker = data.mood;
//   blocks[i].alignment = data.align;
//   blocks[i].widthPicker = data.width;
//   }
// }

// Add json file to <select> dropdown menu
// https://www.codebyamir.com/blog/populate-a-select-dropdown-list-with-json
moodDropdown.empty();
moodDropdown.append('<option selected="true" disabled>I am feeling:');
moodDropdown.prop("selectedIndex", 0);

const url = "assets/json/moods.json";

$.getJSON(url, function (data) {
// randomize the json mood data
data.moods.sort((a, b) => {
    if (Math.random() < .5) {
      return -1
    } else {
      return 1
    }
  })

  for (let i = 0; i < data.moods.length; i++) {
    moodDropdown.append(
      $("<option></option>").attr("value", data.moods[i]).text(data.moods[i])
    );
  }
});


$(`#input-form`).dialog({
  resizable: false,
  modal: false,
  buttons: {
    Submit: function () {
      datePicker = $(`#date-picker`).val();
      colorPicker = $(`#color-picker`).val();
      moodPicker = $(`#moods`).val();
      alignment = $('input:radio[name=alignment]:checked').val();
      widthPicker = $(`#width-picker`).val();
      console.log(datePicker);
      console.log(colorPicker);
      console.log(moodPicker);
      console.log(alignment);
      console.log(widthPicker);
      // for (let i = 0; i < blocks.length; i++) {
      // localStorage.setItem(MOOD_DATA_KEY, JSON.stringify(blocks[i].data));
      // }
      addBlock();
    },
  },
});

// delete localstorage
// localStorage.removeItem(MOOD_DATA_KEY);

// Get timestamp
function addBlock() {
  let timestamp = Date.parse(datePicker);
  console.log(timestamp);
  let leftAlign = 0;
  let rightAlign = 0;

  if (alignment === `left`) {
    rightAlign = `auto`;
  } else if (alignment === `right`) {
    leftAlign = `auto`;
  } else {
    leftAlign = `auto`;
    rightAlign = `auto`;
  }

  // Create the block
  let $block = $(`<div id=${timestamp}></div>`);
  $block.css({
    width: `${widthPicker}%`,
    height: `50px`,
    backgroundColor: `${colorPicker}`,
    display: `block`,
    margin: `0 auto`,
    marginLeft: leftAlign,
    marginRight: rightAlign,
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


$(function() {
   $( "#input-form" ).dialog({
 autoOpen: false,
      close: function( event, ui ) {
         console.log('closed')
      },
   });
   $( "#open-input-form" ).click(function() {
      $( "#input-form" ).dialog( "open" );
   });
});


$(".prison").draggable();
$(".openclose").draggable({
  cancel:false
});

// $( "#prison" ).draggable({ containment: "parent" });

/**
create form button to open and close

*/
// $(document).ready(function() {
//   $("#formButton").click(function() {
//     $("#input-form").toggle();
//   });
// });
