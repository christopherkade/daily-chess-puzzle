import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import "./Board.css";

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
  function makeAMove(move) {
    const solutions = puzzle.solution;
    const currentMoveSolution = solutions[currentMoveIndex];
    const gameCopy = Object.create(gameState);

    // If the move is not the solution, stop.
    if (move.to !== currentMoveSolution.slice(2)) return;

    // Apply the move in the game state
    const result = gameCopy.move(move);
    setGameState(gameCopy);

    if (currentMoveIndex === solutions.length - 1) {
      setHasWon(true);
      // VICTORY ! Define the success screen
      return;
    }

    setCurrentMoveIndex((currentIndex) => currentIndex + 1);

    return result;
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

  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;

    return true;
  }

  return (
    <div className="container">
      <Chessboard
        id="basic-board"
        position={gameState.fen()}
        onPieceDrop={onDrop}
      />
    </div>
  );
};

export default Board;
