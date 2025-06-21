import { COLORS } from "../constants";

export const getContrastTextColor = (bgColor: string | undefined) => {
  switch (bgColor) {
    case COLORS.BLACK:
    case COLORS.GREEN:
    case COLORS.PINK:
    case COLORS.VIOLET:
    case COLORS.RED:
    case COLORS.ORANGE:
    case COLORS.BLUE:
    case COLORS.GREY:
      return "white";
    case COLORS.YELLOW:
    case COLORS.WHITE:
      return "rgb(55, 65, 81)";
    default:
      return "black";
  }
};
