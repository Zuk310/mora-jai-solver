import styled, { css } from "styled-components";

const Z_INDEX_PUZZLE = 10;
const FONT_STACK_SYSTEM = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;

const getButtonStyles = (variant?: string, isActive?: boolean) => {
  const baseStyles = css`
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    min-height: 48px;
    padding: 12px 24px;

    font-family: ${FONT_STACK_SYSTEM};
    font-size: 15px;
    font-weight: 600;
    color: #f2f2f7;

    background-color: #2c2c2e;

    border: 1px solid transparent;
    border-radius: 8px;

    &:disabled {
      color: rgba(255, 255, 255, 0.3);
      background-color: #1c1c1e;
      border-color: transparent;
      cursor: not-allowed;
    }

    transition: background-color 0.2s ease, border-color 0.2s ease,
      color 0.2s ease;
  `;

  let defaultBg = "#2c2c2e";
  let hoverBg = "";
  let hoverBorder = "";

  switch (variant) {
    case "edit":
      hoverBg = isActive ? "#ff453a" : "#0a84ff";
      hoverBorder = isActive ? "#ff453a" : "#0a84ff";
      break;
    case "solve":
      defaultBg = "#3c3c3e";
      hoverBg = "#32d74b";
      hoverBorder = "#32d74b";
      break;
    case "reset":
      hoverBg = "#ff9f0a";
      hoverBorder = "#ff9f0a";
      break;
    case "clear":
      hoverBg = "#ff453a";
      hoverBorder = "#ff453a";
      break;
  }

  return css`
    ${baseStyles}
    background-color: ${defaultBg};

    &:not(:disabled):hover {
      background-color: ${hoverBg};
      border-color: ${hoverBorder};
    }

    ${isActive &&
    variant === "edit" &&
    css`
      background-color: #0a84ff;
      border-color: #0a84ff;
    `}
  `;
};

export const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: radial-gradient(circle, #1a1a1a 0%, #000 100%);
  font-family: ${FONT_STACK_SYSTEM};
`;

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 64px;

  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
`;

export const Title = styled.h1`
  margin-bottom: 24px;

  font-size: 36px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  letter-spacing: -0.025em;
`;

export const PuzzleContainer = styled.div`
  position: relative;
  z-index: ${Z_INDEX_PUZZLE};

  width: 540px;
  height: 540px;
  padding: 24px;
  box-sizing: border-box;

  background: rgba(18, 18, 18, 0.75);
  backdrop-filter: blur(16px);

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }

  transition: border-color 0.2s ease, box-shadow 0.2s ease;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
  gap: 12px;

  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;

  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
`;

export const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 24px;

  width: 300px;
  min-width: 300px;
`;

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 24px;

  background: rgba(18, 18, 18, 0.75);
  backdrop-filter: blur(16px);

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.2);
  }

  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out,
    border-color 0.2s ease-out;
`;

export const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const GuideText = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #8e8e93;
  line-height: 1.6;
`;

export const GuideListContainer = styled.div``;

export const GuideListTitle = styled.h3`
  margin: 0 0 12px 0;

  font-size: 16px;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.01em;
`;

export const GuideList = styled.ul`
  margin: 0;
  padding: 0 0 0 20px;
  box-sizing: border-box;
`;

export const GuideListItem = styled.li`
  padding-top: 6px;

  font-size: 13px;
  font-weight: 400;
  color: #8e8e93;
  line-height: 1.5;

  b {
    color: #c7c7cc;
  }
`;

export const Subtitle = styled.h2`
  margin: 0;

  font-size: 20px;
  font-weight: 600;
  color: #f2f2f7;
  text-align: left;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  width: 100%;
`;

export const StyledButton = styled.button<{
  $variant?: "edit" | "solve" | "reset" | "clear";
  $isActive?: boolean;
}>`
  ${({ $variant, $isActive }) => getButtonStyles($variant, $isActive)}
`;

export const MessageArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 48px;
`;

export const ControlsMessage = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #8e8e93;
  text-align: left;
  line-height: 1.5;
`;

export const MessageText = styled.p<{ status: "good" | "bad" | "info" }>`
  margin: 0;
  padding: 10px 20px;

  font-size: 14px;
  font-weight: 500;
  color: #fff;
  text-align: center;

  border: 1px solid transparent;
  border-radius: 8px;

  ${({ status }) => {
    if (status === "good")
      return css`
        background-color: rgba(48, 209, 88, 0.15);
        border-color: rgba(48, 209, 88, 0.4);
      `;
    else if (status === "bad")
      return css`
        background-color: rgba(255, 69, 58, 0.15);
        border-color: rgba(255, 69, 58, 0.4);
      `;
    else
      return css`
        background-color: rgba(10, 132, 255, 0.15);
        border-color: rgba(10, 132, 255, 0.4);
      `;
  }}
`;
