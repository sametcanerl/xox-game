import "./EndGame.css";

export default function EndGame({ won,setGameFinished }) {
  return (
    <div className="end-game-screen">
      <h4 className="end-game-text" >{won.O ? "Won : O" : won.X ? "Won : X" : "TİE"   }</h4>
      
      <button className="end-game-btn" onClick={()=>setGameFinished(false) } > Continue</button>
    </div>
  );
}
