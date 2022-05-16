/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

class Game {
  constructor(playerList, width, height) {
    this.playerList = playerList;
    this.WIDTH = width;
    this.HEIGHT = height;
  }

  currPlayer = 1; // active player: 1 or 2
  board = []; // array of rows, each row is array of cells  (board[y][x])
  gameOver = false; // whether game is in progress

  start() {
    this.makeBoard();
    this.makeHtmlBoard();
  }

  reset() {
    this.currPlayer = 1;
    this.board = [];
    this.gameOver = false;
    document.getElementById('board').innerHTML = '';
    //this could be refactored to allow more players
    this.playerList[0].color = document.getElementById("p1-color").value;
    this.playerList[1].color = document.getElementById("p2-color").value;
    this.start();
  }

  /** makeBoard: create in-JS board structure:
   *   board = array of rows, each row is array of cells  (board[y][x])
   */
  makeBoard() {
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  }

  /** makeHtmlBoard: make HTML table and row of column tops. */
  makeHtmlBoard() {
    const board = document.getElementById('board');
  
    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.handleClick.bind(this));
  
    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
  
    board.append(top);
  
    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement('tr');
  
      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
  
      board.append(row);
    }
    document.getElementById("alert").innerText = `Player ${this.currPlayer} turn.`;
  }

  /** handleClick: handle click of column top to play piece */
  handleClick(evt) {
    if (this.gameOver === false) {
      // get x from ID of clicked cell
      const x = +evt.target.id;
    
      // get next spot in column (if none, ignore click)
      const y = this.findSpotForCol(x);
      if (y === null) {
        return;
      }
    
      // place piece in board and add to HTML table
      this.board[y][x] = this.currPlayer;
      this.placeInTable(y, x);
      
      // check for win
      if (this.checkForWin()) {
        return this.endGame(`Player ${this.currPlayer} won!`);
      }
      
      // check for tie
      if (this.board.every(row => row.every(cell => cell))) {
        return this.endGame('Tie!');
      }
        
      // switch players
      this.currPlayer = this.currPlayer === 1 ? 2 : 1;
      document.getElementById("alert").innerText = `Player ${this.currPlayer} turn.`;
    }
    
  }

  /** findSpotForCol: given column x, return top empty y (null if filled) */
  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  /** placeInTable: update DOM to place piece into HTML table of board */
  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${this.currPlayer}`);
    //TODO: jank
    piece.style.backgroundColor = this.playerList[this.currPlayer - 1].color;
    piece.style.top = -50 * (y + 2);
  
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  /** checkForWin: check board cell-by-cell for "does a win start here?" */
  checkForWin() {
    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
        // find winner (only checking each win-possibility as needed)
        if (this._win(horiz) || this._win(vert) || this._win(diagDR) || this._win(diagDL)) {
          return true;
        }
      }
    }
  }

  // Check four cells to see if they're all color of current player
  //  - cells: list of four (y, x) cells
  //  - returns true if all are legal coordinates & all match currPlayer
  _win(cells) {
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < this.HEIGHT &&
        x >= 0 &&
        x < this.WIDTH &&
        this.board[y][x] === this.currPlayer
    );
  }

  /** endGame: announce game end */
  endGame(msg) {
    document.getElementById("alert").innerText = msg;
    this.gameOver = true;
  }
}

class Player {
  constructor(color) {
    if (color.length != 7) {
      throw "Bad color str length";
    }
    this.color = color;
  }
}

document.addEventListener("DOMContentLoaded", function(){
  let p1 = new Player(document.getElementById("p1-color").value);
  let p2 = new Player(document.getElementById("p2-color").value);
  let playerList = [p1, p2];
  let game = new Game(playerList, 6, 7);
  game.start();

  document.addEventListener("submit", function(event) {
    //prevent page reload upon clicking a button
    event.preventDefault();
    game.reset();
  });
});