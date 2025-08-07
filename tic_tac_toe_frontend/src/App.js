import React, { useState } from "react";
import "./App.css";

/**
 * Game constants for styling and logic
 */
const COLORS = {
  primary: "#2196F3",   // Blue, used for X
  secondary: "#FFFFFF", // White, board background
  accent: "#FF4081",    // Pink, used for O and highlights
};

// PUBLIC_INTERFACE
function App() {
  // Board state: 9 cells
  const [board, setBoard] = useState(Array(9).fill(null));
  // True: X's turn, False: O's turn
  const [xIsNext, setXIsNext] = useState(true);
  // Winner: "X", "O", or null
  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((c) => c !== null);

  // PUBLIC_INTERFACE
  function handleCellClick(idx) {
    if (board[idx] || winner) return; // Ignore if filled or game ended
    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? "X" : "O";
    setBoard(nextBoard);
    setXIsNext((prev) => !prev);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  // PUBLIC_INTERFACE
  function renderStatus() {
    if (winner) {
      return (
        <span className="game-status" style={{ color: winner === "X" ? COLORS.primary : COLORS.accent }}>
          Player {winner} wins!
        </span>
      );
    }
    if (isDraw) {
      return (
        <span className="game-status" style={{ color: "#888", fontWeight: 500 }}>
          It's a draw!
        </span>
      );
    }
    return (
      <span className="game-status">
        Next turn: <span style={{ color: xIsNext ? COLORS.primary : COLORS.accent, fontWeight: 600 }}>
          {xIsNext ? "X" : "O"}
        </span>
      </span>
    );
  }

  // PUBLIC_INTERFACE
  function renderCell(idx) {
    return (
      <button
        className="ttt-cell"
        aria-label={`Cell ${idx + 1}, ${board[idx] ? board[idx] : "empty"}`}
        onClick={() => handleCellClick(idx)}
        style={{
          color:
            board[idx] === "X"
              ? COLORS.primary
              : board[idx] === "O"
              ? COLORS.accent
              : "#bbb",
        }}
        disabled={!!board[idx] || !!winner}
        tabIndex={0}
        data-cell={idx}
      >
        {board[idx]}
      </button>
    );
  }

  return (
    <div className="ttt-app">
      <h1 className="ttt-title">Tic Tac Toe</h1>
      <div className="ttt-player-indicator">
        {renderStatus()}
      </div>
      <div className="ttt-board-container">
        <div className="ttt-board">
          {Array(3)
            .fill(0)
            .map((_, row) => (
              <div className="ttt-row" key={row}>
                {Array(3)
                  .fill(0)
                  .map((_, col) => renderCell(3 * row + col))}
              </div>
            ))}
        </div>
      </div>
      <div className="ttt-restart-container">
        <button className="ttt-restart-btn" onClick={handleRestart} aria-label="Restart game">
          Restart
        </button>
      </div>
      <footer className="ttt-footer">
        <span>
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="ttt-footer-link"
          >
            React Demo
          </a>
        </span>
      </footer>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Calculates the winner of the Tic Tac Toe board
 * @param {string[]} squares - Array of 9 (X, O, or null)
 * @returns {"X"|"O"|null}
 */
function calculateWinner(squares) {
  // All possible win lines
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

export default App;
