import { USER_TAGS } from "./GameConstants";
import { GameContext } from "./GameContext";
import { useContext, useMemo } from "react";

export const BombLocations = () => {
  const { game } = useContext(GameContext);
  const bombLocations = useMemo(() => {
    return game.board.reduce((result, row, i) => {
      let bombsInRow = [];
      for (let j=0; j<row.length; j++) {
        if (row[j].mine && row[j].userTag !== USER_TAGS.FLAG) {
          bombsInRow.push({row: i, column: j});
        }
      }
      return [ ...result, ...bombsInRow];
    }, []);
  }, [game]);

    return (
        <div>
            Bomb Locations: {JSON.stringify(bombLocations)}
        </div>
    )
}
