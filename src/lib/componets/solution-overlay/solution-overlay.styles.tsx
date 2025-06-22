import styled from "styled-components";

const OVERLAY_GRID_SIZE = "492px";
const OVERLAY_TILE_SIZE = "140px";
const OVERLAY_GRID_ROW_GAP = "10px";
const OVERLAY_GRID_COL_GAP = "16px";
const OVERLAY_GRID_PADDING = "14px 20px 17px 20px";

export const Overlay = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
  border-radius: 24px;

  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  pointer-events: ${({ $isVisible }) => ($isVisible ? "auto" : "none")};
  overflow: hidden;
  transition: opacity 0.3s ease-in-out;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;

  width: ${OVERLAY_GRID_SIZE};
  height: ${OVERLAY_GRID_SIZE};
  row-gap: ${OVERLAY_GRID_ROW_GAP};
  column-gap: ${OVERLAY_GRID_COL_GAP};
  padding: ${OVERLAY_GRID_PADDING};

  border-radius: 16px;
  box-sizing: border-box;
`;

export const Tile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${OVERLAY_TILE_SIZE};
  height: ${OVERLAY_TILE_SIZE};
  padding: 8px;

  color: white;
  font-size: 30px;
  font-weight: 700;
  text-align: center;

  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  box-sizing: border-box;

  span {
    display: flex;
    align-items: center;
    justify-content: center;

    max-width: 100%;
    padding: 8px 12px;

    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.4;
    text-align: center;
    text-shadow: 0 0 4px rgba(255, 255, 255, 0.3);

    background-color: rgba(0, 0, 0, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.15);
  }
`;
