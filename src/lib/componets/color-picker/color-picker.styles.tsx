import styled, { css } from "styled-components";
import { COLORS } from "../../constants";
import { getContrastTextColor } from "../../utils/styles";

export const Container = styled.div`
  position: absolute;
  z-index: 50;

  padding: 10px;
  box-sizing: border-box;

  width: 200px;

  border: 2px solid rgb(107, 114, 128);
  border-radius: 10px;

  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);

  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  background: linear-gradient(
    to bottom right,
    rgb(55, 65, 81),
    rgb(17, 24, 39)
  );
`;

export const Button = styled.button<{ color: COLORS }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid transparent;

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

  color: ${({ color }) => getContrastTextColor(color)};
  ${({ color }) =>
    color === COLORS.WHITE &&
    css`
      border: 2px solid rgb(107, 114, 128);
    `}

  &:hover {
    border: 2px solid rgba(255, 255, 255, 0.526);
    transform: scale(0.97);
  }

  transition: transform 0.1s ease-in-out, border-color 0.1s ease-in-out;
`;

export const CloseButton = styled.button`
  min-width: 100%;
  margin-top: 8px;

  color: white;
  font-size: 12px;
  padding: 8px 0px;
  border-radius: 8px;
  border: none;

  background-color: rgb(75, 85, 99);
  transform: scale(1);

  &:hover {
    background-color: rgb(55, 65, 81);
  }

  &:active {
    transform: scale(0.97);
  }

  transition: background-color 0.15s ease-in-out, transform 0.15s ease-in-out;
`;

export const ModalBackground = styled.div`
  position: fixed;
  top: -100vh;
  left: -100vw;
  width: 1000vw;
  height: 1000vh;
  background-color: rgba(0, 0, 0, 00);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 15;
`;
