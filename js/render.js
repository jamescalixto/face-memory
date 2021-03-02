// Store order of cards.
var order;
var new_order;

// Store other variables.
var timer_value = 0;
var result_orig = true;
var in_result_mode = false;

// Format timer text.
function getTimerText() {
  return timer_value.toString().padStart(3, "0");
}

// Update timer.
function timerTick() {
  document.getElementById("timer").textContent = getTimerText();
  if (timer_value > 0) {
    timer_value -= 1;
  }
}

// Set timer.
function setTimer(i) {
  timer_value = i;
  timerTick();
}


// Set up.
function setUpRender(filenames, names) {
  document.getElementById("memorize").innerHTML = "";
  document.getElementById("recall").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("memorize").classList.remove("hidden");
  document.getElementById("timer-box").classList.remove("hidden");
  document.getElementById("recall").classList.add("hidden");
  document.getElementById("result").classList.add("hidden");
  document.getElementById("message-box").classList.add("hidden");
  setUpCards(filenames, names)
}


// Build cards.
function setUpCards(filenames, names) {
  in_result_mode = false;
  buildMemorizeCards(filenames, names);
  buildRecallCards(filenames);
  buildResultCards(filenames, names);
}


// Build memorize cards from image filenames and names.
function buildMemorizeCards(filenames, names) {
  let template = document.getElementById("memorize-template");
  let target = document.getElementById("memorize");
  for (const i of [...Array(filenames.length).keys()]) {
    let clone = template.cloneNode(true);
    clone.children[0].src = filenames[i];
    clone.children[1].textContent = names[i];
    
    // Rename elements and append.
    clone.id = "memorize-template-" + i.toString();
    clone.children[0].id = "memorize-face-" + i.toString();
    clone.children[1].id = "memorize-label-" + i.toString();
    target.appendChild(clone);
  }
}

// Build recall cards from image filenames and names.
function buildRecallCards(filenames) {
  let template = document.getElementById("recall-template");
  let target = document.getElementById("recall");
  order = [...Array(filenames.length).keys()];
  while (true) { // shuffle so none remain in the same position.
    new_order = [...order];
    shuffleArray(new_order);
    if (order.reduce((acc, elem, i) => acc + (elem == new_order[i]), 0) == 0) {
      break;
    }
  }
  for (const i of new_order) {
    let clone = template.cloneNode(true);
    clone.children[0].src = filenames[i];
    
    // Rename elements and append.
    clone.id = "recall-template-" + i.toString();
    clone.children[0].id = "recall-face-" + i.toString();
    clone.children[1].id = "recall-form-" + i.toString();
    target.appendChild(clone);
  }
  target.classList.add("hidden");
}


// Build recall cards from image filenames and names.
function buildResultCards(filenames, names) {
  let template = document.getElementById("result-template");
  let target = document.getElementById("result");
  for (const i of new_order) {
    let clone = template.cloneNode(true);
    clone.children[0].src = filenames[i];
    clone.children[1].textContent = names[i];
    
    // Rename elements and append.
    clone.id = "result-template-" + i.toString();
    clone.children[0].id = "result-face-" + i.toString();
    clone.children[1].id = "result-label-" + i.toString();
    target.appendChild(clone);
  }
  target.classList.add("hidden");
}


// Get names in input forms.
function getRecallCards() {
  return order.map((i) => document.getElementById("recall-form-" + i).value);
}


// Switch to recall mode and show the proper elements.
function switchRecallRender() {
  document.getElementById("recall").classList.remove("hidden");
  document.getElementById("memorize").classList.add("hidden");
}


// Switch to result mode and show the proper elements.
function switchResultRender() {
  in_result_mode = true;
  flashResults()
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("recall").classList.add("hidden");
}

// Render score.
function renderScore(score) {
  document.getElementById("timer-box").classList.add("hidden");
  document.getElementById("message-box").classList.remove("hidden");
  document.getElementById("message").textContent = score.toString() + " / " + order.length + " points";
}


// Show results flashing.
function flashResults() {
  if (in_result_mode) {
    for (const i of new_order) {
      let name = document.getElementById("memorize-label-" + i.toString()).textContent;
      let given = document.getElementById("recall-form-" + i.toString()).value;
      let target = document.getElementById("result-label-" + i.toString());
      
      let diff = levenshtein(name.trim().toLowerCase(), given.trim().toLowerCase());
      if (given == "") {
        target.classList.add("gray");
        target.style.fontStyle = "italic";
      } else if (diff == 0) {
        target.classList.add("green");
      } else if (diff == 1) {
        target.classList.add("orange");
      } else if (diff > 1) {
        target.classList.add("red");
      }

      if (diff >= 1 && given != "") {
        if (result_orig) {
          target.textContent = name;
          target.style.textDecoration = "initial";
        } else {
          target.textContent = given;
          target.style.textDecoration = "line-through";
        }
      }
    }
    result_orig = !result_orig;
  }
}