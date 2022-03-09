const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let clickCount = 0;
let acceptClicks = true;

//card objects
let cardOne = {color: null, id: null};
let cardTwo = {color: null, id: null};

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (const [index, color] of colorArray.entries()) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    //hide the color of the card
    newDiv.classList.add("hidden");

    //give it an id for access later
    newDiv.setAttribute("id", index);

    //newDiv.style.backgroundColor = color;

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  //if we are currently accepting clicks 
  //(we don't when we are showing a guess)
  if (acceptClicks === true) {
    //get the color of the card,
    //it should always be in the first class slot
    let cardColor = event.target.classList[0];
    //get the id of the card
    let cardID = event.target.getAttribute("id");
    //show the card's color
    event.target.classList.remove("hidden");
    //increment click count
    clickCount++;
    if (clickCount === 1) {
      //if its the first card, update the card object
      cardOne.color = cardColor;
      cardOne.id = cardID;
    } else if (clickCount === 2) {
      //if its the second card
        if (cardOne.id === cardID) {
          //if it's the same card, decrease click count
          clickCount--;
        } else {
          //if its a different card, update the card object
          cardTwo.color = cardColor;
          cardTwo.id = cardID;
          if (cardOne.color !== cardTwo.color) {
            //if cards are not the same, add a timeout to show the
            //cards for 1 second. also stop accepting clicks 
            //during that time.
            //there is most likely a better way to check if accepting
            //clicks by just removing the eventListener but w/e
            clickCount = 0;
            acceptClicks = false;
            setTimeout(function () {
              //ater 1 second, rehide cards and accept clicks again
              event.target.classList.add("hidden");
              document.getElementById(cardOne.id).classList.add("hidden");
              acceptClicks = true;
            }, 1000);
          } else {
            //if the cards are the same, reset click counter
            clickCount = 0;
          }
        }
    }
    console.log(`${cardOne.color} ${cardOne.id}, ${cardTwo.color} ${cardTwo.id}`);
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
