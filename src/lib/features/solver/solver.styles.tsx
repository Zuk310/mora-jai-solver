import styled, { css, keyframes } from "styled-components";

export const StyledAppContainer = styled.div`
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

export const StyledTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: rgb(180, 83, 9);
  filter: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07))
    drop-shadow(0 2px 2px rgba(0, 0, 0, 0.06));
  text-align: center;
`;

export const StyledPuzzleContainer = styled.div`
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

export const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  padding: 1.5rem;
  background-color: rgb(120, 53, 15);
  border-radius: 0.5rem;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  border: 2px solid rgb(77, 39, 0);
`;

export const StyledButtonContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
    gap: 0;
    & > *:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

export const StyledButton = styled.button<StyledButtonProps>`
  ${({ $variant, $isActive }) => getButtonStyles($variant, $isActive)}
`;

export const StyledMessageArea = styled.div`
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

export const StyledSolverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  overflow: hidden;
`;

export const StyledSolverTile = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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
  border: 2px solid white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: rgba(0, 0, 0, 0);

  div {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 9999px;
    padding: 0.25rem 0.75rem;
    color: white;
  }

  &.text-white {
    color: white;
  }
  &.text-gray-800 {
    color: rgb(55, 65, 81);
  }
`;

//new code
// solver.styles.ts

// Animations
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

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

// Button variants
interface StyledButtonProps {
  $variant?: "edit" | "solve" | "reset" | "clear";
  $isActive?: boolean;
}

const getButtonStyles = (variant?: string, isActive?: boolean) => {
  const baseStyles = css`
    padding: 0.75rem 1.5rem;
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
        width: 145px;
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

interface MessageTextProps {
  $isSuccess?: boolean;
}

export const MessageText = styled.p<MessageTextProps>`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin: 0;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  animation: ${slideIn} 0.3s ease-out;

  ${({ $isSuccess }) =>
    $isSuccess
      ? css`
          color: #065f46;
          background-color: #d1fae5;
          border: 1px solid #a7f3d0;
        `
      : css`
          color: #991b1b;
          background-color: #fee2e2;
          border: 1px solid #fecaca;
        `}

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0.625rem 1.25rem;
  }
`;

// Loading spinner
export const LoadingSpinner = styled.svg`
  width: 1.25rem;
  height: 1.25rem;
  color: white;
  margin-right: 0.75rem;
  margin-left: -0.25rem;
  animation: ${spin} 1s linear infinite;

  @media (max-width: 768px) {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  }
`;

export const SpinnerCircle = styled.circle`
  opacity: 0.25;
`;

export const SpinnerPath = styled.path`
  opacity: 0.75;
`;

// Modal background (if needed)
export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease-out;
`;

// Additional utility styles for responsive design
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

// Loading state overlay
export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  z-index: 20;

  span {
    margin-top: 1rem;
    font-weight: 600;
    color: #374151;
  }
`;

export const SolverStepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  padding: 51px;
  box-sizing: border-box;

  width: 100%;
  height: 100%;
`;
