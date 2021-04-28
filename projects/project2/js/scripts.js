/**
Mood Tracker Calendar
Jennifer Poohachoff

*/

"use strict";

// form inputs
let datePicker;
let colorPicker;
let moodPicker;
let alignment;
let widthPicker;

// calendar blocks
let calendarData = {
  blocks: [],
};
let label = 1;

//for dropdown of moods
let moodDropdown = $("#moods");

// The key used to save and load the data for this program
const MOOD_DATA_KEY = `mood-block-data`;

//fill in datetime-local with current/default time
let now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
let string = now.toISOString();
$(`#date-picker`).val(string.slice(0, 16));

// Try to load the data
let data = JSON.parse(localStorage.getItem(MOOD_DATA_KEY));

if (data) {
  // If there's data we can loop through the blocks and add them
  // to the application (and calendarData)
  for (let i = 0; i < data.blocks.length; i++) {
    addBlock(data.blocks[i]);
  }
}

// Add json file to <select> dropdown menu
// https://www.codebyamir.com/blog/populate-a-select-dropdown-list-with-json
moodDropdown.empty();
moodDropdown.append('<option selected="true" disabled>I am feeling:');
moodDropdown.prop("selectedIndex", 0);

const url = "assets/json/moods.json";

$.getJSON(url, function (data) {
  // randomize the json mood data
  data.moods.sort((a, b) => {
    if (Math.random() < 0.5) {
      return -1;
    } else {
      return 1;
    }
  });

  for (let i = 0; i < data.moods.length; i++) {
    moodDropdown.append(
      $("<option></option>").attr("value", data.moods[i]).text(data.moods[i])
    );
  }
});

$(`#input-form`).dialog({
  wiidth: 600,
  responsive: true,
  resizable: false,
  modal: false,
  buttons: {
    Submit: function () {
      datePicker = $(`#date-picker`).val();
      colorPicker = $(`#color-picker`).val();
      moodPicker = $(`#moods`).val();
      alignment = $("input:radio[name=alignment]:checked").val();
      widthPicker = $(`#width-picker`).val();

      // Add a new block using this data!
      // Note that addBlock() now accepts a parameter with the block data
      addBlock({
        timestamp: Date.parse(datePicker),
        date: datePicker,
        color: colorPicker,
        mood: moodPicker,
        alignment: alignment,
        width: widthPicker,
      });
      // Save the data after adding this block
      localStorage.setItem(MOOD_DATA_KEY, JSON.stringify(calendarData));
    },
  },
});

// delete localstorage
// localStorage.removeItem(MOOD_DATA_KEY);

// Get timestamp
function addBlock(blockData) {
  // Various setup tasks...
  let timestamp = blockData.timestamp;
  let leftAlign = 0;
  let rightAlign = 0;

  // for setting up CSS for alignment property
  if (blockData.alignment === `left`) {
    rightAlign = `auto`;
  } else if (blockData.alignment === `right`) {
    leftAlign = `auto`;
  } else {
    leftAlign = `auto`;
    rightAlign = `auto`;
  }

  // Create the block
  let $block = $(`<div id=${blockData.timestamp}></div>`);
  $block.css({
    width: `${blockData.width}%`,
    height: `50px`,
    backgroundColor: `${blockData.color}`,
    display: `block`,
    margin: `0 auto`,
    marginLeft: leftAlign,
    marginRight: rightAlign,
  });
  $block.text(label);
  label++;

  // Search for where to add the new block to data based on its timestamp
  let index = undefined;
  for (let i = 0; i < calendarData.blocks.length; i++) {
    if (timestamp < calendarData.blocks[i].timestamp) {
      index = i;
      break;
    }
  }
  if (index === undefined) {
    // If we didn't find a spot either there's nothing in the array or
    // this new block has the highest timestamp (it wasn't less than any
    // currently existing timestamp in the data)
    // So add it to the end of the calendar representation
    $(`#calendar`).append($block);
    // And to the end of the data array
    calendarData.blocks.push(blockData);
  } else {
    // Otherwise we found an index position to insert our new block at
    // Add it to the visual representation first (since it relies on the
    // old version of the calendarData before this one is added)
    $(`#${calendarData.blocks[index].timestamp}`).before($block);
    // And now splice the data into the array at the position found
    calendarData.blocks.splice(index, 0, blockData);
  }
}

$(function () {
  $("#input-form").dialog({
    autoOpen: false,
    close: function (event, ui) {
      console.log("closed");
    },
  });
  $("#open-input-form").click(function () {
    $("#input-form").dialog("open");
  });
});

  $("#erase-data").click(function(){
  localStorage.removeItem(MOOD_DATA_KEY);
  });

// $(".prison").draggable();
$("#erase-data").draggable({
  cancel: false,
});
$(".openclose").draggable({
  cancel: false,
});
$("#imgdisplaybutton").draggable({
  cancel: false,
});

$(document).ready(function(){
  $("#imgdisplaybutton").click(function(){
    $(".titleimage").toggle(1000);
  });
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
