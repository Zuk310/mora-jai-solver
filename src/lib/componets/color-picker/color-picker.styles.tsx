import styled from "styled-components";
import { COLORS } from "../../constants";
import { getContrastTextColor } from "../../utils/styles";

export const StyledColorPickerContainer = styled.div`
  position: absolute;
  z-index: 50;
  padding: 0.5rem;
  background: linear-gradient(
    to bottom right,
    rgb(55, 65, 81),
    rgb(17, 24, 39)
  );
  border: 1px solid rgb(107, 114, 128);
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.25rem;
  width: fit-content;
  min-width: 160px;
`;

export const StyledColorPickerButton = styled.button<{ color: COLORS }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(1);
  transition-property: transform;
  transition-duration: 100ms;
  transition-timing-function: ease-out;
  &:hover {
    transform: scale(1.1);
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
  ${(props) =>
    props.color === COLORS.WHITE &&
    `
    border: 2px solid rgb(107, 114, 128);
  `}
`;

export const StyledCloseButton = styled.button`
  grid-column: span 4 / span 4;
  background-color: rgb(75, 85, 99);
  color: white;
  font-size: 0.75rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  border-radius: 0.375rem;
  &:hover {
    background-color: rgb(55, 65, 81);
  }
  transition-property: background-color;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
`;
