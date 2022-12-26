import React, { useState, useEffect, useRef } from "react";
import "./Panel.css";

import highlightSquare from "../../services/highlightSquare";

const PANEL_OFFSET = 50;
const TOTAL_HINTS = 3;

const Panel = ({ puzzle, gameData, currentMoveIndex }) => {
  const [hintsRemaining, setHintsRemaining] = useState(TOTAL_HINTS);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (panelRef) {
      panelRef.current.addEventListener("mouseover", (event) => {
        // Show the panel
        panelRef.current.style.transform = "translateX(0px)";
      });

      panelRef.current.addEventListener("mouseout", (event) => {
        // Show the panel
        panelRef.current.style.transform = `translateX(${
          panelRef.current.clientWidth - PANEL_OFFSET
        }px)`;
      });

      panelRef.current.style.transform = `translateX(${
        panelRef.current.clientWidth - PANEL_OFFSET
      }px)`;
    }
  }, [panelRef]);

  const handleHint = () => {
    highlightSquare(puzzle.solution[currentMoveIndex].slice(0, 2), "green");

    // Lock the button
    if (hintsRemaining === 1) {
      buttonRef.current.disabled = true;
    }

    const totalHintsUsed = window.localStorage.getItem("dcc-hints-used");
    window.localStorage.setItem(
      "dcc-hints-used",
      totalHintsUsed ? Number(totalHintsUsed) + 1 : 1
    );

    setHintsRemaining((prevValue) => prevValue - 1);
  };

  return (
    <>
      <aside className="panel" ref={panelRef}>
        <div className="players-wrapper">
          <span className="players-label">Played by:</span>
          {gameData.players.map((player, index) => (
            <div>
              <span className="player-name">{player.name}</span>
            </div>
          ))}
        </div>

        <div className="stats-wrapper">
          Total players: <span>{puzzle.plays}</span>
        </div>

        <div className="hint-wrapper">
          <button className="hint-button" onClick={handleHint} ref={buttonRef}>
            Get hint (remaining: {hintsRemaining})
          </button>
        </div>
      </aside>
      <div className="mobile-panel">
        <div className="players-wrapper">
          <span className="players-label">Played by:</span>
          {gameData.players.map((player, index) => (
            <div>
              <span className="player-name">{player.name}</span>
            </div>
          ))}
        </div>

        <div className="stats-wrapper">
          Total players: <span>{puzzle.plays}</span>
        </div>

        <div className="hint-wrapper">
          <button className="hint-button" onClick={handleHint} ref={buttonRef}>
            Get hint (remaining: {hintsRemaining})
          </button>
        </div>
      </div>
    </>
  );
};

export default Panel;
