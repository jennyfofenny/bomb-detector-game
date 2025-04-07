import { USER_TAGS } from "./GameConstants";

const calcAdjacentMines = ({ mines, width, height, board, possibleMineLocations }) => {
    for (let i = 0; i < mines; i++) {
    const nextMineIndex = Math.floor(Math.random() * possibleMineLocations.length),
          nextMineLocation = possibleMineLocations[nextMineIndex];

    board[nextMineLocation.x][nextMineLocation.y].mine = true;
    possibleMineLocations.splice(nextMineIndex, 1);

    // First, do directly adjacent
    if (nextMineLocation.x > 0) board[nextMineLocation.x - 1][nextMineLocation.y].adjacentMines++;
    if (nextMineLocation.y > 0) board[nextMineLocation.x][nextMineLocation.y - 1].adjacentMines++;
    if (nextMineLocation.x < height - 1) board[nextMineLocation.x + 1][nextMineLocation.y].adjacentMines++;
    if (nextMineLocation.y < width - 1) board[nextMineLocation.x][nextMineLocation.y + 1].adjacentMines++;

    // Then, do diagonals
    if (nextMineLocation.x > 0 && nextMineLocation.y > 0) board[nextMineLocation.x - 1][nextMineLocation.y - 1].adjacentMines++;
    if (nextMineLocation.x > 0 && nextMineLocation.y < width - 1) board[nextMineLocation.x - 1][nextMineLocation.y + 1].adjacentMines++;
    if (nextMineLocation.x < height - 1 && nextMineLocation.y > 0) board[nextMineLocation.x + 1][nextMineLocation.y - 1].adjacentMines++;
    if (nextMineLocation.x < height - 1 && nextMineLocation.y < width - 1) board[nextMineLocation.x + 1][nextMineLocation.y + 1].adjacentMines++;
  }
}

export const generateNewBoard = ({ mines, width, height }) => {
  if (width * height < mines) {
    throw new Error("The number of mines cannot be greater than the board size");
  }

  let board = [],
      possibleMineLocations = [];

  for (let i=0; i < height; i++) {
    board[i] = [];
    for (let j=0; j < width; j++) {
      board[i][j] = {
        mine: false,
        hidden: true,
        userTag: USER_TAGS.EMPTY,
        adjacentMines: 0,
        clicked: false
      };
      possibleMineLocations.push({ x: i, y: j});
    }
  }

  calcAdjacentMines({ mines, width, height, board, possibleMineLocations });
  return board;
};
