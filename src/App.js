import React, { useEffect, useState } from "react";
import Chess from "chess.js";

import { Board } from "./components/Board";
import { Panel } from "./components/Panel";
import { VictoryPanel } from "./components/VictoryPanel";

import getInitialColor from "./services/getInitialColor";

import "./App.css";

function App() {
  const [hasWon, setHasWon] = useState(false);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [puzzle, setPuzzle] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [gameState, setGameState] = useState(new Chess());
  const [initialColor, setInitialColor] = useState('white');

  useEffect(() => {
    const date = new Date();
    const today =
      date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    document.title = "Daily Chess Club - " + today;
  }, []);

  useEffect(() => {
    async function fetchPuzzle() {
      fetch("https://lichess.org/api/puzzle/daily")
        .then((response) => response.json())
        .then((data) => {
          gameState.load_pgn(data.game.pgn);
          setPuzzle(data.puzzle);
          setGameData(data.game);

          const initialColor = getInitialColor(data.game.pgn)
          console.log('initialcolor', initialColor)
          setInitialColor(initialColor)
        });
    }

    async function fetchPuzzleById(id) {
      fetch(`https://lichess.org/api/puzzle/${id}`)
        .then((response) => response.json())
        .then((data) => {
          gameState.load_pgn(data.game.pgn);
          setPuzzle(data.puzzle);
          setGameData(data.game);
        });
    }

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!puzzle && !id) {
      fetchPuzzle();
    } else if (id && !puzzle) {
      fetchPuzzleById(id);
    }
  }, [puzzle]);

  if (!gameState || !puzzle) {
    return null;
  }

  return (
    <div className="wrapper" id="main-wrapper">
      <Board
        className="board"
        puzzle={puzzle}
        gameState={gameState}
        setGameState={setGameState}
        currentMoveIndex={currentMoveIndex}
        setCurrentMoveIndex={setCurrentMoveIndex}
        setHasWon={setHasWon}
      />
      <Panel
        puzzle={puzzle}
        currentMoveIndex={currentMoveIndex}
        initialColor={initialColor}
      />
      {hasWon && <VictoryPanel puzzle={puzzle} />}

      <p className="disclaimer">
        Pawn promotion is not yet supported, thank you for your understanding
      </p>
    </div>
  );
}

export default App;
