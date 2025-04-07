import happy from "./img/happy.png";
import nervous from "./img/nervous.png";
import win from "./img/win.png";
import lose from "./img/lose.png";
import { useEffect, useState, useRef } from "react";
import { GAME_STATUS } from "./GameConstants";
import classnames from "classnames";

const getClockTime = (clock) => {
  if (clock >= 0) {
    return clock.toString().padStart(3, "0");
  }

  return "-" + Math.abs(clock).toString().padStart(2, "0");
}

export const Clock = ({ value, tick, start, end }) => {
  const interval = useRef(null),
        [ clock, setClock ] = useState(value);

  useEffect(() => {
    if (!tick || clock === 999 || !start || end) return;
    
    let intervalRef = interval.current;

    intervalRef = setInterval(() => {
      setClock(clock => ++clock);
    }, 1000);

    return (() => {
      if (!intervalRef) return;
      clearInterval(intervalRef);
    })
  }, [tick, interval, clock, setClock, start, end]);

  useEffect(() => {
    setClock(value);
  }, [value]);

  useEffect(() => {
    const intervalRef = interval.current;
    if (!intervalRef) return;
    clearTimeout(intervalRef);
  }, [end]);
  
  useEffect(() => {
    if (start !== null) return;
    setClock(0);
  }, [start]);

  return (
    <div className="board-clock">{getClockTime(clock)}</div>
  );
};

export const Face = ({ status, onClick }) => {
  const [active, setActive] = useState(false),
        handleClick = () => {
          setActive(false); 
          onClick();
        },
        
        cancel = (e) => {
          if (e.button !== 0) return;
          setActive(false);
        }

  let icon = happy;
  switch (status) {
    case GAME_STATUS.NERVOUS:
      icon = nervous;
      break;
    case GAME_STATUS.WIN:
      icon = win;
      break;
    case GAME_STATUS.LOSE:
      icon = lose;
      break;
    default: 
      // do nothing
  }

  return (
    <div className={classnames("board-face status", active && "mousedown")} onClick={onClick} onMouseOut={cancel}
      onMouseDown={(e) => e.button === 0 && setActive(true)} onMouseUp={cancel}>
      <img src={icon} alt="Happy face" />
    </div>
  );
};
