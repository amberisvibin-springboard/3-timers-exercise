const $guessForm = $("#guess-form");
const $guessInput = $("#guess-input");
const $info = $("#info");
const $score = $("#score");
const $time = $("#time");

let score = 0;

async function sendGuess(evt) {
  evt.preventDefault();
  guess = $guessInput.val();
  console.log(guess);

  const response = await axios({
    url: `/guess`,
    method: "POST",
    params: { guess: guess },
  });

  console.log(response);
  result = response.data.result;

  if (result == "ok") {
    $info.addClass("good");
    $info.removeClass("bad");
    $info.text(`Word "${guess}" found!`);

    score += guess.length;
    $score.text(score);
  } else if (result == "not-word") {
    $info.addClass("bad");
    $info.removeClass("good");
    $info.text(`"${guess}" is not a word.`);
  } else if (result == "not-on-board") {
    $info.addClass("bad");
    $info.removeClass("good");
    $info.text(`Word "${guess}" is not on the board.`);
  } else if (result == "duplicate") {
    $info.addClass("bad");
    $info.removeClass("good");
    $info.text(`"${guess}" has already been guessed.`);
  }

  $guessForm.trigger("reset");
}

$guessForm.on("submit", sendGuess);

let count = 59;

let intervalID = setInterval(function () {
  if (count == 0) {
    clearInterval(intervalID);
    $time.text(count);
    $info.addClass("bad");
    $info.removeClass("good");
    $info.text(`Time's up!`);
    $guessForm.unbind("submit");
    $guessForm.on("submit", (evt) => {
      evt.preventDefault();
    });
    const response = axios({
      url: `/score`,
      method: "POST",
      params: { score: score },
    });
    console.log(response);
  } else {
    $time.text(count);
  }
  count--;
}, 1000);
