import styled, { css, keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const getButtonStyles = (variant?: string, isActive?: boolean) => {
  const baseStyles = css`
    padding: 0.75rem 1.5rem;
    width: 100%;

    border-radius: 8px;
    font-weight: 600;
    font-size: 0.875rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    &:not(:disabled):hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &:not(:disabled):active {
      transform: translateY(0);
    }

    @media (max-width: 768px) {
      padding: 0.625rem 1.25rem;
      font-size: 0.8rem;
      min-height: 40px;
    }
  `;

  switch (variant) {
    case "edit":
      return css`
        ${baseStyles}
        background-color: ${isActive ? "#dc2626" : "#3b82f6"};
        color: white;

        &:not(:disabled):hover {
          background-color: ${isActive ? "#b91c1c" : "#2563eb"};
        }
      `;

    case "solve":
      return css`
        ${baseStyles}

        background-color: #10b981;
        color: white;

        &:not(:disabled):hover {
          background-color: #059669;
        }
      `;

    case "reset":
      return css`
        ${baseStyles}
        background-color: #f59e0b;
        color: white;

        &:not(:disabled):hover {
          background-color: #d97706;
        }
      `;

    case "clear":
      return css`
        ${baseStyles}
        background-color: #ef4444;
        color: white;

        &:not(:disabled):hover {
          background-color: #dc2626;
        }
      `;

    default:
      return css`
        ${baseStyles}
        background-color: #6b7280;
        color: white;

        &:not(:disabled):hover {
          background-color: #4b5563;
        }
      `;
  }
};

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 100vh;
  width: 100vw;
  background-color: rgb(243, 244, 246);
  font-family: "Inter", sans-serif;

  overflow: hidden;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1800px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px 40px 0px;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: rgb(180, 83, 9);
  filter: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07))
    drop-shadow(0 2px 2px rgba(0, 0, 0, 0.06));
  text-align: center;
`;

export const PuzzleContainer = styled.div`
  z-index: 10;
  position: relative;
  background-color: rgb(77, 39, 0);
  border: 4px solid rgb(46, 25, 0);
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 1.5rem;
  transform: rotate(-1deg) skewY(1deg) scale(0.95);
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: ease-out;
  transform-origin: center;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  padding: 1.5rem;
  background-color: rgb(120, 53, 15);
  border-radius: 0.5rem;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  border: 2px solid rgb(77, 39, 0);
`;

export const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  height: 520px;
  width: 300px;
  padding: 20px;
  box-sizing: border-box;

  background-color: rgb(150, 150, 150);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 2px solid rgba(176, 176, 176, 0.568);
`;

export const GuideText = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: rgb(0, 0, 0);
`;

export const GuideListContainer = styled.div`
  b {
    margin-bottom: 10px;
  }
`;
export const GuideListTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: rgb(0, 0, 0);
  margin-bottom: 8px;
  padding-left: 4px;
`;
export const GuideList = styled.ul`
  padding: 0;
  margin: 0;
  width: 100%;
  padding-left: 20px;
  box-sizing: border-box;
`;
export const GuideListItem = styled.li`
  font-size: 13px;
  font-weight: 400;
  color: rgb(0, 0, 0);

  padding-top: 5px;
`;

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(0, 0, 0);
  margin: 0;
  text-align: center;
`;

export const GuideContainer = styled.div`
  ${Subtitle} {
    margin-bottom: 10px;
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

export const StyledButton = styled.button<{
  $variant?: "edit" | "solve" | "reset" | "clear";
  $isActive?: boolean;
}>`
  ${({ $variant, $isActive }) => getButtonStyles($variant, $isActive)}
`;

export const MessageArea = styled.div`
  margin-top: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    text-align: center;
    font-size: 1.125rem;
    &.success {
      color: rgb(22, 163, 74);
    }
    &.error {
      color: rgb(185, 28, 28);
    }
  }
`;

export const ControlsMessage = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: rgb(0, 0, 0);
  text-align: center;
`;

export const MessageText = styled.p<{ status: "good" | "bad" | "info" }>`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin: 0;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  animation: ${slideIn} 0.3s ease-out;

  ${({ status }) => {
    if (status === "good") {
      return css`
        color: #065f46;
        background-color: #d1fae5;
        border: 1px solid #a7f3d0;
      `;
    } else if (status === "bad") {
      return css`
        color: #991b1b;
        background-color: #fee2e2;
        border: 1px solid #fecaca;
      `;
    } else {
      return css`
        color: #1e40af;
        background-color: #bfdbfe;
        border: 1px solid #93c5fd;
      `;
    }
  }}

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0.625rem 1.25rem;
  }
`;
