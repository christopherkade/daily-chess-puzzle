import React, { useState, useRef } from "react";
import styled from "styled-components";
import "./Panel.css";

import WhitePawn from './WhitePawn'
import BlackPawn from './BlackPawn'
import highlightSquare from "../../services/highlightSquare";

const TOTAL_HINTS = 3;

const StatLabel = styled.h2`
  font-size: 1rem;
  margin: 0;
  margin-right: 4px;
`

const StatWrapper = styled.div`
  display: flex;
  margin-bottom: 8px;
  align-items: center;
`

const MobileStatWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const MobileWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`

const PanelTitle = styled.h1`
  margin: 0 0 12px 0;
`

const HintButton = styled.button`
  padding: 8px;
  font-size: 1rem;
  margin-top: 12px;
  width: 100%;
`

const TotalPlayers = styled.span`
  font-size: 1rem;
`

const Panel = ({ puzzle, currentMoveIndex, initialColor }) => {
  const [hintsRemaining, setHintsRemaining] = useState(TOTAL_HINTS);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);
  const mobileButtonRef = useRef(null);

  const handleHint = () => {
    highlightSquare(puzzle.solution[currentMoveIndex].slice(0, 2), "green");

    // Lock the button
    if (hintsRemaining === 1) {
      buttonRef.current.disabled = true;
      mobileButtonRef.current.disabled = true;
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
        <PanelTitle>DAILY CHESS CLUB</PanelTitle>

        <StatWrapper>
          <StatLabel>First move: </StatLabel>
          <span>{initialColor === 'white' ? <WhitePawn /> : <BlackPawn />}</span>
        </StatWrapper>

        <StatWrapper>
          <StatLabel>Total players:</StatLabel><TotalPlayers>{puzzle.plays}</TotalPlayers>
        </StatWrapper>

        <div className="hint-wrapper">
          <HintButton onClick={handleHint} ref={buttonRef}>
            Hint ({hintsRemaining})
          </HintButton>
        </div>
      </aside>
      <div className="mobile-panel">
        <MobileWrapper>
          <MobileStatWrapper>
            <StatLabel>First move: </StatLabel>
            <span>{initialColor === 'white' ? <WhitePawn /> : <BlackPawn />}</span>
          </MobileStatWrapper>

          <MobileStatWrapper>
            <StatLabel>Total players:</StatLabel><TotalPlayers>{puzzle.plays}</TotalPlayers>
          </MobileStatWrapper>
        </MobileWrapper>

        <div className="hint-wrapper">
          <HintButton onClick={handleHint} ref={mobileButtonRef}>
            Hint ({hintsRemaining})
          </HintButton>
        </div>
      </div>
    </>
  );
};

export default Panel;
