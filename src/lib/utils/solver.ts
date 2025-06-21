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
  realmColors: { [key: string]: COLORS }
): boolean => {
  return (
    currentGrid[0][0] === realmColors.topLeft &&
    currentGrid[0][2] === realmColors.topRight &&
    currentGrid[2][0] === realmColors.bottomLeft &&
    currentGrid[2][2] === realmColors.bottomRight
  );
};
