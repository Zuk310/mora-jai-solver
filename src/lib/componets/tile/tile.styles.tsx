import styled, { css } from "styled-components";
import { COLORS } from "../../constants";
import { getContrastTextColor } from "../../styles/styles";

const FOCUS_SHADOW_COLOR = "#0a84ff";

const tileSizes = {
  desktop: { size: "140px", radius: "12px", font: "26px" },
  tablet: { size: "110px", radius: "10px", font: "22px" },
  mobile: { size: "80px", radius: "8px", font: "18px" },
};

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
      return "rgb(65, 12, 74)";
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
        return " rgb(120,36,134)";
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
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);

  width: ${tileSizes.desktop.size};
  height: ${tileSizes.desktop.size};
  font-size: ${tileSizes.desktop.font};
  border-radius: ${tileSizes.desktop.radius};

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

  @media (max-width: 1024px) {
    width: ${tileSizes.tablet.size};
    height: ${tileSizes.tablet.size};
    font-size: ${tileSizes.tablet.font};
    border-radius: ${tileSizes.tablet.radius};
  }

  @media (max-width: 480px) {
    width: ${tileSizes.mobile.size};
    height: ${tileSizes.mobile.size};
    font-size: ${tileSizes.mobile.font};
    border-radius: ${tileSizes.mobile.radius};
  }

  transition: all 0.2s ease-out;
`;
