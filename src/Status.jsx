import { BOARD_ACTION } from "./GameConstants";
import { GameContext } from "./GameContext";
import { useContext } from "react";
import { Clock, Face } from "./StatusWidgets";

export const Status = () => {
  const { game, setGame } = useContext(GameContext),
        { mines, status, start, flagged, end } = game.config;

  return (
    <div className="board-status">
      <Clock value={mines - flagged} />
      <Face status={status} onClick={() => setGame({ type: BOARD_ACTION.NEW })} />
      <Clock value={0} tick={true} start={start} end={end} />
    </div>
  )
};
