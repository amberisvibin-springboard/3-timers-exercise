import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
  const [boardHidden, setBoardHidden] = useState(false);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let x = 0; x < nrows; x++) {
      initialBoard[x] = []; // Initialize inner array
      for (let y = 0; y < ncols; y++) {
        initialBoard[x][y] = Math.random() < 0.5;
      }
    }
    //console.log(initialBoard);
    return initialBoard;
  }

  function hasWon() {
    //check the board in state to determine whether the player has won.
    //console.table(board);
    for (let x = 0; x < nrows; x++) {
      for (let y = 0; y < ncols; y++) {
        //console.log(board[x][y]);
        if (board[x][y] === false) {
          return false;
        }
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    //console.log(coord);
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      //console.table(y, x);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      //Make a (deep) copy of the oldBoard
      let oldBoardCopy = JSON.parse(JSON.stringify(oldBoard));

      // console.table(oldBoard);
      // flipCell(0, 0, oldBoardCopy);
      // console.table(oldBoardCopy);

      //in the copy, flip this cell and the cells around it
      flipCell(y, x, oldBoardCopy);
      flipCell(y + 1, x, oldBoardCopy);
      flipCell(y - 1, x, oldBoardCopy);
      flipCell(y, x + 1, oldBoardCopy);
      flipCell(y, x - 1, oldBoardCopy);

      return oldBoardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()) {
    //console.log("win");
    setBoardHidden(true);
    setBoard(createBoard());
  }

  // make table board

  let cells = [];
  let row = [];

  for (let y = 0; y < nrows; y++) {
    for (let x = 0; x < ncols; x++) {
      row.push(
        <Cell
          isLit={board[y][x]}
          flipCellsAroundMe={flipCellsAround}
          id={y + "-" + x}
        ></Cell>
      );
    }
    cells.push(<tr>{row}</tr>);
    row = [];
  }

  if (boardHidden) {
    return <h1>You won!</h1>;
  } else {
    return <table className="Board">{cells}</table>;
  }
}

export default Board;
