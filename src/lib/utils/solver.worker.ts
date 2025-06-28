import TinyQueue from "tinyqueue";
import { COLORS } from "../constants";
import { deepCopyGrid, isGoalReached, stringifyGrid } from "./solver";
import { applyTileEffect } from "./tiles";
import type { RealmColors, SolutionStep, SolverResult } from "./solver";

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

self.onmessage = (
  e: MessageEvent<{ grid: COLORS[][]; realmColors: RealmColors }>
) => {
  const { grid, realmColors } = e.data;
  const result = solvePuzzleAStar(grid, realmColors);
  self.postMessage(result);
};

const MAX_SOLVER_ITERATIONS = 10_000_000;
const GRID_SIZE = 3;

function solvePuzzleAStar(
  initialGrid: COLORS[][],
  realmColors: RealmColors,
  maxIterations: number = MAX_SOLVER_ITERATIONS
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
    if (iterations >= maxIterations) {
      return { solution: null, iterations };
    }
    if (path.length >= 35) continue;

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
