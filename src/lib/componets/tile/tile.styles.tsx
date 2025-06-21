import styled, { css } from "styled-components";
import { COLORS } from "../../constants";
import { getContrastTextColor } from "../../utils/styles";

const getBorderColor = (color: string | undefined) => {
  switch (color) {
    case COLORS.GREY:
      return "rgb(107, 114, 128)";
    case COLORS.BLACK:
      return "rgb(17, 24, 39)";
    case COLORS.GREEN:
      return "rgb(4, 120, 87)";
    case COLORS.PINK:
      return "rgb(219, 39, 119)";
    case COLORS.YELLOW:
      return "rgb(234, 179, 8)";
    case COLORS.VIOLET:
      return "rgb(67, 56, 202)";
    case COLORS.WHITE:
      return "rgb(156, 163, 175)";
    case COLORS.RED:
      return "rgb(185, 28, 28)";
    case COLORS.ORANGE:
      return "rgb(234, 88, 12)";
    case COLORS.BLUE:
      return "rgb(37, 99, 235)";
    default:
      return "black";
  }
};

export const StyledTile = styled.button<{
  color: COLORS;
  $isEditingMode: boolean;
}>`
  width: 7rem;
  height: 7rem;
  @media (min-width: 640px) {
    width: 8rem;
    height: 8rem;
  }
  @media (min-width: 768px) {
    width: 9rem;
    height: 9rem;
  }
  @media (min-width: 1024px) {
    width: 10rem;
    height: 10rem;
  }
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.25rem;
  @media (min-width: 640px) {
    font-size: 1.5rem;
  }
  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
  font-weight: 600;
  transform: scale(1);
  transition-property: all;
  transition-duration: 200ms;
  transition-timing-function: ease-out;
  &:hover {
    transform: scale(1.05);
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.75);
  }
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  background-color: ${(props) => {
    switch (props.color) {
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
        return "rgb(255, 255, 255)";
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
  color: ${(props) => getContrastTextColor(props.color)};
  border: 2px solid ${(props) => getBorderColor(props.color)};

  ${(props) =>
    props.$isEditingMode &&
    css`
      cursor: pointer;
      border-style: dashed;
      border-color: rgb(75, 85, 99);
    `}
`;
