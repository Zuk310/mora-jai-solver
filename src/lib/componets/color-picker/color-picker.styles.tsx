import styled from "styled-components";
import { COLORS } from "../../constants";
import { getContrastTextColor } from "../../utils/styles";

const PICKER_WIDTH = "220px";
const BUTTON_BORDER_RADIUS = "8px";
const GAP_SIZE = "8px";
const FONT_STACK_SYSTEM = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;

export const Container = styled.div`
  position: absolute;
  z-index: 50;

  display: flex;
  flex-wrap: wrap;
  gap: ${GAP_SIZE};

  width: ${PICKER_WIDTH};
  padding: 12px;
  box-sizing: border-box;

  background: linear-gradient(145deg, #2c2c2e, #1a1a1c);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.05),
    0 10px 30px rgba(0, 0, 0, 0.3);
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

  &:hover {
    border: 2px solid rgba(171, 171, 171, 0.553);
    transform: scale(0.97);
  }

  transition: transform 0.1s ease-in-out, border-color 0.1s ease-in-out;
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 4px;
  padding: 8px 0px;

  color: #f2f2f7;
  font-family: ${FONT_STACK_SYSTEM};
  font-size: 14px;
  font-weight: 600;

  background-color: #2c2c2e;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${BUTTON_BORDER_RADIUS};
  cursor: pointer;

  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: #3c3c3e;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ModalBackground = styled.div`
  position: fixed;
  z-index: 49;
  top: -100vh;
  left: -100vw;
  width: 1000vw;
  height: 1000vh;
`;
