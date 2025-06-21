import { COLORS, TileCoords } from "../constants";
import {
  deepCopyGrid,
  COORDS_TO_INDEX,
  ALL_AROUND_COORDS_LOOKUP,
  CROSS_AROUND_COORDS_LOOKUP,
} from "./solver";

export const applyTileEffect = (
  currentGrid: COLORS[][],
  row: number,
  col: number,
  triggeredColor: COLORS
): COLORS[][] => {
  let newGrid = deepCopyGrid(currentGrid);
  const tileColor = triggeredColor;
  const clickedIndex = COORDS_TO_INDEX[`${row},${col}`];

  switch (tileColor) {
    case COLORS.GREY:
      break;
    case COLORS.BLACK:
      const rowToRotate = newGrid[row];
      const lastTile = rowToRotate.pop()!;
      rowToRotate.unshift(lastTile);
      break;
    case COLORS.GREEN:
      if (row === 1 && col === 1) {
        break;
      }
      const oppositeRow = 2 - row;
      const oppositeCol = 2 - col;
      [newGrid[row][col], newGrid[oppositeRow][oppositeCol]] = [
        newGrid[oppositeRow][oppositeCol],
        newGrid[row][col],
      ];
      break;
    case COLORS.PINK:
      const adjCoords = ALL_AROUND_COORDS_LOOKUP[clickedIndex];
      if (adjCoords && adjCoords.length > 0) {
        rotateColorsInCoords(newGrid, adjCoords);
      }
      break;
    case COLORS.YELLOW:
      if (row > 0) {
        [newGrid[row][col], newGrid[row - 1][col]] = [
          newGrid[row - 1][col],
          newGrid[row][col],
        ];
      }
      break;
    case COLORS.VIOLET:
      if (row < 2) {
        [newGrid[row][col], newGrid[row + 1][col]] = [
          newGrid[row + 1][col],
          newGrid[row][col],
        ];
      }
      break;
    case COLORS.WHITE:
      const clickedOriginalColor = currentGrid[row][col];
      const crossAdjCoordsWhite = CROSS_AROUND_COORDS_LOOKUP[clickedIndex];

      newGrid[row][col] = invertColor(
        clickedOriginalColor,
        clickedOriginalColor,
        COLORS.GREY
      );

      if (crossAdjCoordsWhite) {
        crossAdjCoordsWhite.forEach((coord) => {
          const adjOriginalColor = currentGrid[coord.r][coord.c];
          newGrid[coord.r][coord.c] = invertColor(
            adjOriginalColor,
            clickedOriginalColor,
            COLORS.GREY
          );
        });
      }
      break;
    case COLORS.RED:
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (newGrid[r][c] === COLORS.WHITE) {
            newGrid[r][c] = COLORS.BLACK;
          } else if (newGrid[r][c] === COLORS.BLACK) {
            newGrid[r][c] = COLORS.RED;
          }
        }
      }
      break;
    case COLORS.ORANGE:
      const orangeCrossAdjCoords = CROSS_AROUND_COORDS_LOOKUP[clickedIndex];
      if (orangeCrossAdjCoords && orangeCrossAdjCoords.length > 0) {
        const colorCounts: { [key: string]: number } = {};
        orangeCrossAdjCoords.forEach((coord) => {
          const adjColor = currentGrid[coord.r][coord.c];
          colorCounts[adjColor] = (colorCounts[adjColor] || 0) + 1;
        });

        let majorityColor: COLORS | null = null;
        let maxCount = 0;
        let isStrictMajority = true;
        for (const color in colorCounts) {
          if (colorCounts[color] > maxCount) {
            maxCount = colorCounts[color];
            majorityColor = color as COLORS;
            isStrictMajority = true;
          } else if (colorCounts[color] === maxCount) {
            isStrictMajority = false;
          }
        }

        if (isStrictMajority && majorityColor) {
          newGrid[row][col] = majorityColor;
        }
      }
      break;
    case COLORS.BLUE:
      const centerTileColor = currentGrid[1][1];
      if (centerTileColor !== COLORS.BLUE) {
        newGrid = applyTileEffect(newGrid, row, col, centerTileColor);
      }
      break;
    default:
      console.warn(`Unknown tile color: ${tileColor} at (${row}, ${col})`);
      break;
  }
  return newGrid;
};

export const rotateColorsInCoords = (
  board: COLORS[][],
  coords: TileCoords[]
) => {
  if (coords.length === 0) return;
  const lastColor =
    board[coords[coords.length - 1].r][coords[coords.length - 1].c];
  for (let i = coords.length - 1; i > 0; i--) {
    board[coords[i].r][coords[i].c] = board[coords[i - 1].r][coords[i - 1].c];
  }
  board[coords[0].r][coords[0].c] = lastColor;
};

export const invertColor = (
  colorToChange: COLORS,
  targetColor1: COLORS,
  targetColor2: COLORS
): COLORS => {
  if (colorToChange === targetColor1) {
    return targetColor2;
  } else if (colorToChange === targetColor2) {
    return targetColor1;
  }
  return colorToChange;
};
