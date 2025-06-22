import { COLORS, TileCoords } from "../constants";
import { applyTileEffect } from "./tiles";

const MAX_SOLVER_ITERATIONS = 1000000;
const GRID_SIZE = 3;

export const deepCopyGrid = (grid: COLORS[][]): COLORS[][] =>
  grid.map((row) => [...row]);
export const stringifyGrid = (g: COLORS[][]): string => JSON.stringify(g);

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

interface RealmColors {
  topLeft: COLORS;
  topRight: COLORS;
  bottomLeft: COLORS;
  bottomRight: COLORS;
}

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

export interface SolutionStep {
  r: number;
  c: number;
}

export interface SolverResult {
  solution: SolutionStep[] | null;
  iterations: number;
}

export function solvePuzzleBFS(
  initialGrid: COLORS[][],
  realmColors: RealmColors
): SolverResult {
  const queue: [COLORS[][], SolutionStep[]][] = [
    [deepCopyGrid(initialGrid), []],
  ];
  const visited = new Set<string>([stringifyGrid(initialGrid)]);
  let iterations = 0;

  while (queue.length > 0 && iterations < MAX_SOLVER_ITERATIONS) {
    const currentState = queue.shift();
    if (!currentState) break;

    const [currentGrid, path] = currentState;
    iterations++;

    if (isGoalReached(currentGrid, realmColors)) {
      return { solution: path, iterations };
    }

    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const tileColor = currentGrid[r][c];
        const effectiveColor =
          tileColor === COLORS.BLUE ? currentGrid[1][1] : tileColor;

        if (tileColor === COLORS.BLUE && currentGrid[1][1] === COLORS.BLUE) {
          continue;
        }

        try {
          const nextGrid = applyTileEffect(
            deepCopyGrid(currentGrid),
            r,
            c,
            effectiveColor
          );
          const nextGridString = stringifyGrid(nextGrid);

          if (!visited.has(nextGridString)) {
            visited.add(nextGridString);
            queue.push([nextGrid, [...path, { r, c }]]);
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          continue;
        }
      }
    }
  }

  return { solution: null, iterations };
}
