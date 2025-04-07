import { BoardCell } from "./BoardCell";

export const BoardRow = ({ x, row }) => {
  return (
    <div className="board-row">
      { row.map((y, index) => <BoardCell key={`board-cell-${x}-${index}`} x={x} y={index} {...y} />) }
    </div>
  );
};
