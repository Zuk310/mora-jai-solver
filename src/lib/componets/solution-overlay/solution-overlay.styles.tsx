import styled from "styled-components";

export const Overlay = styled.div<{ $isVisible: boolean }>`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  padding: inherit;
  box-sizing: border-box;

  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
  border-radius: 24px;

  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  pointer-events: ${({ $isVisible }) => ($isVisible ? "auto" : "none")};

  @media (max-width: 1024px) {
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    border-radius: 16px;
  }

  transition: opacity 0.3s ease-in-out;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;

  width: 100%;
  height: 100%;
  box-sizing: border-box;

  gap: 12px;
  border-radius: 16px;

  @media (max-width: 1024px) {
    gap: 10px;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    gap: 8px;
    border-radius: 8px;
  }
`;

export const Tile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  color: white;
  font-weight: 700;
  text-align: center;
  border: 2px solid rgba(255, 255, 255, 0.3);

  padding: 8px;
  box-sizing: border-box;

  font-size: 30px;
  border-radius: 12px;

  span {
    display: flex;
    align-items: center;
    justify-content: center;

    max-width: 100%;

    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif;
    font-weight: 600;
    line-height: 1.4;
    text-align: center;
    text-shadow: 0 0 4px rgba(255, 255, 255, 0.3);

    background-color: rgba(0, 0, 0, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.15);

    padding: 8px 12px;
    font-size: 18px;
    border-radius: 12px;
  }

  @media (max-width: 1024px) {
    border-radius: 10px;
    font-size: 24px;
    span {
      font-size: 16px;
      padding: 6px 10px;
      border-radius: 10px;
    }
  }

  @media (max-width: 480px) {
    border-radius: 8px;
    font-size: 18px;
    span {
      font-size: 12px;
      padding: 4px 6px;
      border-radius: 6px;
    }
  }
`;
