export enum COLORS {
  GREY = "Grey",
  BLACK = "Black",
  GREEN = "Green",
  PINK = "Pink",
  YELLOW = "Yellow",
  VIOLET = "Violet",
  WHITE = "White",
  RED = "Red",
  ORANGE = "Orange",
  BLUE = "Blue",
}

//TODO: Add when shapes are implemented
// export const REALM_SHAPES: { [key in COLORS]: string } = {
//   [COLORS.GREY]: "○",
//   [COLORS.BLACK]: "□",
//   [COLORS.GREEN]: "△",
//   [COLORS.PINK]: "♡",
//   [COLORS.YELLOW]: "☆",
//   [COLORS.VIOLET]: "♢",
//   [COLORS.WHITE]: "⌘",
//   [COLORS.RED]: "✕",
//   [COLORS.ORANGE]: "☼",
//   [COLORS.BLUE]: "💧",
// };
export const INITIAL_GRID: COLORS[][] = [
  [COLORS.PINK, COLORS.ORANGE, COLORS.PINK],
  [COLORS.ORANGE, COLORS.BLUE, COLORS.ORANGE],
  [COLORS.PINK, COLORS.ORANGE, COLORS.PINK],
];

export const TARGET_REALM_COLORS: {
  topLeft: COLORS;
  topRight: COLORS;
  bottomLeft: COLORS;
  bottomRight: COLORS;
} = {
  topLeft: COLORS.ORANGE,
  topRight: COLORS.ORANGE,
  bottomLeft: COLORS.ORANGE,
  bottomRight: COLORS.ORANGE,
};

export interface TileCoords {
  r: number;
  c: number;
}
