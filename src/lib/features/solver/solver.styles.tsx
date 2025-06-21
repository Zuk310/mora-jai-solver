import styled from "styled-components";

export const StyledAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-height: 100vh;
  width: 100%;
  background-color: rgb(243, 244, 246);
  font-family: "Inter", sans-serif;
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

export const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  font-weight: 700;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.75);
  }
  color: white;

  &.edit-mode-active {
    background-color: rgb(249, 115, 22);
    &:hover {
      background-color: rgb(194, 65, 12);
    }
    &:focus {
      box-shadow: 0 0 0 4px rgba(253, 186, 116, 0.75);
    }
  }

  &.edit-mode-inactive {
    background-color: rgb(217, 119, 6);
    &:hover {
      background-color: rgb(180, 83, 9);
    }
    &:focus {
      box-shadow: 0 0 0 4px rgba(251, 207, 232, 0.75);
    }
  }

  &.show-solution {
    background-color: rgb(5, 150, 105);
    &:hover {
      background-color: rgb(4, 120, 87);
    }
    &:focus {
      box-shadow: 0 0 0 4px rgba(84, 203, 161, 0.75);
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &.reset {
    background-color: rgb(220, 38, 38);
    &:hover {
      background-color: rgb(185, 28, 28);
    }
    &:focus {
      box-shadow: 0 0 0 4px rgba(252, 165, 165, 0.75);
    }
  }

  &.clear-all {
    background-color: rgb(75, 85, 99);
    &:hover {
      background-color: rgb(55, 65, 81);
    }
    &:focus {
      box-shadow: 0 0 0 4px rgba(156, 163, 175, 0.75);
    }
  }
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
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 9999px;
    padding: 0.25rem 0.75rem;
  }

  &.text-white {
    color: white;
  }
  &.text-gray-800 {
    color: rgb(55, 65, 81);
  }
`;
