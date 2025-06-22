import styled, { css } from "styled-components";
import { COLORS } from "../../constants";
import { getContrastTextColor } from "../../utils/styles";

const TILE_SIZE = "140px";
const TILE_BORDER_RADIUS = "12px";
const FOCUS_SHADOW_COLOR = "#0a84ff";

const getBorderColor = (color: string | undefined) => {
  switch (color) {
    case COLORS.GREY:
      return "rgb(75, 85, 99)";
    case COLORS.BLACK:
      return "rgb(0, 0, 0)";
    case COLORS.GREEN:
      return "rgb(21, 94, 69)";
    case COLORS.PINK:
      return "rgb(157, 23, 77)";
    case COLORS.YELLOW:
      return "rgb(180, 133, 7)";
    case COLORS.VIOLET:
      return "rgb(79, 70, 229)";
    case COLORS.WHITE:
      return "rgb(209, 213, 219)";
    case COLORS.RED:
      return "rgb(153, 27, 27)";
    case COLORS.ORANGE:
      return "rgb(194, 65, 12)";
    case COLORS.BLUE:
      return "rgb(29, 78, 216)";
    default:
      return "black";
  }
};

export const StyledTile = styled.button<{
  color: COLORS;
  $isEditingMode: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${TILE_SIZE};
  height: ${TILE_SIZE};

  font-size: 26px;
  font-weight: 700;
  text-align: center;
  color: ${({ color }) => getContrastTextColor(color)};

  background-color: ${({ color }) => {
    switch (color) {
      case COLORS.GREY:
        return "rgb(156, 163, 175)";
      case COLORS.BLACK:
        return "rgb(31, 41, 55)";
      case COLORS.GREEN:
        return "rgb(5, 150, 105)";
      case COLORS.PINK:
        return "rgb(236, 72, 153)";
      case COLORS.YELLOW:
        return "rgb(251, 191, 36)";
      case COLORS.VIOLET:
        return "rgb(99, 102, 241)";
      case COLORS.WHITE:
        return "rgb(243, 244, 246)";
      case COLORS.RED:
        return "rgb(220, 38, 38)";
      case COLORS.ORANGE:
        return "rgb(249, 115, 22)";
      case COLORS.BLUE:
        return "rgb(59, 130, 246)";
      default:
        return "white";
    }
  }};

  border: 1px solid ${({ color }) => getBorderColor(color)};
  border-radius: ${TILE_BORDER_RADIUS};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);

  transition: background-color 0.3s ease, transform 0.2s ease-out,
    box-shadow 0.2s ease-out;

  &:hover {
    z-index: 5;
    transform: scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px ${FOCUS_SHADOW_COLOR};
  }

  ${(props) =>
    props.$isEditingMode &&
    css`
      cursor: pointer;
      border-style: dashed;
      border-width: 2px;
      border-color: rgba(255, 255, 255, 0.3);
      &:hover {
        border-color: rgba(255, 255, 255, 0.5);
      }
    `}

  transition: background-color 0.3s ease, transform 0.2s ease-out, 
    box-shadow 0.2s ease-out, border-color 0.2s ease, border-width 0.2s ease;
`;
