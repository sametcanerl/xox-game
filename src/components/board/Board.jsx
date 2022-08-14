import Box from "../box/Box";
import "./Board.css"
export default function Board({ board, onClick}) {

  return (
    <div className="board" >
      {board?.map((value, idx) => (
        <Box key={idx} value={value} onClick={()=> value === null  && onClick(idx)} />
      ))}
    </div>
  );
}
