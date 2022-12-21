import React, { useState, useEffect, useRef } from "react";
import "./Panel.css";

// TODO: Handle mobile
const PANEL_OFFSET = 50;

// TODO: Handle mobile display for panel
const Panel = ({ puzzle, gameData, currentMoveIndex }) => {
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  console.log("865 --- P", puzzle);
  console.log("865 --- G", gameData);

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
    let i = 0;
    let originalNodeColor;

    const nextMove = puzzle.solution[currentMoveIndex].slice(0, 2);
    const moveNode = document.querySelector(`[data-square="${nextMove}"]`);

    const intervalId = setInterval(() => {
      if (moveNode.style.backgroundColor === "red") {
        moveNode.style.backgroundColor = originalNodeColor;
      } else {
        originalNodeColor = moveNode.style.backgroundColor;
        moveNode.style.backgroundColor = "red";
      }

      shouldClearInterval();
      i++;
    }, 200);

    const shouldClearInterval = () => {
      if (i === 3) {
        clearInterval(intervalId);
      }
    };

    // Lock the button
    if (hintsRemaining === 1) {
      buttonRef.current.disabled = true;
    }

    console.log("865 --- Hint");
    setHintsRemaining((prevValue) => prevValue - 1);
  };

  return (
    <div className="panel" ref={panelRef}>
      <h1 className="title">Puzzle {puzzle.id}</h1>

      <div className="players-wrapper">
        {gameData.players.map((player, index) => (
          <>
            <span className="player-name">{player.name}</span>
            {index === 0 && <span className="vs"> v </span>}
          </>
        ))}
      </div>

      <div className="hint-wrapper">
        <button className="hint-button" onClick={handleHint} ref={buttonRef}>
          Get hint (remaining: {hintsRemaining})
        </button>
      </div>
    </div>
  );
};

export default Panel;
