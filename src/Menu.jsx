import { BOARD_ACTION, LEVEL_CONFIG, SKILL_LEVELS } from "./GameConstants";
import { GameContext } from "./GameContext";
import { use, useContext, useEffect, useState } from "react";

const MAX_WIDTH = 30;
const MAX_HEIGHT = 24;
const MAX_MINES = 667;

export const Menu = ()=> {
  const { game, setGame } = useContext(GameContext);
  const { level, mines, width, height } = game.config;
  const [ newWidth, setNewWidth ] = useState(width);
  const [ newHeight, setNewHeight ] = useState(height);
  const [ newMines, setNewMines ] = useState(mines);
  const [ newLevel, setNewLevel ] = useState(level);
  const [ max, setMax ] = useState(MAX_MINES);
  const newGame = (e) => {
    // TODO: confirm if game is in progress
    e.preventDefault();
    setGame({ type: BOARD_ACTION.NEW, config: { width: newWidth, height: newHeight, mines: newMines, level: newLevel }});
  };

  useEffect(() => {
    // TODO: if game is in progress, warn first
    if (newLevel === 'CUSTOM' || newLevel === level) return;
    setGame({ type: BOARD_ACTION.NEW, config: { level: newLevel, ...LEVEL_CONFIG[newLevel] }});
  }, [newLevel]);

  useEffect(() => {
    const area = newWidth * newHeight;
    if (area < MAX_MINES) {
      setMax(newWidth * newHeight);
    } else if (area >= MAX_MINES) {
      setMax(MAX_MINES);
    }
  }, [newWidth, newHeight]);
        
  return (
    <div className="menu">
      <div className={newLevel === 'CUSTOM' ? 'custom-border' : null}>
        <select name="skillLevel" onChange={(e) => setNewLevel(e.target.value)}>
          { Object.keys(SKILL_LEVELS).map((key, index) => 
            <option key={`skillLevel-${index}`} value={key} defaultValue={key === level}>{SKILL_LEVELS[key]}</option>
          )}
        </select>
      </div>
      { newLevel === 'CUSTOM' &&
        <form className="board-options" onSubmit={newGame}>
          <div className="flex w-100">
            <div className="pe-3">
              <div className="flex">
                <div className="flex-column pe-2 lh-1-5">
                  <label htmlFor="width">Width:</label>
                  <label htmlFor="height">Height:</label>
                  <label htmlFor="mines">Mines:</label>
                </div>
                <div className="flex-column">
                  <input name="width" type="number" value={newWidth} min="1" max={MAX_WIDTH} onChange={(e) => setNewWidth(e.target.value)} className="mb-1" />
                  <input name="height" type="number" value={newHeight} minx="1" max={MAX_HEIGHT} onChange={(e) => setNewHeight(e.target.value)} className="mb-1" />
                  <input name="mines" type="number" value={newMines} min="1" max={max} onChange={(e) => setNewMines(e.target.value)} className="mb-1" />
                </div>
              </div>
            </div>
            <div>
              <button type="submit">New</button>
            </div>
          </div>
        </form>
      }
    </div>
  );
};
