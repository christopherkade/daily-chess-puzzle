import "./VictoryPanel.css";

const VictoryPanel = ({ puzzle }) => {
  const totalWins = window.localStorage.getItem("dcc-wins");
  const firstWin = window.localStorage.getItem("dcc-first-win");
  const totalMoves = window.localStorage.getItem("dcc-total-moves");
  const totalHints = window.localStorage.getItem("dcc-hints-used");

  return (
    <div className="victory-panel">
      <h1>
        Well done ! <br />
        Come back tomorrow for another puzzle ✨
      </h1>

      <div className="stats-wrapper">
        <h2>Stats:</h2>
        <div>
          Puzzles completed: <span>{totalWins}</span>
        </div>
        <div>
          First puzzle completed on: <span>{firstWin}</span>
        </div>
        <div>
          Total moves: <span>{totalMoves}</span>
        </div>
        <div>
          Total hints used: <span>{totalHints ? totalHints : 0}</span>
        </div>
        <div>
          Total players: <span>{puzzle.plays}</span>
        </div>
      </div>
    </div>
  );
};

export default VictoryPanel;
