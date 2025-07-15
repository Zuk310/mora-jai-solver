import styled from "styled-components";

export const Overlay = styled.div<{ $isVisible: boolean }>`
  overflow: hidden;
  position: absolute;
  top: -16px;
  left: -16px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: calc(100% + 32px);
  height: calc(100% + 32px);
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
  grid-template-columns: repeat(3, 140px);
  grid-template-rows: repeat(3, 140px);
  justify-items: center;
  align-items: center;

  box-sizing: border-box;

  gap: 12px;
  border-radius: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 110px);
    grid-template-rows: repeat(3, 110px);
    gap: 10px;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 80px);
    grid-template-rows: repeat(3, 80px);
    gap: 8px;
    border-radius: 8px;
  }
`;

export const Tile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 140px;
  height: 140px;

  color: white;
  font-weight: 700;
  text-align: center;
  border: 2px solid rgba(255, 255, 255, 0.3);

  box-sizing: border-box;

  font-size: 30px;
  border-radius: 12px;

  span {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
    max-width: 100%;

    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif;
    font-weight: 600;
    line-height: 1.2;
    text-align: center;
    text-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
    word-break: break-word;
    overflow-wrap: break-word;

    background-color: rgba(0, 0, 0, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.15);

    padding: 8px;
    box-sizing: border-box;
    border-radius: 12px;
  }

  .dynamic-font {
    font-size: var(--desktop-font, 18px);
  }

  @media (max-width: 1024px) {
    width: 110px;
    height: 110px;
    border-radius: 10px;
    font-size: 24px;
    span {
      padding: 6px;
      border-radius: 10px;
    }
    .dynamic-font {
      font-size: var(--tablet-font, 16px);
    }
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    font-size: 18px;
    span {
      padding: 4px;
      border-radius: 6px;
    }
    .dynamic-font {
      font-size: var(--mobile-font, 14px);
    }
  }
`;
