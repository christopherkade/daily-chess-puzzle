import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import Chess from "chess.js";
import "./Board.css";

// TODO: Highlight element when the user does an illegal / incorrect move
// TODO: Define a victory screen
// TODO: Save high scores in local storage
const Board = () => {
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [puzzle, setPuzzle] = useState(null);
  const [game, setGame] = useState(new Chess());

  function makeAMove(move) {
    const solutions = puzzle.solution;
    const currentMoveSolution = solutions[currentMoveIndex];
    const gameCopy = Object.create(game);

    // If the move is not the solution, stop.
    if (move.to !== currentMoveSolution.slice(2)) return;

    // Apply the move in the game state
    const result = gameCopy.move(move);
    setGame(gameCopy);

    if (currentMoveIndex === solutions.length - 1) {
      console.log("865 --- Victory !");
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

  useEffect(() => {
    async function fetchPuzzle() {
      fetch("https://lichess.org/api/puzzle/daily")
        .then((response) => response.json())
        .then((data) => {
          game.load_pgn(data.game.pgn);
          setPuzzle(data.puzzle);
        });
    }

    if (!puzzle) {
      fetchPuzzle();
    }
  }, [puzzle]);

  if (!game || !puzzle) {
    return <div>Loading</div>;
  }

  return (
    <div className="container">
      <Chessboard id="basic-board" position={game.fen()} onPieceDrop={onDrop} />
    </div>
  );
};

export default Board;
