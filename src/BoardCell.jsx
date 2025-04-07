import classnames from 'classnames';
import { BOARD_ACTION, USER_TAGS } from './GameConstants';
import { GameContext } from './GameContext';
import { useContext, useState } from 'react';
import { BoardIcon } from './BoardIcons';

export const BoardCell = ({ x, y, mine, hidden, adjacentMines, userTag, clicked }) => {
  const { game, setGame } = useContext(GameContext),
        { end } = game.config,
        [ activeButton, setActiveButton ] = useState(false),
        select = (e) => {
          if (e.button !== 0 || end) {
            e.stopPropagation();
            return;
          }
          if ([USER_TAGS.FLAG, USER_TAGS.QUESTION].includes(userTag) || !hidden || end) {
            setGame({ type: BOARD_ACTION.MOUSEUP });
            return;
          }
          setActiveButton(false);
          setGame({ type: BOARD_ACTION.SELECT, x, y })
        },
        flag = (e) => {
          e.preventDefault();
          if (!hidden || end) return;
          setGame({ type: BOARD_ACTION.FLAG, x, y });
        },
        mousedown = (e) => {
          if (e.buttons !== 0 || end) {
            e.stopPropagation();
            return;
          }
          setActiveButton(true);
          setGame({ type: BOARD_ACTION.MOUSEDOWN, x, y });
        },
        mouseup = (e) => {
          if (e.button !== 0 || end) return;
          setActiveButton(false);
          setGame({ type: BOARD_ACTION.MOUSEUP, x, y });
        };

  return (
    <div className={classnames("board-cell", hidden ? "hidden" : null, mine && clicked && "active", 
      !clicked && activeButton && ![USER_TAGS.FLAG, USER_TAGS.QUESTION].includes(userTag) && "mousedown")} 
      onContextMenu={flag} onMouseDown={mousedown} onMouseUp={select} onMouseOut={mouseup} onMouseOver={mousedown}>
      <BoardIcon mine={mine} hidden={hidden} adjacentMines={adjacentMines} userTag={userTag} end={end} />
    </div>
  );
};
