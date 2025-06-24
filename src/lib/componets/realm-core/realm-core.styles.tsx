import styled, { css } from "styled-components";
import { COLORS } from "../../constants";

const REALM_CORE_SIZE = "80px";
const INNER_CIRCLE_SIZE = "46px";
const REALM_CORE_OFFSET = "-40px";
const Z_INDEX_REALM_CORE = 10;

const getBackgroundColor = (color: string) => {
  switch (color) {
    case COLORS.GREY:
      return "rgb(156, 163, 175)";
    case COLORS.BLACK:
      return "rgb(31, 41, 55)";
    case COLORS.GREEN:
      return "rgb(5, 150, 105)";
    case COLORS.PINK:
      return "rgb(218,135,225)";
    case COLORS.YELLOW:
      return "rgb(251, 191, 36)";
    case COLORS.VIOLET:
      return "rgb(120,36,134)";
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
};

export const Container = styled.div<{
  $corner: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
}>`
  position: absolute;
  z-index: ${Z_INDEX_REALM_CORE};

  display: flex;
  align-items: center;
  justify-content: center;
  width: ${REALM_CORE_SIZE};
  height: ${REALM_CORE_SIZE};

  background-color: #111;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.05);
  cursor: pointer;

  transition: all 0.2s ease-out;

  &:hover {
    transform: scale(1.05);
    border-color: rgba(255, 255, 255, 0.3);
  }

  ${({ $corner }) => {
    if ($corner === "topLeft")
      return css`
        top: ${REALM_CORE_OFFSET};
        left: ${REALM_CORE_OFFSET};
      `;
    if ($corner === "topRight")
      return css`
        top: ${REALM_CORE_OFFSET};
        right: ${REALM_CORE_OFFSET};
      `;
    if ($corner === "bottomLeft")
      return css`
        bottom: ${REALM_CORE_OFFSET};
        left: ${REALM_CORE_OFFSET};
      `;
    if ($corner === "bottomRight")
      return css`
        bottom: ${REALM_CORE_OFFSET};
        right: ${REALM_CORE_OFFSET};
      `;
    return "";
  }}
`;

export const InnerCircle = styled.div<{
  color: COLORS;
  $isEditingMode?: boolean;
}>`
  width: ${INNER_CIRCLE_SIZE};
  height: ${INNER_CIRCLE_SIZE};

  background-color: ${({ color }) => getBackgroundColor(color)};
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.2);

  ${({ $isEditingMode }) =>
    $isEditingMode &&
    css`
      border: 2px dashed rgba(255, 255, 255, 0.4);
    `}

  transition: all 0.2s ease-out;
`;
