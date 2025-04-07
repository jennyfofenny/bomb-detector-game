import { GAME_STATUS, LEVEL_CONFIG } from './GameConstants';
import { generateNewBoard } from './GenerateBoard';
import { createContext, useMemo, useReducer } from 'react';
import { GameReducer } from './GameReducer';

export const GameContext = createContext();
export const GameContextProvider = ({ level, children, ...config }) => {
  const levelConfig = LEVEL_CONFIG[level.toUpperCase()],
        { mines = levelConfig.mines, width = levelConfig.width, height = levelConfig.height } = config,
        [ game, setGame ] = useReducer(GameReducer, { board: generateNewBoard({ mines, width, height }), 
                              config: { mines, width, height, flagged: 0, status: GAME_STATUS.HAPPY, start: null, end: null, level }});
  
  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  );
};
