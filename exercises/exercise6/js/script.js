/**
Raving Redactionist
by Pippin Barr
*/

"use strict";

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
