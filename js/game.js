// Constants.
MEMORIZE_SEC = 60;
RECALL_SEC = 180;

// Generate an array of N random images and names to match.
function generateData(face_genders, female_names, male_names, n) {
  // Synchronized to clock for fun!
  const GAME_TIME_INTERVAL = 1000 * 5; // 5 seconds
  let index_prng = new Alea(Math.floor(new Date().getTime() / GAME_TIME_INTERVAL));
  let name_prng = new Alea(Math.floor(new Date().getTime() / GAME_TIME_INTERVAL));

  // Make a list of n random numbers that correspond to images with known genders. Assumes reasonable n.
  function generateIndices() {
    let samples = [];
    while (samples.length < n) {
      let sample = Math.floor(index_prng() * face_genders.length);
      if (!samples.includes(sample) && face_genders[sample] != "unknown") {
        samples.push(sample);
      }
    }
    return samples;
  }

  // Given an array of strings, either "female" or "male", generate some male names and some female names. Samples with replacement.
  function generateNames(gender_list) {   
    // Generate a single weighted sample from a list.
    function generateName(list) {
      let total = parseInt(list[0][1])
      let sample = Math.floor(name_prng() * total);
      for (i = 1; i < list.length && sample > 0; i++) {
        sample -= parseInt(list[i][1])
      }
      return list[i][0]
    }

    return gender_list.map(function(gender) {
      if (gender == "female") {
        return generateName(female_names);
      } else if (gender == "male") {
        return generateName(male_names);
      } else {
        return "???";
      }
    });
  }

  // Get filename from index number.
  function makeFilename(i) {
    return "../faces/" + i.toString().padStart(5, '0') + ".jpg";
  }

  let indices = generateIndices();
  let filenames = indices.map(i => makeFilename(i));
  let genders = indices.map(i => face_genders[i]);
  let names = generateNames(genders);
  return [filenames, names];
}

// Build the recall timer.
function buildRecallTimer() {
  return setTimeout(switchRecall, MEMORIZE_SEC * S_TO_MS);
}

// Build the result timer.
function buildResultTimer() {
  return setTimeout(switchResult, RECALL_SEC * S_TO_MS);
}

// Score a game.
function scoreGame() {
  let recall_names = getRecallCards();

  // Score using Levenshtein.
  function scoreLevenshtein(truth, provided) {
    if (provided == "") {
      return 0;
    }
    let diff = levenshtein(truth.trim().toLowerCase(), provided.trim().toLowerCase());
    if (diff > 1) {
      return -1;
    } else if (diff == 1) {
      return 0.5;
    } else {
      return 1;
    }
  }

  let score = recall_names.reduce((acc, elem, i) => acc + scoreLevenshtein(names[i], elem), 0);
  return score;
}