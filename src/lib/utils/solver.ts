import { COLORS } from "../constants";

export const deepCopyGrid = (grid: COLORS[][]): COLORS[][] =>
  grid.map((row) => [...row]);
export const stringifyGrid = (g: COLORS[][]): string => JSON.stringify(g);

export interface RealmColors {
  topLeft: COLORS;
  topRight: COLORS;
  bottomLeft: COLORS;
  bottomRight: COLORS;
}

export interface SolutionStep {
  r: number;
  c: number;
}

export interface SolverResult {
  solution: SolutionStep[] | null;
  iterations: number;
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
