// Store data.
face_genders = NaN;
female_names = NaN;
male_names = NaN;
filenames = NaN;
names = NaN;
timer = NaN;
tick_timer = NaN;
result_timer = NaN;
current_mode = "setup";

// Set up everything.
function setUp(input_face_genders, input_female_names, input_male_names) {
  face_genders = input_face_genders;
  female_names = input_female_names;
  male_names = input_male_names;
  newGame(18, 3)
}

// Create a new game.
function newGame(n, target) {
  let data = generateData(face_genders, female_names, male_names, n);
  filenames = data[0];
  names = data[1];
  setUpRender(filenames, names);

  // Clear existing timers.
  try {
    window.clearTimeout(timer);
    window.clearInterval(result_timer);
    window.clearInterval(tick_timer);
  } catch(err) {
    // Don't care.
  }

  // Initialize timers.
  result_timer = setInterval(flashResults, S_TO_MS);
  tick_timer = setInterval(timerTick, S_TO_MS);
  setTimer(MEMORIZE_SEC);
  window.clearTimeout(timer);
  timer = buildRecallTimer();
  current_mode = "memorize";
}

// Switch to recall mode.
function switchRecall() {
  switchRecallRender();
  setTimer(RECALL_SEC);
  window.clearTimeout(timer);
  timer = buildResultTimer();
  current_mode = "recall";
}


// Switch to result mode.
function switchResult() {
  switchResultRender();
  renderScore(scoreGame());
  current_mode = "result";
}

// Switch mode early.
function skipStage() {
  switch(current_mode) {
    case "memorize":
      switchRecall();
      break;
    case "recall":
      switchResult();
      break;
  }
}