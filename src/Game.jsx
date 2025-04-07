import { BombLocations } from './BombLocations';
import { Board } from './Board';
import { GameContextProvider } from './GameContext';

export const Game = () => {
  return (
    <GameContextProvider level="BEGINNER">
      <div className="game">
        <Board />
      </div>
    </GameContextProvider>
  )
};
