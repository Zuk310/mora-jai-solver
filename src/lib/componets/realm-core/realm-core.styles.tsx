import styled, { css } from "styled-components";
import { COLORS } from "../../constants";

const getBackgroundColor = (color: string) => {
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
};

const realmSizes = {
  desktop: { coreSize: "80px", innerSize: "46px", offset: "-40px" },
  tablet: { coreSize: "70px", innerSize: "40px", offset: "-35px" },
  mobile: { coreSize: "50px", innerSize: "28px", offset: "-25px" },
};

export const Container = styled.div<{
  $corner: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
}>`
  cursor: pointer;

  z-index: 10;
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #111;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.05);

  width: ${realmSizes.desktop.coreSize};
  height: ${realmSizes.desktop.coreSize};

  &:hover {
    transform: scale(1.05);
    border-color: rgba(255, 255, 255, 0.3);
  }

  ${({ $corner }) => {
    const { offset } = realmSizes.desktop;
    if ($corner === "topLeft")
      return css`
        top: ${offset};
        left: ${offset};
      `;
    if ($corner === "topRight")
      return css`
        top: ${offset};
        right: ${offset};
      `;
    if ($corner === "bottomLeft")
      return css`
        bottom: ${offset};
        left: ${offset};
      `;
    if ($corner === "bottomRight")
      return css`
        bottom: ${offset};
        right: ${offset};
      `;
    return "";
  }}

  @media (max-width: 1024px) {
    width: ${realmSizes.tablet.coreSize};
    height: ${realmSizes.tablet.coreSize};

    ${({ $corner }) => {
      const { offset } = realmSizes.tablet;
      if ($corner === "topLeft")
        return css`
          top: ${offset};
          left: ${offset};
        `;
      if ($corner === "topRight")
        return css`
          top: ${offset};
          right: ${offset};
        `;
      if ($corner === "bottomLeft")
        return css`
          bottom: ${offset};
          left: ${offset};
        `;
      if ($corner === "bottomRight")
        return css`
          bottom: ${offset};
          right: ${offset};
        `;
      return "";
    }}
  }

  @media (max-width: 480px) {
    width: ${realmSizes.mobile.coreSize};
    height: ${realmSizes.mobile.coreSize};

    ${({ $corner }) => {
      const { offset } = realmSizes.mobile;
      if ($corner === "topLeft")
        return css`
          top: ${offset};
          left: ${offset};
        `;
      if ($corner === "topRight")
        return css`
          top: ${offset};
          right: ${offset};
        `;
      if ($corner === "bottomLeft")
        return css`
          bottom: ${offset};
          left: ${offset};
        `;
      if ($corner === "bottomRight")
        return css`
          bottom: ${offset};
          right: ${offset};
        `;
      return "";
    }}
  }

  transition: all 0.2s ease-out;
`;

export const InnerCircle = styled.div<{
  color: COLORS;
  $isEditingMode?: boolean;
}>`
  background-color: ${({ color }) => getBackgroundColor(color)};
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.2);

  width: ${realmSizes.desktop.innerSize};
  height: ${realmSizes.desktop.innerSize};

  ${({ $isEditingMode }) =>
    $isEditingMode &&
    css`
      border: 2px dashed rgba(255, 255, 255, 0.4);
    `}

  @media (max-width: 1024px) {
    width: ${realmSizes.tablet.innerSize};
    height: ${realmSizes.tablet.innerSize};
  }

  @media (max-width: 480px) {
    width: ${realmSizes.mobile.innerSize};
    height: ${realmSizes.mobile.innerSize};
  }

  transition: all 0.2s ease-out;
`;
