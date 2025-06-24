import TinyQueue from "tinyqueue";
import { COLORS } from "../constants";
import {
  deepCopyGrid,
  isGoalReached,
  RealmColors,
  SolutionStep,
  SolverResult,
  stringifyGrid,
} from "./solver";
import { applyTileEffect } from "./tiles";

type QueueItem = {
  grid: COLORS[][];
  path: SolutionStep[];
  priority: number;
};

function calculateHeuristic(
  grid: COLORS[][],
  realmColors: RealmColors
): number {
  let mismatchedCorners = 0;
  if (grid[0][0] !== realmColors.topLeft) mismatchedCorners++;
  if (grid[0][2] !== realmColors.topRight) mismatchedCorners++;
  if (grid[2][0] !== realmColors.bottomLeft) mismatchedCorners++;
  if (grid[2][2] !== realmColors.bottomRight) mismatchedCorners++;
  return mismatchedCorners;
}

const MAX_ITERATIONS = 50000;
const GRID_SIZE = 3;

export function solvePuzzleAStar(
  initialGrid: COLORS[][],
  realmColors: RealmColors,
  maxIterations: number = MAX_ITERATIONS
): SolverResult {
  const startNode: QueueItem = {
    grid: deepCopyGrid(initialGrid),
    path: [],
    priority: calculateHeuristic(initialGrid, realmColors),
  };

  const priorityQueue = new TinyQueue<QueueItem>(
    [startNode],
    (a, b) => a.priority - b.priority
  );

  const visited = new Set<string>([stringifyGrid(initialGrid)]);
  let iterations = 0;

  while (priorityQueue.length > 0 && iterations < maxIterations) {
    const currentState = priorityQueue.pop();
    if (!currentState) break;

    const { grid: currentGrid, path } = currentState;
    iterations++;

    if (isGoalReached(currentGrid, realmColors)) {
      return { solution: path, iterations };
    }
    if (path.length >= 25) continue;

    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const tileColor = currentGrid[r][c];
        const effectiveColor =
          tileColor === COLORS.BLUE ? currentGrid[1][1] : tileColor;

        if (tileColor === COLORS.BLUE && effectiveColor === COLORS.BLUE) {
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
            const g = path.length + 1;
            const h = calculateHeuristic(nextGrid, realmColors);

            priorityQueue.push({
              grid: nextGrid,
              path: [...path, { r, c }],
              priority: g + h,
            });
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

function getRandomGeneratorElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleGeneratorArray<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getRandomGeneratorColor(exclude: COLORS[] = []): COLORS {
  const availableColors = Object.values(COLORS).filter(
    (c) => !exclude.includes(c)
  );
  return getRandomGeneratorElement(availableColors);
}

export const generatePuzzle = (): {
  initialGrid: COLORS[][];
  targetRealmColors: RealmColors;
} => {
  let puzzle;
  let solution;

  do {
    const availableTargetColors = Object.values(COLORS).filter(
      (c) => c !== COLORS.GREY
    );
    const shuffledColors = shuffleGeneratorArray(availableTargetColors);
    const targetRealmColors: RealmColors = {
      topLeft: shuffledColors[0],
      topRight: shuffledColors[1],
      bottomLeft: shuffledColors[2],
      bottomRight: shuffledColors[3],
    };

    let grid: COLORS[][] = [
      [
        targetRealmColors.topLeft,
        getRandomGeneratorColor(),
        targetRealmColors.topRight,
      ],
      [
        getRandomGeneratorColor(),
        getRandomGeneratorColor(),
        getRandomGeneratorColor(),
      ],
      [
        targetRealmColors.bottomLeft,
        getRandomGeneratorColor(),
        targetRealmColors.bottomRight,
      ],
    ];

    const difficulty = Math.floor(Math.random() * 8) + 8;

    for (let i = 0; i < difficulty; i++) {
      const randomRow = Math.floor(Math.random() * GRID_SIZE);
      const randomCol = Math.floor(Math.random() * GRID_SIZE);
      const tileColor = grid[randomRow][randomCol];
      const effectiveColor = tileColor === COLORS.BLUE ? grid[1][1] : tileColor;

      if (tileColor === COLORS.BLUE && effectiveColor === COLORS.BLUE) {
        i--;
        continue;
      }
      grid = applyTileEffect(
        deepCopyGrid(grid),
        randomRow,
        randomCol,
        effectiveColor
      );
    }

    puzzle = { initialGrid: grid, targetRealmColors };
    solution = solvePuzzleAStar(puzzle.initialGrid, puzzle.targetRealmColors);
  } while (
    !solution?.solution ||
    solution.solution.length < 4 ||
    solution.solution.length > 10
  );

  return puzzle;
};
