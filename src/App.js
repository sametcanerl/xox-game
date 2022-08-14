import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/board/Board";
import EndGame from "./components/endgame/EndGame";
import ScoreBoard from "./components/scoreboard/ScoreBoard";
import { patterns } from "./helper/patterns";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameFinished, setGameFinished] = useState(false);
  const [won, setWon] = useState({X:false,O:false})

  useEffect(() => {
    resetBoard();
  }, [scores]);

  const handleBoxClick = (boxIdx) => {
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying === true ? "X" : "O";
      } else {
        return value;
      }
    });
    const winner = checkWinner(updatedBoard);

    if (winner) {
      setGameFinished(true)
      if (winner === "O") {
        setWon({...won,O:true,X:false})
        let { oScore } = scores;
        oScore += 1;
        setScores({ ...scores, oScore });
    
      } else if (winner === "X") {
        setWon({...won,X:true,O:false})
        let { xScore } = scores;
        xScore += 1;

        setScores({ ...scores, xScore });
      }
    } else if (!winner && !updatedBoard.includes(null)) {
      setGameFinished(true)
      setWon({...won,X:false,O:false})
      return resetBoard();
    }
 
    setBoard(updatedBoard);
    setXPlaying(!xPlaying);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < patterns.length; i++) {
      const [x, y, z] = patterns[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        return board[x];
      }
    }
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
  
  };

  const resetScores = () => {
    setScores({ xScore: 0, oScore: 0 });
  };

  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      {gameFinished && <EndGame won={won} setGameFinished={setGameFinished} />}
      <Board board={board} onClick={handleBoxClick} />
      <button className="reset-btn" onClick={resetScores}>
        Reset Score
      </button>
    </div>
  );
}

export default App;
