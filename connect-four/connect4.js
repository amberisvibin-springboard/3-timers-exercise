/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

const makeBoard = () => {
  // set "board" to empty HEIGHT x WIDTH matrix array
  //board = Array(HEIGHT).fill(Array(WIDTH).fill(0, 0), 0);
  board = Array.from(Array(HEIGHT), () => new Array(WIDTH).fill(null, 0))
}

/** makeHtmlBoard: make HTML table and row of column tops. */

const makeHtmlBoard = () => {
  // get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById("board");
  // create clickable tops for board
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // create board squares
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
  document.getElementById("alert").innerText = `Player ${currPlayer} turn.`;
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

const findSpotForCol = (x) => {
  if (document.getElementById(`0-${x}`).firstElementChild !== null) {
    return null;
  }
  for (let y = 0; y < HEIGHT; y++) {
    let currSpot = document.getElementById(`${y}-${x}`);
    //console.log(currSpot);
    if (currSpot.firstElementChild != null) {
      
      return y - 1;
    }
  }
  return HEIGHT - 1;
}

/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable = (y, x) => {
  let piece = document.createElement("div");
  piece.classList.add("piece");
  piece.classList.add(`p${currPlayer}`);
  document.getElementById(`${y}-${x}`).append(piece);
  //console.log(`${y}-${x}`);
}

/** endGame: announce game end */

const endGame = (msg) => {
  document.getElementById("alert").innerText = msg;
  document.getElementById("column-top").removeEventListener("click", handleClick);
}

/** handleClick: handle click of column top to play piece */

const handleClick = (evt) => {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x);

  //console.log(checkForWin());
  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  
  // check if all cells in board are filled; if so call, call endGame
  if (board.every((row) => row.every((column) => column))) {
    endGame("Board is filled.")
  }

  // switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;

  document.getElementById("alert").innerText = `Player ${currPlayer} turn.`;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

const checkForWin = () => {
  const _win = (cells) => {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // for ever cell
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // check current cell and 3 to the right
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      // check current cell and 3 down
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // check current cell and 3 diagonally down and right
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      // check current cell and 3 diagonally down and left
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      
      // if any win condition is true
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

