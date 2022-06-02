function countdown(count) {
  let intervalID = setInterval(function () {
    if (count == 0) {
      console.log("DONE!");
      clearInterval(intervalID);
    } else {
      console.log(count);
    }
    count--;
  }, 1000);
}

function randomGame() {
  let num = 0;
  let count = 0;

  let intervalID = setInterval(function () {
    num = Math.random();
    count++;
    console.log(`${num}, ${count}`);

    if (num > 0.75) {
      if (count == 1) {
        console.log(`Took 1 try to find a number larger than 0.75`);
      } else {
        console.log(`Took ${count} tries to find a number larger than 0.75`);
      }
      clearInterval(intervalID);
    }
  }, 1000);
}
