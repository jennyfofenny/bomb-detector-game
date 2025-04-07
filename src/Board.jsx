import { Status } from './Status';
import { useContext } from 'react';
import { GameContext } from './GameContext';
import { BoardRow } from './BoardRow';
import { Menu } from './Menu';

export const Board = () => {
  const { game } = useContext(GameContext),
        { board } = game;

  return (
    <div className="board">
      <Menu />
      <Status />
      <div className="board-body">
        { board.map((row, index) => <BoardRow key={`board-row-${index}`} x={index} row={row} />) }
      </div>
    </div>
  );
};
