import styled from "styled-components";

export const Overlay = styled.div<{ isVisible: boolean }>`
  pointer-events: ${({ isVisible }) => (isVisible ? "auto" : "none")};

  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  overflow: hidden;

  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  background-color: rgba(0, 0, 0, 0.6);

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 20px;

  transition: opacity 0.3s ease-in-out;
`;

export const Tile = styled.div`
  position: relative;

  width: 154px;
  height: 154px;

  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  font-size: 1.875rem;

  font-weight: 600;
  border: 3px solid white;

  span {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 16px;
    padding: 0.25rem 0.75rem;
    box-sizing: border-box;
    color: white;
    height: 40px;
    vertical-align: middle;
    display: inline-block;

    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 35px;
  }
`;

export const Grid = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 16px;
`;
