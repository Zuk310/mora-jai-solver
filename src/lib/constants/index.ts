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

export interface TileCoords {
  r: number;
  c: number;
}
