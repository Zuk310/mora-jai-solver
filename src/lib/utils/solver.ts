import { COLORS, TileCoords } from "../constants";

export const deepCopyGrid = (grid: COLORS[][]): COLORS[][] =>
  grid.map((row) => [...row]);
export const stringifyGrid = (g: COLORS[][]): string => JSON.stringify(g);

export const INDEX_TO_COORDS: { [key: number]: TileCoords } = {
  0: { r: 0, c: 0 },
  1: { r: 0, c: 1 },
  2: { r: 0, c: 2 },
  3: { r: 1, c: 0 },
  4: { r: 1, c: 1 },
  5: { r: 1, c: 2 },
  6: { r: 2, c: 0 },
  7: { r: 2, c: 1 },
  8: { r: 2, c: 2 },
};

export const COORDS_TO_INDEX: { [key: string]: number } = {
  "0,0": 0,
  "0,1": 1,
  "0,2": 2,
  "1,0": 3,
  "1,1": 4,
  "1,2": 5,
  "2,0": 6,
  "2,1": 7,
  "2,2": 8,
};

export const ALL_AROUND_COORDS_LOOKUP: TileCoords[][] = [
  [
    { r: 0, c: 1 },
    { r: 1, c: 1 },
    { r: 1, c: 0 },
  ],
  [
    { r: 0, c: 2 },
    { r: 1, c: 2 },
    { r: 2, c: 2 },
    { r: 2, c: 1 },
    { r: 2, c: 0 },
    { r: 1, c: 0 },
    { r: 0, c: 0 },
  ],
  [
    { r: 1, c: 2 },
    { r: 2, c: 2 },
    { r: 2, c: 1 },
    { r: 1, c: 1 },
    { r: 0, c: 1 },
  ],
  [
    { r: 0, c: 0 },
    { r: 0, c: 1 },
    { r: 1, c: 1 },
    { r: 2, c: 1 },
    { r: 2, c: 0 },
  ],
  [
    { r: 0, c: 0 },
    { r: 0, c: 1 },
    { r: 0, c: 2 },
    { r: 1, c: 2 },
    { r: 2, c: 2 },
    { r: 2, c: 1 },
    { r: 2, c: 0 },
    { r: 1, c: 0 },
  ],
  [
    { r: 2, c: 2 },
    { r: 2, c: 1 },
    { r: 1, c: 1 },
    { r: 0, c: 1 },
    { r: 0, c: 2 },
  ],
  [
    { r: 1, c: 0 },
    { r: 1, c: 1 },
    { r: 2, c: 1 },
  ],
  [
    { r: 2, c: 0 },
    { r: 1, c: 0 },
    { r: 1, c: 1 },
    { r: 1, c: 2 },
    { r: 2, c: 2 },
  ],
  [
    { r: 1, c: 2 },
    { r: 1, c: 1 },
    { r: 2, c: 1 },
  ],
];

export const CROSS_AROUND_COORDS_LOOKUP: TileCoords[][] = [
  [
    { r: 0, c: 1 },
    { r: 1, c: 0 },
  ],
  [
    { r: 0, c: 0 },
    { r: 0, c: 2 },
    { r: 1, c: 1 },
  ],
  [
    { r: 0, c: 1 },
    { r: 1, c: 2 },
  ],
  [
    { r: 0, c: 0 },
    { r: 1, c: 1 },
    { r: 2, c: 0 },
  ],
  [
    { r: 0, c: 1 },
    { r: 1, c: 0 },
    { r: 1, c: 2 },
    { r: 2, c: 1 },
  ],
  [
    { r: 0, c: 2 },
    { r: 1, c: 1 },
    { r: 2, c: 2 },
  ],
  [
    { r: 1, c: 0 },
    { r: 2, c: 1 },
  ],
  [
    { r: 1, c: 1 },
    { r: 2, c: 0 },
    { r: 2, c: 2 },
  ],
  [
    { r: 1, c: 2 },
    { r: 2, c: 1 },
  ],
];

export const isGoalReached = (
  currentGrid: COLORS[][],
  realmColors: RealmColors
): boolean => {
  return (
    currentGrid[0][0] === realmColors.topLeft &&
    currentGrid[0][2] === realmColors.topRight &&
    currentGrid[2][0] === realmColors.bottomLeft &&
    currentGrid[2][2] === realmColors.bottomRight
  );
};

import { rotateColorsInCoords, invertColor } from "./tiles";

export interface SolutionStep {
  r: number;
  c: number;
}

export interface SolverResult {
  solution: SolutionStep[] | null;
  iterations: number;
}

interface RealmColors {
  topLeft: COLORS;
  topRight: COLORS;
  bottomLeft: COLORS;
  bottomRight: COLORS;
}

/**
 * Applies the effect of clicking a tile at the given position
 * This is a copy of the tile effect logic from the worker, kept in sync with tiles.ts
 */
export function applyTileEffectForSolver(
  currentGrid: COLORS[][],
  row: number,
  col: number,
  triggeredColor: COLORS
): COLORS[][] {
  let newGrid = deepCopyGrid(currentGrid);
  const tileColor = triggeredColor;
  const clickedIndex = COORDS_TO_INDEX[`${row},${col}`];

  switch (tileColor) {
    case COLORS.GREY:
      // Grey tiles do nothing
      break;

    case COLORS.BLACK:
      // Rotate the entire row to the right
      const rowToRotate = newGrid[row];
      const lastTile = rowToRotate.pop();
      if (lastTile !== undefined) {
        rowToRotate.unshift(lastTile);
      }
      break;

    case COLORS.GREEN:
      // Swap with opposite tile (unless it's the center tile)
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
      // Rotate colors in all adjacent tiles (including diagonals)
      const adjCoords = ALL_AROUND_COORDS_LOOKUP[clickedIndex];
      if (adjCoords && adjCoords.length > 0) {
        rotateColorsInCoords(newGrid, adjCoords);
      }
      break;

    case COLORS.YELLOW:
      // Swap with tile above (if exists)
      if (row > 0) {
        [newGrid[row][col], newGrid[row - 1][col]] = [
          newGrid[row - 1][col],
          newGrid[row][col],
        ];
      }
      break;

    case COLORS.VIOLET:
      // Swap with tile below (if exists)
      if (row < 2) {
        [newGrid[row][col], newGrid[row + 1][col]] = [
          newGrid[row + 1][col],
          newGrid[row][col],
        ];
      }
      break;

    case COLORS.WHITE:
      // Invert clicked tile and cross-adjacent tiles
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
      // Transform all white tiles to black, and all black tiles to red
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
      // Change to majority color of cross-adjacent tiles
      const orangeCrossAdjCoords = CROSS_AROUND_COORDS_LOOKUP[clickedIndex];
      if (orangeCrossAdjCoords && orangeCrossAdjCoords.length > 0) {
        const colorCounts: Record<string, number> = {};

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
      // Apply the effect of the center tile
      const centerTileColor = currentGrid[1][1];
      if (centerTileColor !== COLORS.BLUE) {
        newGrid = applyTileEffectForSolver(newGrid, row, col, centerTileColor);
      }
      break;

    default:
      console.warn(`Unknown tile color: ${tileColor} at (${row}, ${col})`);
      break;
  }

  return newGrid;
}

/**
 * Solves the puzzle using breadth-first search
 * Returns the solution steps and number of iterations performed
 */
export function solvePuzzleBFS(
  initialGrid: COLORS[][],
  realmColors: RealmColors,
  maxIterations: number = 1000000
): SolverResult {
  const queue: [COLORS[][], SolutionStep[]][] = [
    [deepCopyGrid(initialGrid), []],
  ];
  const visited = new Set<string>([stringifyGrid(initialGrid)]);
  let iterations = 0;

  while (queue.length > 0 && iterations < maxIterations) {
    const currentState = queue.shift();
    if (!currentState) break;

    const [currentGrid, path] = currentState;
    iterations++;

    // Check if we've reached the goal
    if (isGoalReached(currentGrid, realmColors)) {
      return { solution: path, iterations };
    }

    // Try clicking each tile
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const tileColor = currentGrid[r][c];
        const effectiveColor =
          tileColor === COLORS.BLUE ? currentGrid[1][1] : tileColor;

        // Skip if blue tile clicking itself (infinite recursion case)
        if (tileColor === COLORS.BLUE && currentGrid[1][1] === COLORS.BLUE) {
          continue;
        }

        try {
          const nextGrid = applyTileEffectForSolver(
            deepCopyGrid(currentGrid),
            r,
            c,
            effectiveColor
          );
          const nextGridString = stringifyGrid(nextGrid);

          // Only add to queue if we haven't seen this state before
          if (!visited.has(nextGridString)) {
            visited.add(nextGridString);
            queue.push([nextGrid, [...path, { r, c }]]);
          }
        } catch (error) {
          console.warn(`Error applying tile effect at (${r}, ${c}):`, error);
          continue;
        }
      }
    }
  }

  // No solution found within iteration limit
  return { solution: null, iterations };
}

/**
 * Validates that a grid and realm colors configuration is solvable
 * This is a quick check that can be run before attempting to solve
 */
export function isConfigurationValid(
  grid: COLORS[][],
  realmColors: RealmColors
): boolean {
  // Basic validation checks
  if (!grid || grid.length !== 3) return false;
  if (!grid.every((row) => row && row.length === 3)) return false;
  if (!realmColors) return false;

  // Check if all colors are valid
  const validColors = Object.values(COLORS);
  const allGridColors = grid.flat();
  const allRealmColors = Object.values(realmColors);

  return (
    allGridColors.every((color) => validColors.includes(color)) &&
    allRealmColors.every((color) => validColors.includes(color))
  );
}

/**
 * Estimates the difficulty of a puzzle configuration
 * Returns a rough difficulty score (higher = more difficult)
 */
export function estimateDifficulty(
  grid: COLORS[][],
  realmColors: RealmColors
): number {
  if (!isConfigurationValid(grid, realmColors)) return -1;

  let difficultyScore = 0;

  // Count mismatched corners (base difficulty)
  if (grid[0][0] !== realmColors.topLeft) difficultyScore += 1;
  if (grid[0][2] !== realmColors.topRight) difficultyScore += 1;
  if (grid[2][0] !== realmColors.bottomLeft) difficultyScore += 1;
  if (grid[2][2] !== realmColors.bottomRight) difficultyScore += 1;

  // Add complexity based on tile types
  const complexityWeights: Record<COLORS, number> = {
    [COLORS.GREY]: 0,
    [COLORS.BLACK]: 2,
    [COLORS.WHITE]: 3,
    [COLORS.GREEN]: 2,
    [COLORS.YELLOW]: 1,
    [COLORS.VIOLET]: 1,
    [COLORS.PINK]: 4,
    [COLORS.RED]: 3,
    [COLORS.ORANGE]: 4,
    [COLORS.BLUE]: 5,
  };

  grid.flat().forEach((color) => {
    difficultyScore += complexityWeights[color] || 0;
  });

  return difficultyScore;
}
