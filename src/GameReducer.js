import { BOARD_ACTION, GAME_STATUS, LEVEL_CONFIG, START_ACTIONS, USER_TAGS } from "./GameConstants";
import { generateNewBoard } from "./GenerateBoard";

const revealCell = ({ board, x, y, config}) => {
  if (!board[x][y].hidden || [USER_TAGS.FLAG, USER_TAGS.QUESTION].includes(board[x][y].userTag)) return;
  board[x][y].hidden = false;
  board[x][y].flagged = false;
  if (board[x][y].adjacentMines === 0) revealAdjacentCells({ board, x, y, config });
}

const revealAdjacentCells = ({ board, x, y, config }) => {
    const { width, height } = config;

    if (x > 0) revealCell({ board, x: x -1, y, config });
    if (y > 0) revealCell({ board, x, y: y - 1, config });
    if (x < height - 1) revealCell({ board, x: x + 1, y, config });
    if (y < width - 1) revealCell({ board, x, y: y + 1, config });

    if (x > 0 && y > 0) revealCell({ board, x: x - 1, y: y - 1, config });
    if (x > 0 && y < width - 1) revealCell({ board, x: x - 1, y: y + 1, config });
    if (x < height - 1 && y > 0) revealCell({ board, x: x + 1, y: y - 1, config });
    if (x < height - 1 && y < width - 1) revealCell({ board, x: x + 1, y: y + 1, config });
}

const checkWinCondition = ({ board }) => {
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    for (let j = 0; j < row.length; j++) {
      const cell = board[i][j];
      if (cell.hidden && !cell.mine) return false;
    }
  }

  return true;
};

const revealBombLocations = ({ board }) => {
  for (let i = 0; i < board.length; i++) {
    let row = board[i];
    for (let j = 0; j < row.length; j++) {
      let cell = row[j];
      if (cell.mine && cell.userTag === USER_TAGS.FLAG) cell.hidden = false;
    }
  }
};

export const GameReducer = (state, payload) => {
  const { x, y, type } = payload;
  let newState = { ...JSON.parse(JSON.stringify(state)), config: { ...state.config, ...payload.config }};
  const { board, config } = newState;
 
  if (!config.start && START_ACTIONS.includes(payload.type)) config.start = new Date();
  config.status = GAME_STATUS.HAPPY;
  
  switch (type) {
    case BOARD_ACTION.FLAG:
      const oldUserTag = state.board[x][y].userTag;
      board[x][y].userTag = oldUserTag === USER_TAGS.EMPTY ? USER_TAGS.FLAG : (
              oldUserTag === USER_TAGS.FLAG ? USER_TAGS.QUESTION : USER_TAGS.EMPTY);
      if (board[x][y].userTag === USER_TAGS.FLAG) {
        config.flagged++;
      } else if (board[x][y].userTag === USER_TAGS.QUESTION) {
        config.flagged--;
      }
      break;
    case BOARD_ACTION.SELECT:
      board[x][y].hidden = false;
      if (board[x][y].mine) {
        config.status = GAME_STATUS.LOSE;
        config.end = new Date();
        board[x][y].clicked = true;
        revealBombLocations({ board });
      } else if (state.board[x][y].adjacentMines === 0) {
        revealAdjacentCells({ board, x, y, config });
      }
      break;
    case BOARD_ACTION.NEW:
      const levelConfig = payload?.config?.level ? payload.config : (LEVEL_CONFIG[state.config.level] ?? state.config);
      config.flagged = 0;
      config.start = null;
      config.end = null;
      config.mines = levelConfig.mines;
      config.width = levelConfig.width;
      config.height = levelConfig.height;
      newState.board = generateNewBoard({ mines: config.mines, width: config.width, height: config.height });
      break;
    case BOARD_ACTION.MOUSEDOWN:
      if (!board[x][y].hidden || [USER_TAGS.FLAG, USER_TAGS.QUESTION].includes(board[x][y].userTag)) break;
      config.status = GAME_STATUS.NERVOUS;
      break;
    case BOARD_ACTION.MOUSEUP:
      if (config.status !== GAME_STATUS.LOSE) {
        config.status = GAME_STATUS.HAPPY;
      }
      break;
    default:
      // do nothing
  }

  if (config.start && checkWinCondition({ board })) {
    config.end = new Date();
    config.status = GAME_STATUS.WIN;
    revealBombLocations({ board });
  }

  return { ...newState, config: { ...newState.config, ...config }};
};
