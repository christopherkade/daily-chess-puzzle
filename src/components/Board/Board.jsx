import React, { useEffect, useState, useRef } from "react";
import { Chessboard } from "react-chessboard";
import "./Board.css";

import highlightSquare from "../../services/highlightSquare";

// TODO: Highlight element when the user does an illegal / incorrect move
// TODO: Define a victory screen
// TODO: Save high scores in local storage
const Board = ({
  puzzle,
  gameState,
  setGameState,
  currentMoveIndex,
  setCurrentMoveIndex,
  setHasWon,
}) => {
  const [chessboardSize, setChessboardSize] = useState(undefined);
  const [totalMoves, setTotalMoves] = useState(0);
  const boardRef = useRef();

  function updateStats() {
    const totalWinsLS = window.localStorage.getItem("dcc-wins");
    const totalMovesLS = window.localStorage.getItem("dcc-total-moves");

    if (!totalWinsLS) {
      window.localStorage.setItem(
        "dcc-first-win",
        document.title.split("-")[1].trim()
      );
    }

    window.localStorage.setItem(
      "dcc-wins",
      totalWinsLS ? Number(totalWinsLS) + 1 : 1
    );
    window.localStorage.setItem(
      "dcc-total-moves",
      totalMovesLS ? totalMovesLS + totalMoves : totalMoves + 1
    );

    setHasWon(true);
  }

  function makeAMove(move) {
    const solutions = puzzle.solution;
    const currentMoveSolution = solutions[currentMoveIndex];
    const gameCopy = Object.create(gameState);

    // If the move is not the solution, stop.
    if (move.to !== currentMoveSolution.slice(2)) return null;

    // Apply the move in the game state
    const result = gameCopy.move(move);
    setGameState(gameCopy);

    if (currentMoveIndex === solutions.length - 1) {
      updateStats();
      return;
    }

    setCurrentMoveIndex((currentIndex) => currentIndex + 1);

    return result;
  }

  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) {
      highlightSquare(sourceSquare, "red");
      return false;
    }

    setTotalMoves((prev) => prev + 1);

    return true;
  }

  // Triggered each time a move is made
  // And automatically executes the next correct move if it's the bot's turn
  useEffect(() => {
    if (!puzzle) return;

    if (currentMoveIndex % 2 === 0) return;

    const solutions = puzzle.solution;
    const nextMove = solutions[currentMoveIndex];
    makeAMove({
      from: nextMove.slice(0, 2),
      to: nextMove.slice(2),
    });
  }, [currentMoveIndex]);

  useEffect(() => {
    function handleResize() {
      const board = document.querySelector("#main-wrapper");

      if (board.offsetWidth > 500) return;

      setChessboardSize(board.offsetWidth - 20);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="basic-board">
      <Chessboard
        ref={boardRef}
        position={gameState.fen()}
        onPieceDrop={onDrop}
        boardWidth={chessboardSize}
      />
    </div>
  );
};

export default Board;
