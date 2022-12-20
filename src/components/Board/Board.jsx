import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import "./Board.css";

const Board = () => {
  const [puzzle, setPuzzle] = useState(null);
  const [game, _] = useState(new Chess());

  useEffect(() => {
    async function fetchPuzzle() {
      fetch("https://lichess.org/api/puzzle/daily")
        .then((response) => response.json())
        .then((data) => {
          game.loadPgn(data.game.pgn);
          setPuzzle(data);
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
      <Chessboard id="basic-board" position={game.fen()} />
    </div>
  );
};

export default Board;
